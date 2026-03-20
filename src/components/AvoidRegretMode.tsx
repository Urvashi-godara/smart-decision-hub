import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, DollarSign, Battery, Frown, Check } from "lucide-react";

const filters = [
  { id: "money", label: "Wasting Money", icon: DollarSign, tip: "We'll prioritize cost-effective options and highlight savings." },
  { id: "tired", label: "Feeling Tired", icon: Battery, tip: "We'll favor low-effort, convenient choices that save energy." },
  { id: "regret", label: "Regret Later", icon: Frown, tip: "We'll focus on safe, well-reviewed options with high satisfaction rates." },
];

const AvoidRegretMode = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/[0.02] to-transparent" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Innovative Feature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
            Avoid <span className="glow-text">Regret Mode</span>
          </h2>
          <p className="text-muted-foreground text-lg">Tell us what you want to avoid — we'll adjust every recommendation.</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {filters.map((f, i) => {
            const active = selected.includes(f.id);
            return (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toggle(f.id)}
                className={`glass-card p-6 text-center transition-all duration-300 cursor-pointer ${
                  active ? "glow-border border-primary/40 bg-primary/5" : "hover:border-primary/20"
                }`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center transition-colors ${
                  active ? "bg-primary/20" : "bg-muted"
                }`}>
                  {active ? <Check className="w-6 h-6 text-primary" /> : <f.icon className="w-6 h-6 text-muted-foreground" />}
                </div>
                <p className="font-semibold font-display mb-2">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.tip}</p>
              </motion.button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-primary mt-6"
          >
            ✓ Regret filters active — your recommendations will be adjusted accordingly.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default AvoidRegretMode;
