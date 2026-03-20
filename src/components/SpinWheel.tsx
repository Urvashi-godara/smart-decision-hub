import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, X, RotateCw } from "lucide-react";

const COLORS = [
  "hsl(173, 80%, 50%)", "hsl(200, 80%, 55%)", "hsl(260, 60%, 55%)",
  "hsl(340, 70%, 55%)", "hsl(40, 90%, 55%)", "hsl(140, 60%, 45%)",
  "hsl(20, 80%, 55%)", "hsl(290, 60%, 50%)",
];

const SpinWheel = () => {
  const [options, setOptions] = useState<string[]>(["Pizza", "Sushi", "Tacos", "Salad"]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addOption = () => {
    if (input.trim() && options.length < 8) {
      setOptions([...options, input.trim()]);
      setInput("");
    }
  };

  const removeOption = (i: number) => {
    if (options.length > 2) setOptions(options.filter((_, idx) => idx !== i));
  };

  const spin = () => {
    if (spinning || options.length < 2) return;
    setSpinning(true);
    setWinner(null);
    const extraSpins = 5 + Math.random() * 5;
    const degrees = extraSpins * 360 + Math.random() * 360;
    const newRotation = rotation + degrees;
    setRotation(newRotation);

    setTimeout(() => {
      const normalizedDeg = newRotation % 360;
      const sliceAngle = 360 / options.length;
      // Pointer is at top (0°), wheel rotates clockwise
      const idx = Math.floor(((360 - normalizedDeg % 360) % 360) / sliceAngle) % options.length;
      setWinner(options[idx]);
      setSpinning(false);
    }, 4000);
  };

  const sliceAngle = 360 / options.length;

  return (
    <section className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
            🎡 <span className="glow-text">Spin the Wheel</span>
          </h2>
          <p className="text-muted-foreground text-lg">Can't decide? Let fate choose for you!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Options panel */}
          <div className="glass-card p-6">
            <p className="text-sm font-medium text-muted-foreground mb-3">Your Options (2-8)</p>
            <div className="space-y-2 mb-4">
              {options.map((o, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="flex-1 text-sm">{o}</span>
                  <button onClick={() => removeOption(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addOption()}
                placeholder="Add an option..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={addOption} className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Wheel */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {/* Pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary drop-shadow-lg" />
              
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                className="drop-shadow-2xl"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                }}
              >
                {options.map((o, i) => {
                  const startAngle = (i * sliceAngle - 90) * (Math.PI / 180);
                  const endAngle = ((i + 1) * sliceAngle - 90) * (Math.PI / 180);
                  const x1 = 140 + 130 * Math.cos(startAngle);
                  const y1 = 140 + 130 * Math.sin(startAngle);
                  const x2 = 140 + 130 * Math.cos(endAngle);
                  const y2 = 140 + 130 * Math.sin(endAngle);
                  const largeArc = sliceAngle > 180 ? 1 : 0;
                  const midAngle = ((i + 0.5) * sliceAngle - 90) * (Math.PI / 180);
                  const tx = 140 + 80 * Math.cos(midAngle);
                  const ty = 140 + 80 * Math.sin(midAngle);
                  const textRotation = (i + 0.5) * sliceAngle;

                  return (
                    <g key={i}>
                      <path
                        d={`M140,140 L${x1},${y1} A130,130 0 ${largeArc},1 ${x2},${y2} Z`}
                        fill={COLORS[i % COLORS.length]}
                        stroke="hsl(220, 25%, 6%)"
                        strokeWidth="2"
                      />
                      <text
                        x={tx}
                        y={ty}
                        fill="white"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                      >
                        {o.length > 10 ? o.slice(0, 9) + "…" : o}
                      </text>
                    </g>
                  );
                })}
                <circle cx="140" cy="140" r="18" fill="hsl(220, 25%, 10%)" stroke="hsl(173, 80%, 50%)" strokeWidth="3" />
              </svg>
            </div>

            <motion.button
              onClick={spin}
              disabled={spinning || options.length < 2}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 transition-all hover:shadow-[0_0_30px_hsla(173,80%,50%,0.3)] disabled:opacity-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCw className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
              {spinning ? "Spinning..." : "Spin!"}
            </motion.button>

            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card glow-border p-4 text-center"
              >
                <p className="text-sm text-muted-foreground">The wheel has spoken:</p>
                <p className="text-2xl font-bold font-display glow-text">{winner}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpinWheel;
