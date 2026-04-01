from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[int] = None
    email: Optional[str] = None

class TripRequest(BaseModel):
    name: str
    travelers: int
    age_group: str
    destination: str
    travel_dates: str
    budget: str
    interests: list[str]
    transport_pref: str
    stay_pref: str

class ChatRequest(BaseModel):
    message: str
