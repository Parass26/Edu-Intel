import { motion } from 'framer-motion';
import { DollarSign, Building, GraduationCap, BarChart3, Shield, Database } from 'lucide-react';

const streams = [
  { icon: Building, name: 'B2B SaaS Licensing', desc: 'Consultancies subscribe monthly for platform access', model: 'Recurring', potential: 'High' },
  { icon: BarChart3, name: 'Premium AI Reports', desc: 'Students pay for advanced analytics & insights', model: 'Per-report', potential: 'Medium' },
  { icon: GraduationCap, name: 'University Partnerships', desc: 'Pay-per-qualified applicant referral fees', model: 'Commission', potential: 'High' },
  { icon: DollarSign, name: 'Upskilling Programs', desc: 'Monetize skill-gap insights with course recommendations', model: 'Affiliate', potential: 'Medium' },
  { icon: Shield, name: 'Visa Risk Analytics', desc: 'Premium advisory reports for immigration planning', model: 'Per-report', potential: 'Medium' },
  { icon: Database, name: 'Data Intelligence Services', desc: 'Anonymized global mobility insights for institutions', model: 'Enterprise', potential: 'High' },
];

const RevenueModelSection = () => (
  <section className="py-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
      <h2 className="font-display text-3xl font-bold text-foreground mb-3">Revenue Model</h2>
      <p className="text-muted-foreground max-w-xl mx-auto">Multi-stream monetization strategy designed for scalable growth.</p>
    </motion.div>

    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">Revenue Stream</th>
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">Description</th>
            <th className="px-5 py-3 text-center font-medium text-muted-foreground">Model</th>
            <th className="px-5 py-3 text-center font-medium text-muted-foreground">Potential</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((s, i) => (
            <motion.tr key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border/50 last:border-0">
              <td className="px-5 py-3 flex items-center gap-2">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="font-medium text-card-foreground">{s.name}</span>
              </td>
              <td className="px-5 py-3 text-muted-foreground">{s.desc}</td>
              <td className="px-5 py-3 text-center"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s.model}</span></td>
              <td className="px-5 py-3 text-center"><span className={`text-xs font-semibold ${s.potential === 'High' ? 'text-success' : 'text-warning'}`}>{s.potential}</span></td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default RevenueModelSection;
