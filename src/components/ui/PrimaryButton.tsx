import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "gold" | "rose" | "dark";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

const variants = {
  gold: "bg-gradient-to-r from-champagne to-amber-200 text-burgundy border-champagne/60",
  rose: "bg-gradient-to-r from-cherry to-rose-600 text-white border-rose/40",
  dark: "bg-black/80 text-champagne border-champagne/30",
};

export function PrimaryButton({ children, variant = "gold", className = "", disabled, onClick, "aria-label": ariaLabel }: Props) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`rounded-full border px-7 py-4 text-base font-semibold tracking-wide shadow-[0_14px_32px_rgba(48,5,23,.22)] transition disabled:cursor-not-allowed disabled:opacity-50 md:px-10 md:py-5 md:text-lg ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
