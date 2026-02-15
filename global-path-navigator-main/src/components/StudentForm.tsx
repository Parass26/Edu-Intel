import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StudentProfile } from '@/services/api';

interface Props {
  onSubmit: (profile: StudentProfile) => void;
  loading?: boolean;
}

const StudentForm = ({ onSubmit, loading }: Props) => {
  const [form, setForm] = useState<StudentProfile>({
    name: '', cgpa: 0, ielts: 0, budget: 0, country: '', field: '', careerGoal: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-card-foreground">Student Profile</h2>
          <p className="text-sm text-muted-foreground">Enter your details for AI-powered recommendations</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="cgpa">CGPA (out of 10)</Label>
          <Input id="cgpa" type="number" step="0.1" min="0" max="10" placeholder="8.5" onChange={e => setForm(f => ({ ...f, cgpa: parseFloat(e.target.value) || 0 }))} />
        </div>
        <div>
          <Label htmlFor="ielts">IELTS Score</Label>
          <Input id="ielts" type="number" step="0.5" min="0" max="9" placeholder="7.5" onChange={e => setForm(f => ({ ...f, ielts: parseFloat(e.target.value) || 0 }))} />
        </div>
        <div>
          <Label htmlFor="budget">Annual Budget (USD)</Label>
          <Input id="budget" type="number" placeholder="30000" onChange={e => setForm(f => ({ ...f, budget: parseInt(e.target.value) || 0 }))} />
        </div>
        <div>
          <Label>Preferred Country</Label>
          <Select onValueChange={v => setForm(f => ({ ...f, country: v }))}>
            <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
            <SelectContent>
              {['Canada', 'UK', 'Germany', 'Australia', 'USA', 'Singapore', 'Switzerland', 'Ireland'].map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Field of Study</Label>
          <Select onValueChange={v => setForm(f => ({ ...f, field: v }))}>
            <SelectTrigger><SelectValue placeholder="Select field" /></SelectTrigger>
            <SelectContent>
              {['Computer Science', 'Data Science', 'AI/ML', 'Business Analytics', 'Mechanical Eng', 'Electrical Eng', 'Finance', 'Biotechnology'].map(f => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>Career Goal</Label>
          <Select onValueChange={v => setForm(f => ({ ...f, careerGoal: v }))}>
            <SelectTrigger><SelectValue placeholder="Select career goal" /></SelectTrigger>
            <SelectContent>
              {['Software Engineer', 'Data Scientist', 'ML Engineer', 'Product Manager', 'Research Scientist', 'Consultant', 'Entrepreneur'].map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
            <Send className="mr-2 h-4 w-4" />
            {loading ? 'Analyzing...' : 'Get AI Recommendations'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentForm;
