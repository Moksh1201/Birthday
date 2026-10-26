import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { finalBirthdayMessage } from "../../data/messages";
import { sceneBackgrounds } from "../../data/projectImages";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { FloatingDecorations } from "../FloatingDecorations";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onReplay: () => void };

export function FinalBirthdayMessage({ onReplay }: Props) {
  const reduced = useReducedMotion();
  const full = finalBirthdayMessage.body;
  const [displayed, setDisplayed] = useState(reduced ? full : "");
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setDisplayed(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [full, reduced]);

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(8)} className="bg-gradient-to-b from-[#3a0610] via-cherry to-black">
      <FloatingDecorations variant="hearts" count={16} />

      <div className="relative z-10 mx-auto flex min-h-[78dvh] max-w-4xl flex-col justify-center px-3 py-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-hand text-3xl text-champagne md:text-4xl"
        >
          {finalBirthdayMessage.prelude}
        </motion.p>

        <div
          className="mt-8 whitespace-pre-line text-center font-hand text-xl leading-relaxed text-blush drop-shadow-[0_2px_14px_rgba(0,0,0,.5)] md:text-2xl md:leading-[1.8]"
          aria-live="polite"
        >
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center"
          >
            <motion.h2
            className="font-display text-4xl font-black uppercase leading-tight text-[#ff304c] drop-shadow-[0_0_34px_rgba(255,48,76,.75)] sm:text-5xl md:text-7xl lg:text-8xl"
            animate={{ scale: [1, 1.025, 1], textShadow: ["0 0 22px rgba(255,48,76,.5)", "0 0 48px rgba(255,208,145,.8)", "0 0 22px rgba(255,48,76,.5)"] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            >
              {finalBirthdayMessage.headline}
            </motion.h2>
            <TogetherPhoto />
            <p className="mt-6 font-hand text-2xl text-champagne md:text-3xl">{finalBirthdayMessage.footer}</p>
            <div className="mt-10">
              <PrimaryButton variant="gold" onClick={onReplay}>
                REPLAY OUR LITTLE ADVENTURE ↻
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </div>
    </SceneShell>
  );
}

function TogetherPhoto() {
  const [missing, setMissing] = useState(false);
  return (
    <motion.figure initial={{ opacity: 0, y: 24, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .25, type: "spring" }} className="mx-auto mt-8 w-[min(82vw,27rem)]">
      <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-champagne/90 bg-gradient-to-br from-rose-300 via-cherry to-burgundy p-1 shadow-[0_0_46px_rgba(232,201,139,.24)]">
        {missing ? (
          <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-[#fff0d0] via-[#edb9c4] to-[#861b3b] px-5 text-center text-burgundy">
            <span className="font-display text-6xl text-cherry">♡</span>
            <span className="mt-1 font-hand text-3xl">Our photo goes here</span>
            <span className="mt-2 rounded-full bg-white/55 px-4 py-1 text-base">Add images/best-bestie-together.jpg</span>
          </div>
        ) : (
          <img src="/images/best-bestie-together.jpg" alt="A photo of the birthday girl and her best bestie together" onError={() => setMissing(true)} className="aspect-[4/3] w-full rounded-[1.2rem] object-cover" />
        )}
      </div>
      <figcaption className="mt-3 font-hand text-2xl text-champagne md:text-3xl">My favourite person, in one of my favourite photos.</figcaption>
    </motion.figure>
  );
}
