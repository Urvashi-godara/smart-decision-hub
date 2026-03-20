import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Brain, Clock } from "lucide-react";
import bgAurora from "@/assets/bg-aurora-waves.jpg";
import SectionBackground from "./SectionBackground";

const metrics = [
  { icon: Clock, value: 50, suffix: "%", label: "Faster Decisions" },
  { icon: Brain, value: 10, suffix: "K+", label: "Decisions Made" },
  { icon: TrendingUp, value: 92, suffix: "%", label: "User Satisfaction" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold font-display glow-text">
      {count}{suffix}
    </div>
  );
};

const MetricsSection = () => (
  <SectionBackground image={bgAurora} opacity={0.18} overlay="dark">
    <section className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
            Real <span className="glow-text">Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg">Numbers that speak for themselves.</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 text-center group hover:shadow-[0_0_40px_hsla(173,80%,50%,0.1)] transition-all duration-500"
            >
              <m.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <Counter target={m.value} suffix={m.suffix} />
              <p className="text-muted-foreground mt-2">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </SectionBackground>
);

export default MetricsSection;
