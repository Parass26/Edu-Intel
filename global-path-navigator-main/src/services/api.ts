import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export interface StudentProfile {
  name: string;
  cgpa: number;
  ielts: number;
  budget: number;
  country: string;
  field: string;
  careerGoal: string;
}

export interface Recommendation {
  id: number;
  university: string;
  country: string;
  program: string;
  roiScore: number;
  acceptanceProbability: number;
  employability: number;
  visaSuccess: number;
  aiConfidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  tuitionFee: number;
  scholarshipAvailable: boolean;
  ranking: number;
}

export interface CounselorReview {
  studentId: number;
  status: 'AI Generated' | 'Under Review' | 'Approved' | 'Modified' | 'Rejected';
  comment: string;
}

// Student endpoints
export const submitStudentProfile = async (profile: StudentProfile) => {
  try {
    const res = await api.post('/recommend', profile);
    return res.data;
  } catch {
    return getMockRecommendations();
  }
};

// Counselor endpoints
export const submitCounselorReview = async (review: CounselorReview) => {
  try {
    const res = await api.post('/review', review);
    return res.data;
  } catch {
    return { success: true, message: 'Review submitted (mock)' };
  }
};

// Mock data
export const getMockRecommendations = (): Recommendation[] => [
  { id: 1, university: 'University of Toronto', country: 'Canada', program: 'MSc Computer Science', roiScore: 92, acceptanceProbability: 78, employability: 89, visaSuccess: 85, aiConfidence: 91, riskLevel: 'Low', tuitionFee: 32000, scholarshipAvailable: true, ranking: 18 },
  { id: 2, university: 'Technical University of Munich', country: 'Germany', program: 'MSc Data Science', roiScore: 95, acceptanceProbability: 72, employability: 91, visaSuccess: 82, aiConfidence: 88, riskLevel: 'Low', tuitionFee: 3000, scholarshipAvailable: true, ranking: 25 },
  { id: 3, university: 'University of Melbourne', country: 'Australia', program: 'MSc AI', roiScore: 85, acceptanceProbability: 80, employability: 82, visaSuccess: 78, aiConfidence: 85, riskLevel: 'Medium', tuitionFee: 38000, scholarshipAvailable: false, ranking: 33 },
  { id: 4, university: 'University College London', country: 'UK', program: 'MSc Machine Learning', roiScore: 88, acceptanceProbability: 65, employability: 87, visaSuccess: 72, aiConfidence: 82, riskLevel: 'Medium', tuitionFee: 35000, scholarshipAvailable: true, ranking: 8 },
  { id: 5, university: 'National University of Singapore', country: 'Singapore', program: 'MSc Computer Science', roiScore: 90, acceptanceProbability: 70, employability: 93, visaSuccess: 88, aiConfidence: 90, riskLevel: 'Low', tuitionFee: 28000, scholarshipAvailable: true, ranking: 11 },
  { id: 6, university: 'ETH Zurich', country: 'Switzerland', program: 'MSc Computer Science', roiScore: 97, acceptanceProbability: 55, employability: 95, visaSuccess: 80, aiConfidence: 87, riskLevel: 'Medium', tuitionFee: 1500, scholarshipAvailable: false, ranking: 6 },
  { id: 7, university: 'University of British Columbia', country: 'Canada', program: 'MSc Data Science', roiScore: 88, acceptanceProbability: 75, employability: 85, visaSuccess: 83, aiConfidence: 86, riskLevel: 'Low', tuitionFee: 30000, scholarshipAvailable: true, ranking: 35 },
  { id: 8, university: 'RWTH Aachen', country: 'Germany', program: 'MSc Computer Science', roiScore: 91, acceptanceProbability: 68, employability: 88, visaSuccess: 81, aiConfidence: 84, riskLevel: 'Low', tuitionFee: 2500, scholarshipAvailable: false, ranking: 42 },
];

export const getMockStudents = () => [
  { id: 1, name: 'Aarav Sharma', cgpa: 8.5, ielts: 7.5, country: 'Canada', field: 'Computer Science', status: 'Under Review' as const, visaProbability: 85, riskLevel: 'Low' as const, scholarshipMatch: 72 },
  { id: 2, name: 'Priya Patel', cgpa: 9.1, ielts: 8.0, country: 'UK', field: 'Data Science', status: 'AI Generated' as const, visaProbability: 72, riskLevel: 'Medium' as const, scholarshipMatch: 88 },
  { id: 3, name: 'Rahul Verma', cgpa: 7.8, ielts: 6.5, country: 'Germany', field: 'Mechanical Eng', status: 'Approved' as const, visaProbability: 81, riskLevel: 'Low' as const, scholarshipMatch: 45 },
  { id: 4, name: 'Sneha Gupta', cgpa: 8.9, ielts: 7.0, country: 'Australia', field: 'AI/ML', status: 'Modified' as const, visaProbability: 78, riskLevel: 'Medium' as const, scholarshipMatch: 65 },
  { id: 5, name: 'Vikram Singh', cgpa: 7.2, ielts: 6.0, country: 'Canada', field: 'Business Analytics', status: 'Rejected' as const, visaProbability: 60, riskLevel: 'High' as const, scholarshipMatch: 30 },
];

export default api;
