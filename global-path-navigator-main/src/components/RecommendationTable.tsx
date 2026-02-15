import { motion } from 'framer-motion';
import { TrendingUp, Shield, Briefcase, Eye, Award } from 'lucide-react';
import type { Recommendation } from '@/services/api';
import StatusBadge from './StatusBadge';

interface Props {
  data: Recommendation[];
  onSelect: (r: Recommendation) => void;
}

const RecommendationTable = ({ data, onSelect }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card shadow-card overflow-hidden"
    >
      <div className="border-b border-border p-4">
        <h2 className="font-display text-lg font-bold text-card-foreground">AI Recommendations</h2>
        <p className="text-sm text-muted-foreground">{data.length} universities matched your profile</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">University</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground"><TrendingUp className="inline h-3.5 w-3.5 mr-1" />ROI</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground"><Shield className="inline h-3.5 w-3.5 mr-1" />Acceptance</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground"><Briefcase className="inline h-3.5 w-3.5 mr-1" />Employ.</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Visa</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Risk</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground"><Award className="inline h-3.5 w-3.5 mr-1" />Schol.</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-card-foreground">{r.university}</div>
                  <div className="text-xs text-muted-foreground">{r.country} · {r.program}</div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-semibold text-success">{r.roiScore}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-semibold text-info">{r.acceptanceProbability}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-semibold text-accent">{r.employability}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-semibold text-primary">{r.visaSuccess}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge variant={r.riskLevel === 'Low' ? 'success' : r.riskLevel === 'Medium' ? 'warning' : 'danger'}>
                    {r.riskLevel}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3 text-center">
                  {r.scholarshipAvailable ? (
                    <span className="text-xs font-medium text-success">Available</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onSelect(r)}
                    className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Eye className="h-3 w-3" /> Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecommendationTable;
