import { motion } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { year: '2019', rate: 72 }, { year: '2020', rate: 58 }, { year: '2021', rate: 65 },
  { year: '2022', rate: 75 }, { year: '2023', rate: 79 }, { year: '2024', rate: 82 }, { year: '2025', rate: 85 },
];

const riskFactors = [
  { factor: 'Financial Documentation', status: 'pass', note: 'Bank statements sufficient' },
  { factor: 'Academic Credentials', status: 'pass', note: 'Meets minimum requirements' },
  { factor: 'Language Proficiency', status: 'pass', note: 'IELTS above threshold' },
  { factor: 'Immigration History', status: 'warning', note: 'First-time applicant — neutral' },
  { factor: 'Gap Year Analysis', status: 'pass', note: 'No unexplained gaps' },
];

const VisaPredictionPanel = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
        <Shield className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-card-foreground">Visa Success Prediction</h3>
        <p className="text-sm text-muted-foreground">AI-powered approval probability analysis</p>
      </div>
    </div>

    <div className="mb-6 grid grid-cols-3 gap-3">
      {[
        { label: 'Approval Prob.', value: '82%', color: 'text-success' },
        { label: 'Risk Score', value: 'Low', color: 'text-accent' },
        { label: 'Confidence', value: '91%', color: 'text-info' },
      ].map(m => (
        <div key={m.label} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
          <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
          <div className="text-xs text-muted-foreground">{m.label}</div>
        </div>
      ))}
    </div>

    <div className="mb-6">
      <h4 className="mb-2 text-sm font-semibold text-card-foreground">Historical Approval Trend</h4>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
          <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div>
      <h4 className="mb-2 text-sm font-semibold text-card-foreground">Risk Factor Analysis</h4>
      <div className="space-y-2">
        {riskFactors.map(r => (
          <div key={r.factor} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
            <div className="flex items-center gap-2">
              {r.status === 'pass' ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" />}
              <span className="text-sm font-medium text-card-foreground">{r.factor}</span>
            </div>
            <span className="text-xs text-muted-foreground">{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default VisaPredictionPanel;
