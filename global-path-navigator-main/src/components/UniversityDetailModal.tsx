import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, MapPin, DollarSign, Award, Shield, Brain, BarChart3 } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import type { Recommendation } from '@/services/api';
import StatusBadge from './StatusBadge';

interface Props {
  university: Recommendation | null;
  open: boolean;
  onClose: () => void;
}

const UniversityDetailModal = ({ university, open, onClose }: Props) => {
  if (!university) return null;

  const radarData = [
    { metric: 'ROI', value: university.roiScore },
    { metric: 'Accept.', value: university.acceptanceProbability },
    { metric: 'Employ.', value: university.employability },
    { metric: 'Visa', value: university.visaSuccess },
    { metric: 'AI Conf.', value: university.aiConfidence },
  ];

  const metrics = [
    { icon: TrendingUp, label: 'ROI Score', value: `${university.roiScore}%`, color: 'text-success' },
    { icon: Shield, label: 'Acceptance', value: `${university.acceptanceProbability}%`, color: 'text-info' },
    { icon: BarChart3, label: 'Employability', value: `${university.employability}%`, color: 'text-accent' },
    { icon: MapPin, label: 'Visa Success', value: `${university.visaSuccess}%`, color: 'text-primary' },
    { icon: Brain, label: 'AI Confidence', value: `${university.aiConfidence}%`, color: 'text-warning' },
    { icon: DollarSign, label: 'Tuition/Year', value: `$${university.tuitionFee.toLocaleString()}`, color: 'text-foreground' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{university.university}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {university.country} · {university.program} · Rank #{university.ranking}
          </div>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map(m => (
              <motion.div key={m.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-lg border border-border bg-muted/30 p-3">
                <m.icon className={`h-4 w-4 mb-1 ${m.color}`} />
                <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-2 space-y-3">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h4 className="mb-2 font-display text-sm font-semibold text-card-foreground flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" /> AI Explainability
            </h4>
            <p className="text-sm text-muted-foreground">
              This recommendation scores highly due to strong alignment between your CGPA and the program's acceptance range,
              combined with favorable visa approval trends for your nationality. The ROI projection factors in average post-graduation
              salary of ${(university.tuitionFee * 2.5).toLocaleString()} within 3 years of graduation.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Risk Level:</span>
              <StatusBadge variant={university.riskLevel === 'Low' ? 'success' : university.riskLevel === 'Medium' ? 'warning' : 'danger'}>
                {university.riskLevel}
              </StatusBadge>
            </div>
            {university.scholarshipAvailable && (
              <div className="flex items-center gap-1.5 text-sm text-success">
                <Award className="h-4 w-4" /> Scholarship Available
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniversityDetailModal;
