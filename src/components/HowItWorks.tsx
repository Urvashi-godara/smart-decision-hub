import { motion } from "framer-motion";
import { ListChecks, HelpCircle, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: ListChecks, title: "Select Category", desc: "Choose from Food, Career, Movies, Daily Life, and more." },
  { icon: HelpCircle, title: "Answer Questions", desc: "A few quick questions about your mood, budget, and priorities." },
  { icon: Cpu, title: "System Analyzes", desc: "Our engine processes your preferences to find the best match." },
  { icon: CheckCircle2, title: "Get Your Answer", desc: "Receive an instant recommendation with explanation and confidence score." },
];

const HowItWorks = () => (
  <section className="section-padding relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
    <div className="max-w-5xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
          How It <span className="glow-text">Works</span>
        </h2>
        <p className="text-muted-foreground text-lg">Four simple steps to your perfect decision.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="relative mx-auto mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto animate-glow-pulse">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
