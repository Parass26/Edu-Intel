import { motion } from 'framer-motion';
import { Shield, Brain, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import USPSection from '@/components/USPSection';
import RevenueModelSection from '@/components/RevenueModelSection';
import FutureScopeSection from '@/components/FutureScopeSection';

const ethicsPrinciples = [
  { icon: AlertTriangle, title: 'Probabilistic Predictions', desc: 'All predictions are probabilistic estimates, not guarantees. Outcomes may vary based on individual circumstances.' },
  { icon: Users, title: 'Human Validation Required', desc: 'Every AI recommendation is validated by certified education counselors before final decisions.' },
  { icon: Shield, title: 'No Automated Decisions', desc: 'The platform never makes automated admission decisions. All outputs are advisory recommendations.' },
  { icon: Brain, title: 'Historical Data Based', desc: 'Predictions are derived from historical trends and may not reflect sudden policy or market changes.' },
  { icon: CheckCircle, title: 'Ethical Transparency', desc: 'Full explainability for every recommendation. Students can see exactly why each university was suggested.' },
];

const AboutPlatform = () => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl gradient-hero p-10 text-center">
      <h1 className="font-display text-3xl font-bold text-primary-foreground mb-3">EduIntel Platform</h1>
      <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
        The first Hybrid Human + AI Overseas Decision Intelligence Platform — transforming overseas education from guesswork to data-driven confidence.
      </p>
    </motion.div>

    <USPSection />
    <RevenueModelSection />
    <FutureScopeSection />

    <section className="py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">Responsible AI & Ethics</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Our commitment to ethical, transparent, and responsible AI practices.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ethicsPrinciples.map((e, i) => (
          <motion.div key={e.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <e.icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-display text-base font-bold text-card-foreground mb-1.5">{e.title}</h3>
            <p className="text-sm text-muted-foreground">{e.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default AboutPlatform;
