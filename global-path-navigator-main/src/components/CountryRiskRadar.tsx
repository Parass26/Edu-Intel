import { motion } from 'framer-motion';
import { Globe, AlertTriangle, Briefcase, TrendingUp, Shield } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const countries = [
  { name: 'Canada', immigration: 85, economy: 82, stability: 90, workPermit: 88, safety: 92 },
  { name: 'Germany', immigration: 78, economy: 88, stability: 92, workPermit: 80, safety: 94 },
  { name: 'UK', immigration: 65, economy: 80, stability: 85, workPermit: 60, safety: 88 },
  { name: 'Australia', immigration: 72, economy: 78, stability: 88, workPermit: 75, safety: 90 },
];

const CountryRiskRadar = () => {
  const radarKeys = ['immigration', 'economy', 'stability', 'workPermit', 'safety'];
  const labels = ['Immigration', 'Economy', 'Stability', 'Work Permit', 'Safety'];
  const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--info))'];

  const radarData = labels.map((label, i) => {
    const point: Record<string, string | number> = { metric: label };
    countries.forEach(c => { point[c.name] = c[radarKeys[i] as keyof typeof c]; });
    return point;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
          <Globe className="h-5 w-5 text-info" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-card-foreground">Country Risk Radar</h3>
          <p className="text-sm text-muted-foreground">Multi-factor country comparison</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {countries.map((c, i) => (
            <Radar key={c.name} name={c.name} dataKey={c.name} stroke={colors[i]} fill={colors[i]} fillOpacity={0.08} strokeWidth={2} />
          ))}
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-3 justify-center">
        {countries.map((c, i) => (
          <div key={c.name} className="flex items-center gap-1.5 text-xs">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-muted-foreground">{c.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountryRiskRadar;
