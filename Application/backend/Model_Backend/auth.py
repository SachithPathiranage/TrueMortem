from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt

# Load environment variables (ensure .env is in the correct directory)
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path=env_path)

# Get MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set. Check your .env file!")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["auth_db"]
users_collection = db["users"]

# Create a FastAPI router
router = APIRouter()

# User Schema
class User(BaseModel):
    username: str
    email: str
    password: str

# Login Schema
class LoginUser(BaseModel):
    email: str
    password: str

# Register API
@router.post("/register")
async def register(user: User):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_password.decode('utf-8')
    })

    return {"message": "User registered successfully"}

# Login API
@router.post("/login")
async def login(user: LoginUser):
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not bcrypt.checkpw(user.password.encode('utf-8'), existing_user["password"].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"message": "Login successful"}
