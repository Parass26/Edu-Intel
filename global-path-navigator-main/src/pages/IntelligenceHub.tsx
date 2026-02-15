import { motion } from 'framer-motion';
import VisaPredictionPanel from '@/components/VisaPredictionPanel';
import ScholarshipPanel from '@/components/ScholarshipPanel';
import CountryRiskRadar from '@/components/CountryRiskRadar';
import MarketDemandHeatmap from '@/components/MarketDemandHeatmap';
import CareerSimulation from '@/components/CareerSimulation';

const IntelligenceHub = () => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="font-display text-2xl font-bold text-foreground">Intelligence Hub</h1>
      <p className="text-muted-foreground">AI-powered analytics for visa, career, scholarships, and market insights</p>
    </motion.div>

    <div className="grid gap-6 lg:grid-cols-2">
      <VisaPredictionPanel />
      <ScholarshipPanel />
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <CountryRiskRadar />
      <MarketDemandHeatmap />
    </div>

    <CareerSimulation />
  </div>
);

export default IntelligenceHub;
