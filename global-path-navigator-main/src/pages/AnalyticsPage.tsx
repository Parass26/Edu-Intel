import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, AlertTriangle, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const roiData = [
  { country: 'Canada', roi: 92 }, { country: 'Germany', roi: 95 }, { country: 'UK', roi: 85 },
  { country: 'Australia', roi: 82 }, { country: 'Singapore', roi: 90 }, { country: 'Switzerland', roi: 97 },
];

const visaTrend = [
  { month: 'Jan', rate: 78 }, { month: 'Feb', rate: 80 }, { month: 'Mar', rate: 76 },
  { month: 'Apr', rate: 82 }, { month: 'May', rate: 85 }, { month: 'Jun', rate: 83 },
  { month: 'Jul', rate: 87 }, { month: 'Aug', rate: 84 }, { month: 'Sep', rate: 86 },
  { month: 'Oct', rate: 88 }, { month: 'Nov', rate: 85 }, { month: 'Dec', rate: 89 },
];

const riskDist = [
  { name: 'Low', value: 45, color: 'hsl(var(--success))' },
  { name: 'Medium', value: 35, color: 'hsl(var(--warning))' },
  { name: 'High', value: 20, color: 'hsl(var(--destructive))' },
];

const countryDist = [
  { name: 'Canada', value: 30, color: 'hsl(var(--primary))' },
  { name: 'Germany', value: 22, color: 'hsl(var(--accent))' },
  { name: 'UK', value: 18, color: 'hsl(var(--info))' },
  { name: 'Australia', value: 15, color: 'hsl(var(--warning))' },
  { name: 'Others', value: 15, color: 'hsl(var(--muted-foreground))' },
];

const salaryData = [
  { range: '$40-60K', count: 12 }, { range: '$60-80K', count: 28 }, { range: '$80-100K', count: 35 },
  { range: '$100-120K', count: 18 }, { range: '$120K+', count: 7 },
];

const AnalyticsPage = () => {
  const [filter, setFilter] = useState('all');

  const cards = [
    { label: 'Total Students', value: '1,247', icon: Users, color: 'text-primary', change: '+12%' },
    { label: 'Average ROI', value: '89%', icon: TrendingUp, color: 'text-success', change: '+5%' },
    { label: 'Visa Success', value: '84%', icon: Shield, color: 'text-info', change: '+3%' },
    { label: 'High Risk', value: '18%', icon: AlertTriangle, color: 'text-destructive', change: '-2%' },
    { label: 'Scholarship Rate', value: '62%', icon: Award, color: 'text-warning', change: '+8%' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform-wide performance metrics & insights</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
            <SelectItem value="uk">UK</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <c.icon className={`h-5 w-5 mb-1 ${c.color}`} />
            <div className={`text-xl font-bold ${c.color}`}>{c.value}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{c.label}</span>
              <span className="text-xs text-success font-medium">{c.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-card-foreground mb-4">ROI by Country</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="country" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="roi" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-card-foreground mb-4">Visa Approval Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={visaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="rate" stroke="hsl(var(--info))" fill="hsl(var(--info))" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-card-foreground mb-4">Risk Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={riskDist} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} strokeWidth={0}>
                  {riskDist.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {riskDist.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-card-foreground">{d.name}</span>
                  <span className="text-sm font-semibold text-muted-foreground">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-card-foreground mb-4">Alumni Salary Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
