import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Variant = "sparkles" | "hearts" | "balloons" | "petals" | "bokeh";

type Props = {
  variant?: Variant;
  count?: number;
  className?: string;
};

const symbols: Record<Variant, string[]> = {
  sparkles: ["✦", "·", "✧", "⋆"],
  hearts: ["♥", "❤", "♡"],
  balloons: ["🎈"],
  petals: ["🌸", "✿", "❀"],
  bokeh: ["○", "◦", "●"],
};

export function FloatingDecorations({ variant = "sparkles", count = 12, className = "" }: Props) {
  const reduced = useReducedMotion();
  const items = symbols[variant];

  if (reduced) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 17 + 7) % 100;
        const delay = (i * 0.4) % 3;
        const duration = 6 + (i % 5);
        const symbol = items[i % items.length];
        return (
          <motion.span
            key={`${variant}-${i}`}
            className={`absolute ${variant === "balloons" ? "text-champagne/50" : "text-champagne/40"}`}
            style={{ left: `${left}%`, top: `${(i * 13) % 90}%`, fontSize: variant === "balloons" ? "1.25rem" : "0.75rem" }}
            animate={variant === "balloons" ? { y: [0, -28, -10, 0], opacity: [.48, .84, .72, .48], rotate: [-5, 4, -2, -5], x: [0, 8, -6, 0] } : { y: [0, -20, 0], opacity: [0.2, 0.7, 0.2], rotate: [0, 10, -10, 0] }}
            transition={{ duration: variant === "balloons" ? duration + 3 : duration, repeat: Infinity, delay, ease: "easeInOut" }}
          >
            {variant === "balloons" ? <FloatingBalloon index={i} /> : symbol}
          </motion.span>
        );
      })}
    </div>
  );
}

function FloatingBalloon({ index }: { index: number }) {
  const palette = ["#f05d79", "#d2a04e", "#a9254d", "#f19caf", "#ebc978"];
  const id = `float-balloon-${index}`;
  return (
    <svg viewBox="0 0 100 145" className="h-[5.8rem] w-16 drop-shadow-[0_12px_16px_rgba(30,2,14,.28)] sm:h-28 sm:w-[4.8rem]" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff4dc" stopOpacity=".95"/><stop offset=".23" stopColor={palette[index % palette.length]}/><stop offset=".7" stopColor={palette[(index + 1) % palette.length]}/><stop offset="1" stopColor="#4c0a20"/></linearGradient>
        <radialGradient id={`${id}-shine`}><stop stopColor="#fff" stopOpacity=".85"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="50" cy="49" rx="35" ry="43" fill={`url(#${id})`} stroke="#fff0c6" strokeOpacity=".72" strokeWidth="2" />
      <ellipse cx="34" cy="36" rx="8" ry="20" transform="rotate(25 34 36)" fill={`url(#${id}-shine)`} />
      <path d="m46 91 4 6 4-6" fill={palette[index % palette.length]} stroke="#f4d78c" strokeWidth="1" />
      <path d="M50 97c-6 10 7 15 0 24s5 13 0 21" fill="none" stroke="#f1dfbe" strokeOpacity=".8" strokeWidth="1.5" />
    </svg>
  );
}
