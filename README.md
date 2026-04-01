# AI Trip Planner

A full-stack AI-powered Trip Advisor web application.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS v4, ShadCN UI, Framer Motion, react-map-gl, mapbox-gl.
- **Backend**: FastAPI (Python), Uvicorn, Pydantic.

## Prerequisites
- Node.js (v18+)
- Python (3.9+)

## Setup & Running

### 1. Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. (Optional but recommended) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend` folder and add your OpenAI Key (optional - system falls back to mock data if key is not valid or just "mock-key"):
   ```env
   OPENAI_API_KEY=your_openai_key_here
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000`.

### 2. Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Features Included
1. **Landing Page**: Modern UI with glassmorphism and animated gradients.
2. **Planner Form**: Select destination, travelers, dates, budget, interests, and preferences.
3. **Results Page**: See the AI-generated (mocked or real) itinerary, recommended hotels/restaurants, and a per-person budget breakdown. Weather widget integrated.
4. **Interactive Map**: Built with `react-map-gl` and Mapbox to show real locations.
5. **Chat Assistant Page**: Ask queries to the travel assistant.

## Deploying
- **Frontend** can be easily deployed to Vercel. 
- **Backend** can be containerized and deployed to Render, Railway, or AWS.

Enjoy your trip planning!
