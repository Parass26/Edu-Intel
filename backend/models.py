from pydantic import BaseModel, Field
from typing import Optional, Literal
from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

# Pydantic Models for API
class StudentProfile(BaseModel):
    name: str
    cgpa: float = Field(..., ge=0.0, le=10.0)
    ielts: float = Field(..., ge=0.0, le=9.0)
    budget: int = Field(..., gt=0)
    country: str
    field: str
    careerGoal: str

class RecommendationResponse(BaseModel):
    id: int
    university: str
    country: str
    program: str
    roiScore: float
    acceptanceProbability: float
    employability: float
    visaSuccess: float
    aiConfidence: float
    riskLevel: Literal['Low', 'Medium', 'High']
    tuitionFee: float
    scholarshipAvailable: bool
    ranking: int

class CounselorReviewRequest(BaseModel):
    studentId: int
    status: Literal['AI Generated', 'Under Review', 'Approved', 'Modified', 'Rejected']
    comment: str

class CounselorReviewResponse(BaseModel):
    success: bool
    message: str

class AnalyticsResponse(BaseModel):
    total_students: int
    avg_roi: float
    visa_success: float
    high_risk_cases: int
    scholarship_success: float

# SQLAlchemy Models for Database
class Student(Base):
    __tablename__ = "students"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    cgpa = Column(Float, nullable=False)
    ielts = Column(Float, nullable=False)
    budget = Column(Integer, nullable=False)
    country = Column(String, nullable=False)
    field = Column(String, nullable=False)
    career_goal = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class University(Base):
    __tablename__ = "universities"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    country = Column(String, nullable=False)
    program = Column(String, nullable=False)
    avg_salary = Column(Float, nullable=False)
    tuition = Column(Float, nullable=False)
    visa_rate = Column(Float, nullable=False)
    acceptance_rate = Column(Float, nullable=False)
    employment_rate = Column(Float, nullable=False)
    risk_index = Column(Float, nullable=False)
    ielts_requirement = Column(Float, nullable=False)
    cgpa_requirement = Column(Float, nullable=False)
    ranking = Column(Integer, nullable=False)
    scholarship_available = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False, index=True)
    university_id = Column(Integer, nullable=False, index=True)
    roi_score = Column(Float, nullable=False)
    acceptance_probability = Column(Float, nullable=False)
    employability = Column(Float, nullable=False)
    visa_success = Column(Float, nullable=False)
    ai_confidence = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CounselorReview(Base):
    __tablename__ = "counselor_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False, index=True)
    status = Column(String, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

