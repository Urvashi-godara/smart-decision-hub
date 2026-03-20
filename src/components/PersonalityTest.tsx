import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, RotateCcw } from "lucide-react";

const questions = [
  { q: "When choosing where to eat, you usually…", a: ["Research reviews thoroughly", "Go with your gut feeling", "Ask friends for opinions", "Pick the closest option"] },
  { q: "Faced with two great job offers, you'd…", a: ["Make a detailed pros/cons list", "Trust your excitement", "Sleep on it for days", "Flip a coin honestly"] },
  { q: "Shopping for a big purchase, you…", a: ["Compare every option online", "Buy the first thing you like", "Wait for the best deal", "Ask an expert"] },
  { q: "Your vacation planning style is…", a: ["Itinerary planned by the hour", "Book a flight and wing it", "Let someone else decide", "Go wherever is cheapest"] },
  { q: "When a friend asks for advice, you…", a: ["Lay out all options logically", "Share what feels right", "Suggest they follow their heart", "Give the most practical answer"] },
];

type PersonalityType = { name: string; emoji: string; desc: string };

const personalities: PersonalityType[] = [
  { name: "The Analytical Strategist", emoji: "🧠", desc: "You weigh every option carefully before committing. Data and logic are your best friends. You rarely regret your choices because they're thoroughly vetted." },
  { name: "The Spontaneous Decider", emoji: "⚡", desc: "You trust your instincts and act fast. Life's too short for overthinking! Your decisions are bold, and you embrace whatever outcome follows." },
  { name: "The Thoughtful Deliberator", emoji: "🤔", desc: "You value input from others and take your time. You're empathetic and consider how decisions affect everyone involved." },
  { name: "The Practical Optimizer", emoji: "🎯", desc: "Efficiency is your superpower. You find the most practical path with minimal fuss — no drama, just results." },
];

const PersonalityTest = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<PersonalityType | null>(null);

  const handleAnswer = (idx: number) => {
    const next = [...answers, idx];
    if (next.length === questions.length) {
      // Tally by answer index preference
      const counts = [0, 0, 0, 0];
      next.forEach((a) => counts[a]++);
      const maxIdx = counts.indexOf(Math.max(...counts));
      setResult(personalities[maxIdx]);
    } else {
      setAnswers(next);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section className="section-padding relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
            Decision <span className="glow-text">Personality Test</span>
          </h2>
          <p className="text-muted-foreground text-lg">Discover your unique decision-making style in 5 quick questions.</p>
        </motion.div>

        <div className="glass-card p-6 sm:p-8 lg:p-10 min-h-[320px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Question {step + 1} of {questions.length}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <h3 className="text-xl font-semibold font-display mb-6">{questions[step].q}</h3>
                <div className="space-y-3">
                  {questions[step].a.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left px-5 py-4 rounded-lg bg-muted/40 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span>{a}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{result.emoji}</div>
                <h3 className="text-2xl font-bold font-display glow-text mb-3">{result.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">{result.desc}</p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-muted border border-border hover:border-primary/40 transition-all text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Test
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PersonalityTest;
