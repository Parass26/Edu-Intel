"""
University data module with scraper functionality
"""
import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import time
import random
from models import University

# Static university dataset (fallback and initial data)
STATIC_UNIVERSITIES = [
    {
        "name": "University of Toronto",
        "country": "Canada",
        "program": "MSc Computer Science",
        "avg_salary": 85000,
        "tuition": 32000,
        "visa_rate": 0.85,
        "acceptance_rate": 0.78,
        "employment_rate": 0.89,
        "risk_index": 0.15,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 8.0,
        "ranking": 18,
        "scholarship_available": True
    },
    {
        "name": "Technical University of Munich",
        "country": "Germany",
        "program": "MSc Data Science",
        "avg_salary": 72000,
        "tuition": 3000,
        "visa_rate": 0.82,
        "acceptance_rate": 0.72,
        "employment_rate": 0.91,
        "risk_index": 0.18,
        "ielts_requirement": 6.5,
        "cgpa_requirement": 7.5,
        "ranking": 25,
        "scholarship_available": True
    },
    {
        "name": "University of Melbourne",
        "country": "Australia",
        "program": "MSc AI",
        "avg_salary": 78000,
        "tuition": 38000,
        "visa_rate": 0.78,
        "acceptance_rate": 0.80,
        "employment_rate": 0.82,
        "risk_index": 0.25,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 8.0,
        "ranking": 33,
        "scholarship_available": False
    },
    {
        "name": "University College London",
        "country": "UK",
        "program": "MSc Machine Learning",
        "avg_salary": 82000,
        "tuition": 35000,
        "visa_rate": 0.72,
        "acceptance_rate": 0.65,
        "employment_rate": 0.87,
        "risk_index": 0.22,
        "ielts_requirement": 7.5,
        "cgpa_requirement": 8.5,
        "ranking": 8,
        "scholarship_available": True
    },
    {
        "name": "National University of Singapore",
        "country": "Singapore",
        "program": "MSc Computer Science",
        "avg_salary": 75000,
        "tuition": 28000,
        "visa_rate": 0.88,
        "acceptance_rate": 0.70,
        "employment_rate": 0.93,
        "risk_index": 0.12,
        "ielts_requirement": 6.5,
        "cgpa_requirement": 8.0,
        "ranking": 11,
        "scholarship_available": True
    },
    {
        "name": "ETH Zurich",
        "country": "Switzerland",
        "program": "MSc Computer Science",
        "avg_salary": 95000,
        "tuition": 1500,
        "visa_rate": 0.80,
        "acceptance_rate": 0.55,
        "employment_rate": 0.95,
        "risk_index": 0.20,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 9.0,
        "ranking": 6,
        "scholarship_available": False
    },
    {
        "name": "University of British Columbia",
        "country": "Canada",
        "program": "MSc Data Science",
        "avg_salary": 80000,
        "tuition": 30000,
        "visa_rate": 0.83,
        "acceptance_rate": 0.75,
        "employment_rate": 0.85,
        "risk_index": 0.17,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 8.0,
        "ranking": 35,
        "scholarship_available": True
    },
    {
        "name": "RWTH Aachen",
        "country": "Germany",
        "program": "MSc Computer Science",
        "avg_salary": 70000,
        "tuition": 2500,
        "visa_rate": 0.81,
        "acceptance_rate": 0.68,
        "employment_rate": 0.88,
        "risk_index": 0.19,
        "ielts_requirement": 6.5,
        "cgpa_requirement": 7.5,
        "ranking": 42,
        "scholarship_available": False
    },
    {
        "name": "University of Sydney",
        "country": "Australia",
        "program": "MSc Software Engineering",
        "avg_salary": 76000,
        "tuition": 36000,
        "visa_rate": 0.76,
        "acceptance_rate": 0.75,
        "employment_rate": 0.80,
        "risk_index": 0.24,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 7.5,
        "ranking": 41,
        "scholarship_available": True
    },
    {
        "name": "Imperial College London",
        "country": "UK",
        "program": "MSc AI & Machine Learning",
        "avg_salary": 88000,
        "tuition": 38000,
        "visa_rate": 0.70,
        "acceptance_rate": 0.60,
        "employment_rate": 0.90,
        "risk_index": 0.20,
        "ielts_requirement": 7.5,
        "cgpa_requirement": 8.5,
        "ranking": 6,
        "scholarship_available": True
    },
    {
        "name": "McGill University",
        "country": "Canada",
        "program": "MSc Computer Science",
        "avg_salary": 82000,
        "tuition": 28000,
        "visa_rate": 0.84,
        "acceptance_rate": 0.77,
        "employment_rate": 0.86,
        "risk_index": 0.16,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 8.0,
        "ranking": 30,
        "scholarship_available": True
    },
    {
        "name": "University of Waterloo",
        "country": "Canada",
        "program": "MSc Data Science",
        "avg_salary": 85000,
        "tuition": 25000,
        "visa_rate": 0.86,
        "acceptance_rate": 0.73,
        "employment_rate": 0.92,
        "risk_index": 0.14,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 8.0,
        "ranking": 112,
        "scholarship_available": True
    },
    {
        "name": "TU Delft",
        "country": "Netherlands",
        "program": "MSc Computer Science",
        "avg_salary": 68000,
        "tuition": 18000,
        "visa_rate": 0.79,
        "acceptance_rate": 0.70,
        "employment_rate": 0.85,
        "risk_index": 0.21,
        "ielts_requirement": 6.5,
        "cgpa_requirement": 7.5,
        "ranking": 47,
        "scholarship_available": True
    },
    {
        "name": "University of Edinburgh",
        "country": "UK",
        "program": "MSc AI",
        "avg_salary": 80000,
        "tuition": 32000,
        "visa_rate": 0.74,
        "acceptance_rate": 0.68,
        "employment_rate": 0.88,
        "risk_index": 0.23,
        "ielts_requirement": 7.0,
        "cgpa_requirement": 8.0,
        "ranking": 22,
        "scholarship_available": True
    },
    {
        "name": "University of Auckland",
        "country": "New Zealand",
        "program": "MSc Computer Science",
        "avg_salary": 70000,
        "tuition": 32000,
        "visa_rate": 0.85,
        "acceptance_rate": 0.80,
        "employment_rate": 0.82,
        "risk_index": 0.18,
        "ielts_requirement": 6.5,
        "cgpa_requirement": 7.5,
        "ranking": 68,
        "scholarship_available": True
    }
]

def scrape_university_data(university_name: str, country: str) -> Dict:
    """
    Scrape university data from web sources
    This is a placeholder that simulates web scraping
    In production, this would scrape from actual university websites or APIs
    """
    # Simulate scraping delay
    time.sleep(random.uniform(0.5, 1.5))
    
    # In a real implementation, you would:
    # 1. Use requests to fetch university pages
    # 2. Parse HTML with BeautifulSoup
    # 3. Extract tuition, requirements, rankings, etc.
    # 4. Handle errors and rate limiting
    
    # Example scraping logic (commented out for MVP):
    """
    try:
        url = f"https://example-university-api.com/{university_name}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract data from HTML
        tuition = extract_tuition(soup)
        ranking = extract_ranking(soup)
        # ... etc
        
    except Exception as e:
        print(f"Scraping error for {university_name}: {e}")
        return None
    """
    
    # For MVP, return None to use static data
    return None

def get_university_by_name(name: str, db) -> University:
    """Get university from database by name, or return None"""
    return db.query(University).filter(University.name == name).first()

def initialize_universities(db):
    """Initialize database with static university data"""
    for uni_data in STATIC_UNIVERSITIES:
        existing = get_university_by_name(uni_data["name"], db)
        if not existing:
            university = University(**uni_data)
            db.add(university)
    db.commit()

def get_all_universities(db) -> List[University]:
    """Get all universities from database"""
    return db.query(University).all()

def search_universities_by_country(country: str, db) -> List[University]:
    """Search universities by country"""
    return db.query(University).filter(University.country == country).all()

def search_universities_by_field(field: str, db) -> List[University]:
    """Search universities by program field"""
    return db.query(University).filter(University.program.ilike(f"%{field}%")).all()

