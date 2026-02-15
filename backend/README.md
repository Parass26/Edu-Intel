# EDUINTEL Backend API

FastAPI backend for the AI-Assisted Overseas Education Intelligence Platform.

## Features

- ✅ FastAPI REST API
- ✅ SQLite database with SQLAlchemy ORM
- ✅ AI-powered recommendation engine
- ✅ University data scraper (framework ready)
- ✅ Counselor review system
- ✅ Analytics dashboard endpoints

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Server

```bash
uvicorn main:app --reload --port 8000
```

Or use Python directly:

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST /recommend
Get AI-powered university recommendations based on student profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "cgpa": 8.5,
  "ielts": 7.5,
  "budget": 35000,
  "country": "Canada",
  "field": "Computer Science",
  "careerGoal": "Software Engineer"
}
```

**Response:**
Array of recommendation objects with ROI, acceptance probability, visa success, etc.

### POST /review
Submit counselor review for a student.

**Request Body:**
```json
{
  "studentId": 1,
  "status": "Approved",
  "comment": "Strong profile, good match"
}
```

### GET /analytics
Get platform-wide analytics and statistics.

**Response:**
```json
{
  "total_students": 1247,
  "avg_roi": 84.0,
  "visa_success": 78.0,
  "high_risk_cases": 18,
  "scholarship_success": 62.0
}
```

### GET /students
Get all students (for counselor dashboard).

### GET /universities
Get all universities in the database.

## Database

The application uses SQLite database (`eduintel.db`) with the following tables:

- `students` - Student profiles
- `universities` - University data
- `recommendations` - AI-generated recommendations
- `counselor_reviews` - Counselor reviews and decisions

Database is automatically initialized on first run with sample university data.

## Recommendation Engine

The recommendation engine calculates:

1. **ROI Score** = (avg_salary × employment_rate) / tuition
2. **Match Score** = IELTS match + Budget affordability + Country preference
3. **Acceptance Probability** = Base rate adjusted by CGPA and IELTS
4. **Risk Level** = Based on university risk index and student profile match
5. **Final Score** = Weighted combination of all factors

Top 5 universities are returned sorted by final score.

## Scraper

The scraper module (`scraper.py`) provides a framework for scraping university data from web sources. Currently uses static data, but can be extended to scrape:

- QS World University Rankings
- University official websites
- Government education databases
- Education APIs

## Development

### Project Structure

```
backend/
├── main.py           # FastAPI application and endpoints
├── models.py         # Pydantic and SQLAlchemy models
├── engine.py         # Recommendation engine logic
├── data.py           # Static data and database helpers
├── database.py       # Database configuration
├── scraper.py        # University data scraper
├── requirements.txt  # Python dependencies
└── README.md         # This file
```

### Adding New Universities

Universities can be added by:
1. Adding to `STATIC_UNIVERSITIES` in `data.py`
2. Using the scraper to fetch real-time data
3. Directly inserting into the database

## CORS

CORS is configured to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)
- `http://127.0.0.1:5173`

## Notes

- No authentication required (MVP mode)
- Database is SQLite (can be upgraded to PostgreSQL for production)
- Scraper is framework-ready but uses static data for MVP
- All calculations are rule-based (can be enhanced with ML models)

