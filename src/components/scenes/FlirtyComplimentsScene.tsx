import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { flirtyCompliments } from "../../data/compliments";
import { sceneBackgrounds } from "../../data/projectImages";
import { FloatingDecorations } from "../FloatingDecorations";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };

function randomCompliment(exclude: string | null) {
  const pool = flirtyCompliments.filter((c) => c !== exclude);
  return pool[Math.floor(Math.random() * pool.length)] ?? flirtyCompliments[0];
}

export function FlirtyComplimentsScene({ onComplete }: Props) {
  const [current, setCurrent] = useState<string>(flirtyCompliments[0]);
  const [flipped, setFlipped] = useState(false);
  const [prev, setPrev] = useState<string | null>(null);

  const shuffle = useCallback(() => {
    setFlipped(true);
    setTimeout(() => {
      const next = randomCompliment(prev);
      setPrev(current);
      setCurrent(next);
      setFlipped(false);
    }, 300);
  }, [current, prev]);

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(5)} className="bg-gradient-to-b from-black via-[#1a0508] to-cherry">
      <FloatingDecorations variant="hearts" count={10} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(181,18,43,0.35),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-2 text-center">
        <h2 className="font-display text-xl font-bold uppercase tracking-wider text-blush md:text-3xl">
          OKAY, ENOUGH WHOLESOME CONTENT. LET'S DISCUSS THE REAL PROBLEM.
        </h2>
        <p className="mt-4 text-lg font-semibold text-champagne md:text-2xl">YOU ARE ACTUALLY RIDICULOUSLY GORGEOUS.</p>

        <motion.button
          type="button"
          onClick={shuffle}
          className="mx-auto mt-12 block w-full max-w-md perspective-[1000px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
          aria-label="Flip compliment card"
        >
          <motion.div
            animate={{ rotateY: flipped ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[140px] rounded-2xl border border-champagne/40 bg-gradient-to-br from-cherry/90 to-black p-6 shadow-[0_0_40px_rgba(181,18,43,0.4)] md:min-h-[160px] md:p-8"
          >
            <p className="font-display text-lg leading-relaxed text-blush md:text-xl">{current}</p>
            <p className="mt-4 text-xs text-champagne/60">Tap to flip</p>
          </motion.div>
        </motion.button>

        <div className="mt-8">
          <PrimaryButton variant="rose" onClick={shuffle}>
            COMPLIMENT ME AGAIN
          </PrimaryButton>
        </div>

        <p className="mt-8 text-xs text-white/50 italic">Disclaimer: The author accepts zero responsibility for excessive slaying.</p>

        <div className="mt-10">
          <PrimaryButton variant="gold" onClick={onComplete}>
            Time for cake →
          </PrimaryButton>
        </div>
      </div>
    </SceneShell>
  );
}
