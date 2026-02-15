import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, DollarSign, Home, TrendingUp } from 'lucide-react';

const salaryProjection = [
  { year: 'Year 0', salary: 0 }, { year: 'Year 1', salary: 55000 }, { year: 'Year 2', salary: 68000 },
  { year: 'Year 3', salary: 82000 }, { year: 'Year 4', salary: 95000 }, { year: 'Year 5', salary: 110000 },
];

const milestones = [
  { icon: Rocket, label: 'Graduation', time: 'Year 0', detail: 'Complete program' },
  { icon: DollarSign, label: 'Break-even', time: 'Year 2.5', detail: 'Recover investment' },
  { icon: Home, label: 'PR Eligible', time: 'Year 3', detail: 'Permanent residency pathway' },
  { icon: TrendingUp, label: 'Senior Role', time: 'Year 5', detail: '$110K+ expected salary' },
];

const CareerSimulation = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-accent">
        <Rocket className="h-5 w-5 text-accent-foreground" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-card-foreground">Career Simulation</h3>
        <p className="text-sm text-muted-foreground">5-year salary & career projection</p>
      </div>
    </div>

    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={salaryProjection}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={v => `$${v / 1000}K`} />
        <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Salary']} />
        <Line type="monotone" dataKey="salary" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>

    <div className="mt-4 grid grid-cols-2 gap-3">
      {milestones.map((m, i) => (
        <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-muted/20 p-2.5">
          <m.icon className="h-4 w-4 text-accent shrink-0" />
          <div>
            <div className="text-xs font-semibold text-card-foreground">{m.label}</div>
            <div className="text-[10px] text-muted-foreground">{m.time} · {m.detail}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default CareerSimulation;
