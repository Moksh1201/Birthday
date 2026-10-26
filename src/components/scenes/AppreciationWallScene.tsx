import { motion } from "motion/react";
import { useState } from "react";
import { appreciationCards, appreciationFinale } from "../../data/messages";
import { sceneBackgrounds } from "../../data/projectImages";
import { FloatingDecorations } from "../FloatingDecorations";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };

export function AppreciationWallScene({ onComplete }: Props) {
  const [expandedHeart, setExpandedHeart] = useState<string | null>(null);

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(3)} className="bg-gradient-to-b from-ivory via-blush to-rose-100/50">
      <FloatingDecorations variant="petals" count={14} />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h2 className="text-center font-display text-3xl text-burgundy md:text-4xl">The appreciation wall</h2>
        <p className="mt-2 text-center text-burgundy/70">For the person you are — not just the birthday version.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {appreciationCards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-champagne/50 bg-white/70 p-5 shadow-lg backdrop-blur-sm md:p-6"
            >
              <h3 className="font-display text-lg text-cherry">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-burgundy/85 md:text-base">{card.message}</p>
              <button
                type="button"
                className="mt-4 flex items-center gap-2 text-sm text-cherry transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                onClick={() => setExpandedHeart(expandedHeart === card.id ? null : card.id)}
                aria-expanded={expandedHeart === card.id}
              >
                <motion.span animate={expandedHeart === card.id ? { scale: 1.4 } : { scale: 1 }}>♥</motion.span>
                {expandedHeart === card.id ? "Close" : "Tap the heart"}
              </button>
              {expandedHeart === card.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 font-hand text-lg text-cherry"
                >
                  {card.heartMessage}
                </motion.p>
              )}
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl rounded-3xl border-2 border-cherry/30 bg-gradient-to-br from-cherry/10 to-champagne/20 p-6 text-center font-display text-lg leading-relaxed text-burgundy md:p-8 md:text-xl"
        >
          "{appreciationFinale}"
        </motion.blockquote>

        <div className="mt-10 text-center">
          <PrimaryButton onClick={onComplete}>Our memories, in pictures →</PrimaryButton>
        </div>
      </div>
    </SceneShell>
  );
}
