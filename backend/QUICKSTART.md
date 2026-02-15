# Quick Start Guide

## Installation & Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Backend Server

**Option 1: Using uvicorn directly**
```bash
uvicorn main:app --reload --port 8000
```

**Option 2: Using the run script**
```bash
python run.py
```

**Option 3: Using Python directly**
```bash
python main.py
```

### 3. Verify the API is Running

Open your browser and visit:
- API Docs: http://localhost:8000/docs
- API Root: http://localhost:8000

### 4. Test the API

**Test Recommendation Endpoint:**
```bash
curl -X POST "http://localhost:8000/recommend" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "cgpa": 8.5,
    "ielts": 7.5,
    "budget": 35000,
    "country": "Canada",
    "field": "Computer Science",
    "careerGoal": "Software Engineer"
  }'
```

**Test Analytics Endpoint:**
```bash
curl http://localhost:8000/analytics
```

## Database

The SQLite database (`eduintel.db`) is automatically created on first run with:
- 15 pre-loaded universities
- Empty tables for students, recommendations, and reviews

## Frontend Integration

Make sure your frontend is running and pointing to:
```
http://localhost:8000
```

The frontend should automatically connect to the backend API.

## Troubleshooting

### Port Already in Use
If port 8000 is busy, change it in `main.py` or use:
```bash
uvicorn main:app --reload --port 8001
```

### Database Issues
Delete `eduintel.db` and restart the server to recreate the database.

### Import Errors
Make sure you're running from the `backend` directory or have the backend folder in your Python path.

## Next Steps

1. ✅ Backend is ready
2. ✅ Database is initialized
3. ✅ API endpoints are functional
4. 🔄 Connect frontend to backend
5. 🔄 Test full workflow

