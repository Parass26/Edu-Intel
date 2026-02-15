import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, CheckCircle, XCircle, Clock, Edit } from 'lucide-react';
import { getMockStudents, submitCounselorReview } from '@/services/api';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusVariant = (s: string) => {
  switch (s) {
    case 'Approved': return 'success';
    case 'Rejected': return 'danger';
    case 'Under Review': return 'warning';
    case 'Modified': return 'info';
    default: return 'neutral';
  }
};

const CounselorPage = () => {
  const [students] = useState(getMockStudents());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleReview = async () => {
    if (!selectedId) return;
    await submitCounselorReview({ studentId: selectedId, status: status as any, comment });
    setSelectedId(null);
    setComment('');
    setStatus('');
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Counselor Dashboard</h1>
        <p className="text-muted-foreground">Review AI recommendations and validate student applications</p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'text-primary' },
          { label: 'Under Review', value: students.filter(s => s.status === 'Under Review').length, icon: Clock, color: 'text-warning' },
          { label: 'Approved', value: students.filter(s => s.status === 'Approved').length, icon: CheckCircle, color: 'text-success' },
          { label: 'High Risk', value: students.filter(s => s.riskLevel === 'High').length, icon: XCircle, color: 'text-destructive' },
        ].map(m => (
          <motion.div key={m.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <m.icon className={`h-5 w-5 mb-1 ${m.color}`} />
            <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">CGPA</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">IELTS</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Visa Prob.</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Risk</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Scholarship</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-card-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.country} · {s.field}</div>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">{s.cgpa}</td>
                  <td className="px-4 py-3 text-center font-medium">{s.ielts}</td>
                  <td className="px-4 py-3 text-center font-semibold text-primary">{s.visaProbability}%</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge variant={s.riskLevel === 'Low' ? 'success' : s.riskLevel === 'Medium' ? 'warning' : 'danger'}>{s.riskLevel}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-success">{s.scholarshipMatch}%</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge variant={statusVariant(s.status) as any}>{s.status}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setSelectedId(s.id)} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:bg-primary/10 px-2 py-1 rounded-md transition-colors">
                      <Edit className="h-3 w-3" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedId && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-bold text-card-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" /> Review Student #{selectedId}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">Update Status</label>
              <Select onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  {['Approved', 'Modified', 'Rejected', 'Under Review'].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">Counselor Comment</label>
              <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Add your review notes..." className="h-10" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleReview} className="gradient-primary text-primary-foreground">Submit Review</Button>
            <Button variant="outline" onClick={() => setSelectedId(null)}>Cancel</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CounselorPage;
