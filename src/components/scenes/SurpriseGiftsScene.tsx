import { motion } from "motion/react";
import { useState } from "react";
import { surpriseGifts } from "../../data/compliments";
import { sceneBackgrounds } from "../../data/projectImages";
import { useSound } from "../SoundController";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };

export function SurpriseGiftsScene({ onComplete }: Props) {
  const { play } = useSound();
  const [opened, setOpened] = useState<Set<string>>(new Set());

  const open = (id: string) => {
    if (opened.has(id)) return;
    setOpened((s) => new Set(s).add(id));
    play("giftOpen");
  };

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(7)} className="bg-gradient-to-b from-ivory via-blush to-rose-100">
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h2 className="text-center font-display text-3xl text-burgundy">A tiny collection of birthday surprises</h2>
        <p className="mt-2 text-center text-burgundy/70">Open in any order — each one is for you.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {surpriseGifts.map((gift, i) => {
            const isOpen = opened.has(gift.id);
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-champagne/50 bg-white/80 p-4 shadow-lg backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => open(gift.id)}
                  className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <motion.span
                      animate={isOpen ? { rotateY: 180 } : {}}
                      className="text-3xl"
                      aria-hidden
                    >
                      {isOpen ? "💌" : "🎁"}
                    </motion.span>
                    <div>
                      <p className="font-semibold text-cherry">{gift.label}</p>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 text-sm leading-relaxed text-burgundy/85"
                        >
                          {gift.message}
                        </motion.p>
                      )}
                      {!isOpen && <p className="mt-1 text-xs text-burgundy/50">Tap to open</p>}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <PrimaryButton variant="rose" onClick={onComplete}>
            One last thing... →
          </PrimaryButton>
        </div>
      </div>
    </SceneShell>
  );
}
