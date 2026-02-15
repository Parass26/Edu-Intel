import { useState } from 'react';
import { motion } from 'framer-motion';
import StudentForm from '@/components/StudentForm';
import RecommendationTable from '@/components/RecommendationTable';
import UniversityDetailModal from '@/components/UniversityDetailModal';
import { submitStudentProfile, getMockRecommendations, type Recommendation, type StudentProfile } from '@/services/api';

const StudentPortal = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selected, setSelected] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (profile: StudentProfile) => {
    setLoading(true);
    try {
      const data = await submitStudentProfile(profile);
      setRecommendations(Array.isArray(data) ? data : getMockRecommendations());
    } catch {
      setRecommendations(getMockRecommendations());
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Student Portal</h1>
        <p className="text-muted-foreground">Get AI-powered university recommendations tailored to your profile</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <StudentForm onSubmit={handleSubmit} loading={loading} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          {submitted && recommendations.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Avg ROI', value: `${Math.round(recommendations.reduce((a, r) => a + r.roiScore, 0) / recommendations.length)}%`, color: 'text-success' },
                  { label: 'Avg Acceptance', value: `${Math.round(recommendations.reduce((a, r) => a + r.acceptanceProbability, 0) / recommendations.length)}%`, color: 'text-info' },
                  { label: 'Avg Visa', value: `${Math.round(recommendations.reduce((a, r) => a + r.visaSuccess, 0) / recommendations.length)}%`, color: 'text-primary' },
                  { label: 'Scholarships', value: `${recommendations.filter(r => r.scholarshipAvailable).length}/${recommendations.length}`, color: 'text-warning' },
                ].map(m => (
                  <motion.div key={m.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
                    <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </motion.div>
                ))}
              </div>
              <RecommendationTable data={recommendations} onSelect={setSelected} />
            </>
          )}

          {!submitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-16">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary opacity-40">
                  <svg className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground/60">Fill your profile to get started</h3>
                <p className="text-sm text-muted-foreground">AI will analyze your profile and recommend the best universities</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <UniversityDetailModal university={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default StudentPortal;
