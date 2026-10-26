import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { sceneBackgrounds } from "../../data/projectImages";
import { burstConfetti, burstHearts } from "../../lib/confetti";
import { useSound } from "../SoundController";
import { FloatingDecorations } from "../FloatingDecorations";
import { WrappedGift } from "../illustrations/WrappedGift";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };
const openingBackgrounds = sceneBackgrounds(0);

export function GiftOpeningScene({ onComplete }: Props) {
  const { play } = useSound();
  const [phase, setPhase] = useState<"idle" | "opening" | "revealed">("idle");
  const busy = phase !== "idle";

  const openGift = useCallback(() => {
    if (busy) return;
    setPhase("opening");
    play("giftOpen");
    setTimeout(() => {
      burstConfetti({ particleCount: 120, spread: 90 });
      burstHearts();
    }, 1320);
    setTimeout(() => setPhase("revealed"), 1680);
  }, [busy, play]);

  return (
    <SceneShell backgroundPhotos={openingBackgrounds} rotateBackgroundPhoto={openingBackgrounds[0]} className="bg-gradient-to-b from-burgundy via-[#5a0a1f] to-blush/30">
      <FloatingDecorations variant="balloons" count={10} />
      <FloatingDecorations variant="sparkles" count={22} />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-hand text-3xl text-rose sm:text-4xl md:text-5xl"
        >
          Psst... someone's ridiculously special birthday surprise is waiting.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-3 max-w-3xl text-xl leading-relaxed text-blush/95 sm:text-2xl md:text-3xl"
        >
          Made with an unreasonable amount of love, exclusively for you.
        </motion.p>

        <motion.button
          type="button"
          className="mx-auto mt-10 block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
          onClick={openGift}
          whileHover={phase === "idle" ? { scale: 1.04 } : undefined}
          aria-label="Open the birthday gift"
          disabled={busy && phase !== "revealed"}
        >
          <WrappedGift opened={phase === "revealed"} pulling={phase === "opening"} />
        </motion.button>

        <AnimateGiftInstruction phase={phase} />

        {phase === "revealed" && (
          <motion.div initial={{ opacity: 0, y: 32, scale: .86, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ type: "spring", delay: .55 }} className="mt-8">
            <PrimaryButton onClick={onComplete} variant="rose">
              LET THE CHAOS BEGIN →
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </SceneShell>
  );
}

function AnimateGiftInstruction({ phase }: { phase: "idle" | "opening" | "revealed" }) {
  const messages = {
    idle: "Pull the golden ribbon to begin your birthday surprise",
    opening: "A little magic is on its way…",
    revealed: "I saved the best part for you.",
  } as const;
  return (
    <motion.p key={phase} initial={{ opacity: 0, y: 14, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} className="mt-5 min-h-10 font-hand text-2xl text-champagne sm:text-3xl md:text-4xl">
      {messages[phase]}
    </motion.p>
  );
}
