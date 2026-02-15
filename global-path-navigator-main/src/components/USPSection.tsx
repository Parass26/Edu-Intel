import { motion } from 'framer-motion';
import { Brain, Users, Target, TrendingUp, Shield, Zap } from 'lucide-react';

const features = [
  { icon: Target, title: 'Career Outcome Focus', desc: 'We optimize for your career success, not just university admission. Every recommendation considers employability and ROI.' },
  { icon: Brain, title: 'Hybrid AI + Human Intelligence', desc: 'First platform combining AI analytics with expert counselor validation for trustworthy, data-driven decisions.' },
  { icon: TrendingUp, title: 'ROI-Centered Guidance', desc: 'Every university is scored on return on investment, factoring tuition, living costs, and projected post-graduation earnings.' },
  { icon: Shield, title: 'Predictive Visa Intelligence', desc: 'AI-powered visa approval predictions using historical data, nationality patterns, and document strength analysis.' },
  { icon: Users, title: 'Replaces Guesswork', desc: 'Data-driven decisions replace traditional consultancy guesswork. Transparent, explainable AI recommendations.' },
  { icon: Zap, title: 'Real-Time Market Intelligence', desc: 'Live skill demand analytics, hiring trends, and salary projections to future-proof your education investment.' },
];

const USPSection = () => (
  <section className="py-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
      <h2 className="font-display text-3xl font-bold text-foreground mb-3">Why EduIntel?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">The first Hybrid Human + AI Overseas Decision Intelligence Platform — focused on career outcomes, not just admissions.</p>
    </motion.div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary group-hover:animate-pulse-glow transition-shadow">
            <f.icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="mb-2 font-display text-lg font-bold text-card-foreground">{f.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default USPSection;
