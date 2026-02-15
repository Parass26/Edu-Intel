import { motion } from 'framer-motion';
import { Award, Calendar, DollarSign, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const scholarships = [
  { name: 'DAAD Scholarship', country: 'Germany', match: 88, amount: '$15,000/yr', deadline: 'Oct 2025', type: 'Merit-based' },
  { name: 'Chevening Scholarship', country: 'UK', match: 72, amount: 'Full Tuition', deadline: 'Nov 2025', type: 'Government' },
  { name: 'Canada Graduate Scholarship', country: 'Canada', match: 65, amount: '$17,500/yr', deadline: 'Dec 2025', type: 'Research' },
  { name: 'Australia Awards', country: 'Australia', match: 58, amount: 'Full Tuition + Living', deadline: 'Apr 2026', type: 'Government' },
  { name: 'ETH Excellence Scholarship', country: 'Switzerland', match: 45, amount: 'CHF 12,000', deadline: 'Dec 2025', type: 'Merit-based' },
];

const ScholarshipPanel = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
        <Award className="h-5 w-5 text-warning" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-card-foreground">Scholarship Intelligence</h3>
        <p className="text-sm text-muted-foreground">AI-matched funding opportunities</p>
      </div>
    </div>

    <div className="space-y-3">
      {scholarships.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-lg border border-border/50 bg-muted/20 p-3"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-medium text-sm text-card-foreground">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.country} · {s.type}</div>
            </div>
            <span className="text-sm font-bold text-success">{s.match}% match</span>
          </div>
          <Progress value={s.match} className="h-1.5 mb-2" />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{s.amount}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{s.deadline}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ScholarshipPanel;
