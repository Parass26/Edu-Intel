import { motion } from 'framer-motion';
import { Rocket, Database, Handshake, Globe, Brain, Building } from 'lucide-react';

const phases = [
  { icon: Rocket, phase: 'Phase 1', title: 'MVP Launch', timeline: 'Q1 2025', items: ['Student profiling', 'AI recommendations', 'ROI calculator', 'Counselor review panel'] },
  { icon: Database, phase: 'Phase 2', title: 'Data Integration', timeline: 'Q2 2025', items: ['Global university databases', 'Real-time visa data', 'Alumni outcome tracking', 'Scholarship aggregation'] },
  { icon: Brain, phase: 'Phase 3', title: 'Advanced AI', timeline: 'Q3 2025', items: ['Predictive job placement', 'SOP/Resume AI auditor', 'Career simulation engine', 'Market demand analytics'] },
  { icon: Handshake, phase: 'Phase 4', title: 'Partnerships', timeline: 'Q4 2025', items: ['Bank/loan integrations', 'University partnerships', 'B2B SaaS licensing', 'Government programs'] },
  { icon: Globe, phase: 'Phase 5', title: 'Global Scale', timeline: '2026', items: ['Multi-language support', 'Regional compliance', 'Migration pathway AI', 'Talent mobility platform'] },
];

const FutureScopeSection = () => (
  <section className="py-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
      <h2 className="font-display text-3xl font-bold text-foreground mb-3">Future Expansion Roadmap</h2>
      <p className="text-muted-foreground max-w-xl mx-auto">Our vision for building the world's most intelligent education mobility platform.</p>
    </motion.div>

    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
      <div className="space-y-6">
        {phases.map((p, i) => (
          <motion.div
            key={p.phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative flex gap-5 md:ml-6"
          >
            <div className="hidden md:flex relative z-10 h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary shadow-glow -ml-6">
              <p.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-primary">{p.phase}</span>
                <span className="text-xs text-muted-foreground">{p.timeline}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground mb-2">{p.title}</h3>
              <ul className="grid grid-cols-2 gap-1.5">
                {p.items.map(item => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FutureScopeSection;
