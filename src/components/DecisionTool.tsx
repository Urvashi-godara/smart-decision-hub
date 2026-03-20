import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, BarChart3, MessageSquare } from "lucide-react";
import bgNetwork from "@/assets/bg-abstract-network.jpg";
import SectionBackground from "./SectionBackground";

const categories = ["Food", "Career", "Movies", "Daily Life", "Shopping", "Travel"];
const budgets = ["Low", "Medium", "High"];
const moods = ["Happy", "Tired", "Confused", "Adventurous", "Stressed", "Bored"];
const priorities = ["Save Money", "Save Time", "Comfort", "Fun", "Health"];

const recommendations: Record<string, { rec: string; why: string }[]> = {
  Food: [
    { rec: "Try a homemade stir-fry with seasonal vegetables", why: "Quick, budget-friendly, and nutritious — perfect for your current state." },
    { rec: "Order from that Thai place you bookmarked", why: "A mood-boosting comfort meal without the cooking effort." },
    { rec: "Go for a light salad bowl with grains", why: "Energizing and easy on the wallet." },
  ],
  Career: [
    { rec: "Take an online micro-course on your weakest skill", why: "Low commitment, high ROI for career growth." },
    { rec: "Update your portfolio and reach out to 3 contacts", why: "Networking yields the highest return in career decisions." },
    { rec: "Schedule a 1-on-1 with your mentor or manager", why: "Direct feedback accelerates progress more than solo research." },
  ],
  Movies: [
    { rec: "Watch a critically acclaimed indie film you've never heard of", why: "New perspectives stimulate creativity and refresh your mood." },
    { rec: "Re-watch your all-time favorite comfort movie", why: "Familiarity reduces cognitive load and maximizes relaxation." },
    { rec: "Start that limited series everyone's been talking about", why: "Social currency + entertainment in one decision." },
  ],
  "Daily Life": [
    { rec: "Reorganize one small area of your space today", why: "Small environmental changes create outsized motivation boosts." },
    { rec: "Take a 30-minute walk without your phone", why: "Digital detox + movement is the fastest way to reset." },
    { rec: "Call a friend you haven't spoken to in months", why: "Social connection is the most underrated productivity hack." },
  ],
  Shopping: [
    { rec: "Wait 48 hours before any purchase over $50", why: "The cooling-off period eliminates 70% of impulse regret." },
    { rec: "Buy the mid-tier option — it's almost always the best value", why: "Premium tax rarely matches premium quality." },
    { rec: "Check your existing inventory first", why: "You likely already own something that serves the same purpose." },
  ],
  Travel: [
    { rec: "Explore a nearby town you've never visited", why: "Novelty doesn't require distance — proximity reduces cost and stress." },
    { rec: "Book a last-minute deal for next weekend", why: "Spontaneous trips create stronger memories than over-planned ones." },
    { rec: "Plan a staycation with a strict no-work rule", why: "Rest quality matters more than destination quality." },
  ],
};

const DecisionTool = () => {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [mood, setMood] = useState("");
  const [priority, setPriority] = useState("");
  const [result, setResult] = useState<{ rec: string; why: string; confidence: number } | null>(null);

  const generate = () => {
    if (!category || !budget || !mood || !priority) return;
    const options = recommendations[category] || recommendations.Food;
    const pick = options[Math.floor(Math.random() * options.length)];
    const confidence = 70 + Math.floor(Math.random() * 25);
    setResult({ ...pick, confidence });
  };

  const prefill = (cat: string) => {
    setCategory(cat);
    setResult(null);
    document.getElementById("decision-tool")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionBackground image={bgNetwork} opacity={0.08} overlay="darker">
      <section id="decision-tool" className="section-padding relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
              <span className="glow-text">Decision Tool</span>
            </h2>
            <p className="text-muted-foreground text-lg">Tell us what you're deciding and we'll do the thinking.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 lg:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <SelectField label="Category" value={category} onChange={setCategory} options={categories} />
              <SelectField label="Budget" value={budget} onChange={setBudget} options={budgets} />
              <SelectField label="Mood" value={mood} onChange={setMood} options={moods} />
              <SelectField label="Priority" value={priority} onChange={setPriority} options={priorities} />
            </div>

            <motion.button
              onClick={generate}
              disabled={!category || !budget || !mood || !priority}
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_hsla(173,80%,50%,0.3)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5" />
              Generate Smart Decision
            </motion.button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-card glow-border p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Recommendation</p>
                        <p className="text-lg font-semibold">{result.rec}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-accent mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Why This Choice</p>
                        <p className="text-foreground/80">{result.why}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <div className="w-full">
                        <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
                        <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          />
                        </div>
                        <p className="text-right text-sm text-primary font-semibold mt-1">{result.confidence}%</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">Quick picks — try one:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "🍕 What should I eat?", cat: "Food" },
                { label: "🎬 What should I watch?", cat: "Movies" },
                { label: "🎯 What should I do this weekend?", cat: "Daily Life" },
                { label: "📚 Which course should I choose?", cat: "Career" },
              ].map((uc) => (
                <button
                  key={uc.cat}
                  onClick={() => prefill(uc.cat)}
                  className="px-5 py-2.5 rounded-full glass-card-hover text-sm font-medium cursor-pointer border border-border/50 hover:border-primary/40 transition-colors"
                >
                  {uc.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SectionBackground>
  );
};

const SelectField = ({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
    >
      <option value="">Select {label.toLowerCase()}...</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default DecisionTool;
