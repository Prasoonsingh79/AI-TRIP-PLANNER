from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from typing import List

# Internal imports
import models
import schemas
import auth
import database
from database import engine, get_db

# Create DB tables
models.Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(title="AI Trip Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- Authentication Endpoints ---

@app.post("/register", response_model=schemas.Token)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = auth.create_access_token(data={"sub": str(new_user.id), "email": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=schemas.Token)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    
    access_token = auth.create_access_token(data={"sub": str(db_user.id), "email": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# --- AI Core Endpoints ---

def get_exchange_rate():
    try:
        import requests
        res = requests.get("https://open.er-api.com/v6/latest/USD")
        return res.json()["rates"]["INR"]
    except:
        return 83.5  # Fallback rate

@app.post("/plan-trip")
def plan_trip(request: schemas.TripRequest):
    try:
        rate = get_exchange_rate()
        prompt = f"""
        Generate a detailed travel itinerary for {request.name}.
        Destination: {request.destination}
        Travelers: {request.travelers}
        Age Group: {request.age_group}
        Dates: {request.travel_dates}
        Budget Level: {request.budget}
        Interests: {", ".join(request.interests)}
        Transport: {request.transport_pref}
        Stay: {request.stay_pref}
        
        CRITICAL: Provide all costs in Indian Rupees (INR) using a current rate of approximately {rate} INR per USD.
        Ensure the budget breakdown reflects realistic prices for {request.destination} in INR.
        
        Respond ONLY with a JSON object in this exact format:
        {{
            "destination": "{request.destination}",
            "summary": "Short overview of the trip",
            "day_wise": [
                {{"day": 1, "activities": ["Activity 1", "Activity 2"]}}
            ],
            "recommendations": {{
                "hotels": [
                    {{"name": "Hotel Name", "rating": 4.5, "price": "₹₹₹"}}
                ],
                "restaurants": [
                    {{"name": "Restaurant Name", "cuisine": "Local"}}
                ]
            }},
            "budget_breakdown": {{
                "currency": "INR",
                "total_per_person": 50000,
                "per_person": {{
                    "transport": 15000,
                    "stay": 25000,
                    "food": 10000
                }}
            }}
        }}
        """
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        
        itinerary = json.loads(response.choices[0].message.content)
        return {"status": "success", "data": itinerary}

    except Exception as e:
        print(f"OpenAI Error: {e}")
        # Fallback to mock if API fails
        return {
            "status": "success", 
            "data": {
                "destination": request.destination,
                "summary": f"A wonderful {request.budget} trip to {request.destination}.",
                "day_wise": [{"day": 1, "activities": ["Arrival and hotel check-in"]}],
                "recommendations": {
                    "hotels": [{"name": "Grand Stay Hotel", "rating": 4.8, "price": "₹₹₹"}],
                    "restaurants": [{"name": "Local Delight", "cuisine": "Traditional"}]
                },
                "budget_breakdown": {
                    "currency": "INR",
                    "total_per_person": 80000,
                    "per_person": {"transport": 30000, "stay": 40000, "food": 10000}
                }
            }
        }

@app.post("/chat")
def chat(request: schemas.ChatRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful AI travel assistant."},
                {"role": "user", "content": request.message}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"response": f"I had a slight technical hitch: {str(e)}"}

@app.get("/weather")
def get_weather(destination: str = "Any"):
    # Mocking weather since we don't have a real weather API connected
    return {"forecast": "Sunny, 26°C"}

@app.post("/packing-list")
def get_packing_list(request: schemas.TripRequest):
    try:
        prompt = f"""
        Generate a comprehensive, itemized packing list for a trip to {request.destination}.
        Duration: {request.travel_dates}
        Travelers: {request.travelers}
        Age Group: {request.age_group}
        Budget: {request.budget}
        Interests: {", ".join(request.interests)}
        Stay: {request.stay_pref}

        Analyze the likely weather for {request.destination} during these dates and suggest appropriate clothing.
        
        Respond ONLY with a JSON object in this exact format:
        {{
            "weather_forecast": "Short weather summary",
            "categories": [
                {{
                    "name": "Clothing",
                    "items": ["Item 1", "Item 2"]
                }},
                {{
                    "name": "Essentials",
                    "items": ["Passport", "Charger"]
                }}
            ],
            "pro_tip": "One expert travel tip for this specific destination"
        }}
        """
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        
        packing_list = json.loads(response.choices[0].message.content)
        return {"status": "success", "data": packing_list}

    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/")
def read_root():
    return {"message": "AI Trip Planner API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
