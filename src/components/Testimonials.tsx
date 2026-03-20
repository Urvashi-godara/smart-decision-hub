import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import bgAurora from "@/assets/bg-aurora-waves.jpg";
import SectionBackground from "./SectionBackground";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Product Manager",
    text: "DecideMate saved me from spending 30 minutes deciding what to eat every night. Now it takes 10 seconds. Seriously life-changing for indecisive people.",
    stars: 5,
  },
  {
    name: "Marcus T.",
    role: "University Student",
    text: "I used the personality test before choosing my major electives. Turns out I'm a 'Practical Optimizer' — and the tool recommended courses I ended up loving.",
    stars: 5,
  },
  {
    name: "Priya R.",
    role: "Freelance Designer",
    text: "The Avoid Regret Mode is genius. I told it I hate wasting money, and every recommendation since has been budget-conscious without feeling cheap.",
    stars: 4,
  },
];

const Testimonials = () => (
  <SectionBackground image={bgAurora} opacity={0.1} overlay="darker">
    <section className="section-padding relative">
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
            What People <span className="glow-text">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 mb-4 leading-relaxed text-sm">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </SectionBackground>
);

export default Testimonials;
