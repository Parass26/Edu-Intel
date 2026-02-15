import { motion } from 'framer-motion';
import { Flame, MapPin, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const demandData = [
  { skill: 'AI/ML', demand: 95, growth: '+28%', region: 'Global' },
  { skill: 'Cloud', demand: 90, growth: '+22%', region: 'North America' },
  { skill: 'Cybersecurity', demand: 88, growth: '+25%', region: 'Europe' },
  { skill: 'Data Science', demand: 85, growth: '+20%', region: 'Global' },
  { skill: 'DevOps', demand: 82, growth: '+18%', region: 'Asia Pacific' },
  { skill: 'Full Stack', demand: 78, growth: '+15%', region: 'Global' },
  { skill: 'Blockchain', demand: 62, growth: '+12%', region: 'North America' },
  { skill: 'IoT', demand: 58, growth: '+10%', region: 'Europe' },
];

const getColor = (demand: number) => {
  if (demand >= 85) return 'hsl(var(--destructive))';
  if (demand >= 70) return 'hsl(var(--warning))';
  return 'hsl(var(--info))';
};

const MarketDemandHeatmap = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
        <Flame className="h-5 w-5 text-destructive" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-card-foreground">Market Demand Heatmap</h3>
        <p className="text-sm text-muted-foreground">Global skill demand & hiring trends</p>
      </div>
    </div>

    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={demandData} layout="vertical" margin={{ left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={90} />
        <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
        <Bar dataKey="demand" radius={[0, 4, 4, 0]}>
          {demandData.map((d, i) => <Cell key={i} fill={getColor(d.demand)} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

    <div className="mt-4 grid grid-cols-2 gap-2">
      {demandData.slice(0, 4).map(d => (
        <div key={d.skill} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2 text-xs">
          <span className="font-medium text-card-foreground">{d.skill}</span>
          <span className="text-success font-semibold">{d.growth}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default MarketDemandHeatmap;
