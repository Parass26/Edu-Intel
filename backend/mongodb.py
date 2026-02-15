from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")

if not MONGO_URL:
    raise ValueError("MONGO_URL not found in .env")

if not MONGO_DB:
    raise ValueError("MONGO_DB not found in .env")

# Create Mongo client
client = AsyncIOMotorClient(MONGO_URL)

# Select database
mongo_db = client[MONGO_DB]
