import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-decision.png";
import bgNetwork from "@/assets/bg-abstract-network.jpg";
import FloatingParticles from "./FloatingParticles";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={bgNetwork} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/75" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/8 blur-[100px]" />

      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Decision Making</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-tight mb-6">
            Stop Overthinking.{" "}
            <span className="glow-text">Start Deciding.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
            An intelligent decision-making platform that helps you choose faster, smarter, and with confidence.
          </p>

          <motion.a
            href="#decision-tool"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_hsla(173,80%,50%,0.35)] hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Deciding
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative animate-float">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
            <img
              src={heroImage}
              alt="Person making decisions with holographic interfaces"
              className="relative w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
