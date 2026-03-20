import { motion } from "framer-motion";

interface SectionBackgroundProps {
  image: string;
  opacity?: number;
  children: React.ReactNode;
  className?: string;
  overlay?: "dark" | "darker" | "subtle";
}

const overlayMap = {
  dark: "bg-background/80",
  darker: "bg-background/90",
  subtle: "bg-background/70",
};

const SectionBackground = ({
  image,
  opacity = 0.15,
  children,
  className = "",
  overlay = "dark",
}: SectionBackgroundProps) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 overflow-hidden">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover"
        style={{ opacity }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className={`absolute inset-0 ${overlayMap[overlay]}`} />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default SectionBackground;
