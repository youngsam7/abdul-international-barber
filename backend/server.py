from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime

load_dotenv()

app = FastAPI(title="Abdul D International Barber API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/abdul_barber')

try:
    from pymongo import MongoClient
    client = MongoClient(MONGO_URL)
    db = client.abdul_barber
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"MongoDB connection error: {e}")
    db = None

# Models
class ContactMessage(BaseModel):
    id: Optional[str] = None
    name: str
    phone: str
    message: str
    created_at: Optional[str] = None

class Service(BaseModel):
    id: str
    name: str
    price: int
    description: str

class Review(BaseModel):
    id: str
    name: str
    rating: int
    comment: str
    date: str

# Static data for services
SERVICES = [
    {"id": "1", "name": "Black Fade", "price": 2000, "description": "Clean, sharp black fade haircut"},
    {"id": "2", "name": "Scissors Cut", "price": 4000, "description": "Precision scissors haircut for a classic look"},
    {"id": "3", "name": "Low Fade & Beard Shave", "price": 5500, "description": "Low fade with professional beard grooming"},
    {"id": "4", "name": "Haircut with Face Cleansing", "price": 8000, "description": "Premium haircut with facial treatment"},
    {"id": "5", "name": "Female Cut", "price": 12000, "description": "Stylish cuts for ladies"},
    {"id": "6", "name": "Children Cut", "price": 2000, "description": "Gentle, fun haircuts for kids"},
]

# Sample reviews
REVIEWS = [
    {"id": "1", "name": "Chukwudi O.", "rating": 5, "comment": "Best barber in Abuja! Always leaves my hair looking fresh and clean.", "date": "2024-12-15"},
    {"id": "2", "name": "Ibrahim M.", "rating": 5, "comment": "Professional service, hygienic environment. Worth every naira!", "date": "2024-12-10"},
    {"id": "3", "name": "Emeka N.", "rating": 5, "comment": "Abdul knows his craft. My go-to barber for the past 2 years.", "date": "2024-12-05"},
    {"id": "4", "name": "Aisha B.", "rating": 4, "comment": "Great experience! They did an amazing job on my son's haircut.", "date": "2024-11-28"},
    {"id": "5", "name": "David A.", "rating": 5, "comment": "Premium quality service. The face cleansing treatment is exceptional!", "date": "2024-11-20"},
]

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Abdul D International Barber API"}

@app.get("/api/services")
async def get_services():
    return {"services": SERVICES}

@app.get("/api/reviews")
async def get_reviews():
    return {"reviews": REVIEWS, "average_rating": 4.9, "total_reviews": 59}

@app.get("/api/business-info")
async def get_business_info():
    return {
        "name": "Abdul D International Barber",
        "address": "5th Floor, Exclusive Serene Hotel, Plot 31 Reuben Okoya Crescent, Wuye, Abuja, Nigeria",
        "phone": "0806 445 1637",
        "whatsapp": "+2348064451637",
        "hours": "Open 24 Hours",
        "rating": 4.9,
        "total_reviews": 59
    }

@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    try:
        contact_data = {
            "id": str(uuid.uuid4()),
            "name": message.name,
            "phone": message.phone,
            "message": message.message,
            "created_at": datetime.now().isoformat()
        }
        
        if db is not None:
            db.contacts.insert_one(contact_data)
        
        return {"success": True, "message": "Thank you for your message! We will contact you shortly."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
