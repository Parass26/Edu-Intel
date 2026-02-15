"""
Recommendation Engine - AI-powered university matching algorithm
"""
from typing import List, Tuple
from models import University, Student, Recommendation
from sqlalchemy.orm import Session

def calculate_roi_score(university: University) -> float:
    """
    Calculate ROI Score = (avg_salary * employment_rate) / tuition
    Normalized to 0-100 scale
    """
    if university.tuition == 0:
        return 100.0
    
    raw_roi = (university.avg_salary * university.employment_rate) / university.tuition
    # Normalize to 0-100 scale (assuming max ROI around 50)
    normalized_roi = min(100.0, (raw_roi / 50.0) * 100.0)
    return round(normalized_roi, 2)

def calculate_match_score(student: Student, university: University) -> float:
    """
    Calculate match score based on:
    - IELTS threshold match
    - Budget affordability
    - Country preference match
    Returns score 0-1
    """
    score = 0.0
    
    # IELTS match (40% weight)
    if student.ielts >= university.ielts_requirement:
        ielts_score = 1.0
    else:
        # Partial credit if close
        ielts_score = max(0.0, student.ielts / university.ielts_requirement)
    score += ielts_score * 0.4
    
    # Budget affordability (30% weight)
    if student.budget >= university.tuition:
        budget_score = 1.0
    else:
        # Partial credit if within 20% of budget
        budget_ratio = student.budget / university.tuition
        budget_score = max(0.0, budget_ratio / 1.2)
    score += budget_score * 0.3
    
    # Country preference match (30% weight)
    if student.country.lower() == university.country.lower():
        country_score = 1.0
    else:
        country_score = 0.0
    score += country_score * 0.3
    
    return round(score, 3)

def calculate_acceptance_probability(student: Student, university: University) -> float:
    """
    Calculate acceptance probability based on:
    - CGPA match
    - IELTS match
    - Base acceptance rate
    """
    base_rate = university.acceptance_rate
    
    # CGPA factor
    cgpa_ratio = student.cgpa / university.cgpa_requirement if university.cgpa_requirement > 0 else 1.0
    cgpa_factor = min(1.2, cgpa_ratio)  # Max 20% boost
    
    # IELTS factor
    ielts_ratio = student.ielts / university.ielts_requirement if university.ielts_requirement > 0 else 1.0
    ielts_factor = min(1.15, ielts_ratio)  # Max 15% boost
    
    adjusted_rate = base_rate * cgpa_factor * ielts_factor
    return round(min(100.0, adjusted_rate * 100), 2)

def calculate_risk_level(university: University, student: Student) -> str:
    """
    Determine risk level based on:
    - University risk index
    - Student profile match
    - Budget constraints
    """
    base_risk = university.risk_index
    
    # Adjust based on profile match
    if student.cgpa < university.cgpa_requirement:
        base_risk += 0.15
    if student.ielts < university.ielts_requirement:
        base_risk += 0.10
    if student.budget < university.tuition * 1.2:  # Less than 20% buffer
        base_risk += 0.10
    
    if base_risk < 0.20:
        return "Low"
    elif base_risk < 0.35:
        return "Medium"
    else:
        return "High"

def calculate_ai_confidence(roi: float, match: float, acceptance: float) -> float:
    """
    Calculate AI confidence score based on multiple factors
    """
    confidence = (roi * 0.3 + match * 100 * 0.3 + acceptance * 0.4)
    return round(min(100.0, confidence), 2)

def generate_recommendations(student: Student, universities: List[University], db: Session) -> List[dict]:
    """
    Generate top 5 university recommendations for a student
    """
    scored_universities = []
    
    for university in universities:
        # Calculate all metrics
        roi = calculate_roi_score(university)
        match = calculate_match_score(student, university)
        acceptance = calculate_acceptance_probability(student, university)
        employability = university.employment_rate * 100
        visa_success = university.visa_rate * 100
        risk_level = calculate_risk_level(university, student)
        ai_confidence = calculate_ai_confidence(roi, match, acceptance)
        
        # Final recommendation score
        final_score = (
            0.4 * (roi / 100.0) +
            0.3 * (acceptance / 100.0) +
            0.2 * (employability / 100.0) +
            0.1 * (visa_success / 100.0)
        )
        
        scored_universities.append({
            "university": university,
            "roi": roi,
            "match": match,
            "acceptance": acceptance,
            "employability": employability,
            "visa_success": visa_success,
            "risk_level": risk_level,
            "ai_confidence": ai_confidence,
            "final_score": final_score
        })
    
    # Sort by final score and get top 5
    scored_universities.sort(key=lambda x: x["final_score"], reverse=True)
    top_5 = scored_universities[:5]
    
    # Format response
    recommendations = []
    for idx, item in enumerate(top_5, start=1):
        uni = item["university"]
        recommendation = {
            "id": idx,
            "university": uni.name,
            "country": uni.country,
            "program": uni.program,
            "roiScore": item["roi"],
            "acceptanceProbability": item["acceptance"],
            "employability": item["employability"],
            "visaSuccess": item["visa_success"],
            "aiConfidence": item["ai_confidence"],
            "riskLevel": item["risk_level"],
            "tuitionFee": uni.tuition,
            "scholarshipAvailable": uni.scholarship_available,
            "ranking": uni.ranking
        }
        recommendations.append(recommendation)
        
        # Save to database
        db_recommendation = Recommendation(
            student_id=student.id,
            university_id=uni.id,
            roi_score=item["roi"],
            acceptance_probability=item["acceptance"],
            employability=item["employability"],
            visa_success=item["visa_success"],
            ai_confidence=item["ai_confidence"],
            risk_level=item["risk_level"]
        )
        db.add(db_recommendation)
    
    db.commit()
    return recommendations

