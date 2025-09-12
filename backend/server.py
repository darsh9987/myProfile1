from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class AboutSection(BaseModel):
    headline: str
    description: str
    highlights: List[str]
    philosophy: str

class Profile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    subtitle: str
    tagline: str
    email: EmailStr
    phone: str
    location: str
    heroImage: str
    profileImage: str
    about: AboutSection
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    period: str
    company: str
    role: str
    location: str
    type: str
    description: str
    achievements: List[str]
    technologies: List[str]
    order: int
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    technical: Dict[str, List[str]]
    leadership: List[str]
    certifications: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Achievement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    year: str
    category: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    university: str
    year: str
    grade: str
    highlights: List[str]
    subjects: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: str
    message: str

class ContactEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: str
    message: str
    status: str = "new"
    createdAt: datetime = Field(default_factory=datetime.utcnow)


# API Routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}

@api_router.get("/profile", response_model=Profile)
async def get_profile():
    try:
        profile = await db.profiles.find_one()
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Convert MongoDB ObjectId to string if needed
        if "_id" in profile:
            profile["id"] = str(profile["_id"])
            del profile["_id"]
        
        return Profile(**profile)
    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    try:
        experiences = await db.experiences.find().sort("order", 1).to_list(100)
        result = []
        for exp in experiences:
            if "_id" in exp:
                exp["id"] = str(exp["_id"])
                del exp["_id"]
            result.append(Experience(**exp))
        return result
    except Exception as e:
        logger.error(f"Error fetching experience: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/skills", response_model=Skills)
async def get_skills():
    try:
        skills = await db.skills.find_one()
        if not skills:
            raise HTTPException(status_code=404, detail="Skills not found")
        
        if "_id" in skills:
            skills["id"] = str(skills["_id"])
            del skills["_id"]
        
        return Skills(**skills)
    except Exception as e:
        logger.error(f"Error fetching skills: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/achievements", response_model=List[Achievement])
async def get_achievements():
    try:
        achievements = await db.achievements.find().to_list(100)
        result = []
        for achievement in achievements:
            if "_id" in achievement:
                achievement["id"] = str(achievement["_id"])
                del achievement["_id"]
            result.append(Achievement(**achievement))
        return result
    except Exception as e:
        logger.error(f"Error fetching achievements: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/education", response_model=Education)
async def get_education():
    try:
        education = await db.education.find_one()
        if not education:
            raise HTTPException(status_code=404, detail="Education not found")
        
        if "_id" in education:
            education["id"] = str(education["_id"])
            del education["_id"]
        
        return Education(**education)
    except Exception as e:
        logger.error(f"Error fetching education: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/contact")
async def submit_contact(contact_data: ContactForm):
    try:
        contact_entry = ContactEntry(**contact_data.dict())
        await db.contacts.insert_one(contact_entry.dict())
        
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you within 24 hours.",
            "id": contact_entry.id
        }
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contacts", response_model=List[ContactEntry])
async def get_contacts():
    """Admin endpoint to retrieve all contact submissions"""
    try:
        contacts = await db.contacts.find().sort("createdAt", -1).to_list(100)
        result = []
        for contact in contacts:
            if "_id" in contact:
                contact["id"] = str(contact["_id"])
                del contact["_id"]
            result.append(ContactEntry(**contact))
        return result
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
