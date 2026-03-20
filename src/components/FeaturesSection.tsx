import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, MessageSquare, BarChart3, User } from "lucide-react";

const features = [
  { icon: Brain, title: "Smart Decision Engine", desc: "AI-powered analysis that weighs all factors to find your optimal choice." },
  { icon: Sparkles, title: "Personalized Recommendations", desc: "Tailored suggestions based on your preferences, mood, and priorities." },
  { icon: Zap, title: "Instant Results", desc: "Get clear answers in seconds, not hours of deliberation." },
  { icon: MessageSquare, title: "Explainable Decisions", desc: "Understand exactly why a choice was recommended for you." },
  { icon: BarChart3, title: "Confidence Score System", desc: "See how confident the engine is about each recommendation." },
  { icon: User, title: "Decision Personality Analysis", desc: "Discover your unique decision-making style and tendencies." },
];

const FeaturesSection = () => (
  <section className="section-padding relative">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
          Everything You Need to <span className="glow-text">Decide Better</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powerful features designed to eliminate decision fatigue and boost your confidence.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-6 lg:p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-display mb-2">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
