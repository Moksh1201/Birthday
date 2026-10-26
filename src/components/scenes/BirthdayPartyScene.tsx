import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { balloonMessages, rotatingCompliments } from "../../data/messages";
import { BALLOON_PHOTOS, sceneBackgrounds } from "../../data/projectImages";
import { burstConfetti } from "../../lib/confetti";
import { useSound } from "../SoundController";
import { FloatingDecorations } from "../FloatingDecorations";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };

export function BirthdayPartyScene({ onComplete }: Props) {
  const { play } = useSound();
  const [complimentIdx, setComplimentIdx] = useState(0);
  const [popped, setPopped] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<string | null>(null);
  const [messageOpened, setMessageOpened] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setComplimentIdx((i) => (i + 1) % rotatingCompliments.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const popBalloon = (id: string) => {
    if (popped.has(id)) return;
    setPopped((s) => new Set(s).add(id));
    setRevealed(id);
    setMessageOpened(false);
    play("balloon");
    burstConfetti({ particleCount: 88, spread: 118, startVelocity: 42, origin: { y: 0.48 } });
  };

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(2)} className="bg-gradient-to-b from-[#2a0612] via-cherry/80 to-blush">
      <FloatingDecorations variant="sparkles" count={20} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,201,139,0.34),transparent_48%),radial-gradient(circle_at_78%_56%,rgba(244,166,184,.22),transparent_42%)]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-blush md:text-6xl">IT'S YOUR DAY, PRETTY GIRL!</h2>
        <p className="mt-4 font-hand text-3xl text-champagne sm:text-4xl md:text-5xl">Tap a balloon to pop it — a little birthday secret is waiting inside.</p>

        <AnimatePresence mode="wait">
          <motion.p
            key={complimentIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 font-hand text-3xl text-champagne md:text-4xl"
          >
            {rotatingCompliments[complimentIdx]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-12 flex flex-wrap items-end justify-center gap-4 md:gap-6">
          {balloonMessages.map((b, i) => {
            const isPopped = popped.has(b.id);
            return (
              <motion.button
                key={b.id}
                type="button"
                disabled={isPopped}
                onClick={() => popBalloon(b.id)}
                className="relative flex h-44 w-32 flex-col items-center justify-center focus-visible:outline focus-visible:outline-4 focus-visible:outline-champagne md:h-52 md:w-40"
                aria-label={isPopped ? `Balloon popped: ${b.message}` : `Pop birthday balloon ${i + 1} to reveal a surprise`}
                initial={{ y: 0 }}
                animate={isPopped ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: [0, 12, -18] } : { y: [0, -10, 0], rotate: [-2, 2, -1, -2] }}
                transition={isPopped ? { duration: 0.38 } : { repeat: Infinity, duration: 3 + i * 0.22, ease: "easeInOut" }}
                style={{ marginTop: (i % 3) * 8 }}
              >
                {!isPopped && (
                  <>
                    <BirthdayBalloon id={b.id} color={b.color} index={i} />
                  </>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-5 font-hand text-2xl text-blush/90 sm:text-3xl">Burst them all if you like. This party is yours.</div>

        <div className="mt-6">
          <PrimaryButton onClick={onComplete} variant="gold">
            Okay, now let me tell you something...
          </PrimaryButton>
        </div>
      </div>

      <AnimatePresence>
        {revealed && (
          <BalloonMessageReveal
            key={revealed}
            id={revealed}
            message={balloonMessages.find((balloon) => balloon.id === revealed)?.message ?? "You make this whole party brighter."}
            messageOpened={messageOpened}
            onToggle={() => setMessageOpened((open) => !open)}
            onClose={() => setRevealed(null)}
          />
        )}
      </AnimatePresence>
    </SceneShell>
  );
}

function BalloonMessageReveal({ id, message, messageOpened, onToggle, onClose }: { id: string; message: string; messageOpened: boolean; onToggle: () => void; onClose: () => void }) {
  const photoSrc = BALLOON_PHOTOS[id] ?? BALLOON_PHOTOS.b1;
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="A birthday photo and hidden note"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] grid place-items-center bg-[#24020e]/65 p-5"
      onClick={onClose}
    >
      <motion.div initial={{ opacity: 0, y: 36, scale: .82, rotate: -3 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }} exit={{ y: 20, scale: .9 }} transition={{ type: "spring", stiffness: 150, damping: 18 }} className="relative w-[min(88vw,34rem)]" onClick={(event) => event.stopPropagation()}>
        {[...Array(12)].map((_, index) => <motion.span key={index} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20 text-2xl text-champagne" initial={{ opacity: 1, x: 0, y: 0, scale: .3 }} animate={{ opacity: 0, x: Math.cos(index * Math.PI / 6) * 190, y: Math.sin(index * Math.PI / 6) * 190, scale: [1, .7, 0], rotate: 90 }} transition={{ duration: .85, delay: index * .018 }}>{index % 2 ? "✦" : "✧"}</motion.span>)}
        <button type="button" onClick={onClose} className="absolute -right-3 -top-3 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/60 bg-burgundy text-2xl text-white shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-champagne" aria-label="Close birthday note">×</button>
        <button type="button" onClick={onToggle} aria-expanded={messageOpened} aria-label={messageOpened ? "Hide the birthday note" : "Tap the photo to reveal the birthday note"} className="group relative block aspect-[4/4.5] w-full overflow-hidden rounded-[2rem] border-[7px] border-white/90 bg-gradient-to-br from-[#ffb7c7] via-[#f1d38c] to-[#992048] text-left shadow-[0_35px_100px_rgba(0,0,0,.45)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-champagne">
          <img
            src={photoSrc}
            alt="A birthday memory"
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${messageOpened ? "scale-110 blur-sm" : "group-hover:scale-105"}`}
          />
          {!messageOpened ? <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#25030f]/90 via-[#25030f]/48 to-transparent px-5 pb-6 pt-24 text-center font-hand text-3xl text-white sm:text-4xl">Tap this picture for your secret note</div> : (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#320714]/85 via-[#5d1029]/75 to-[#1e0310]/90 p-7 text-center backdrop-blur-sm sm:p-10">
              <p className="font-hand text-3xl leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.55)] sm:text-4xl">{message}</p>
            </motion.div>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

function BirthdayBalloon({ id, color, index }: { id: string; color: string; index: number }) {
  const gradientId = `party-${id}`;
  return (
    <svg viewBox="0 0 130 180" className="h-40 w-28 overflow-visible drop-shadow-[0_20px_18px_rgba(25,0,10,.35)] sm:h-48 sm:w-36 md:h-52 md:w-40" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff8df"/><stop offset=".15" stopColor={color}/><stop offset=".56" stopColor={color}/><stop offset="1" stopColor="#4b0821"/></linearGradient>
        <radialGradient id={`${gradientId}-shine`}><stop stopColor="#fff" stopOpacity=".88"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="65" cy="66" rx="48" ry="57" fill={`url(#${gradientId})`} stroke="#fff3cd" strokeOpacity=".9" strokeWidth="2.2" />
      <ellipse cx="43" cy="47" rx="10" ry="27" transform="rotate(24 43 47)" fill={`url(#${gradientId}-shine)`} />
      <path d="M55 31c6-7 15-9 24-5" fill="none" stroke="white" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      <path d="m60 123 5 8 5-8" fill={color} stroke="#f5db95" strokeWidth="1.5" />
      <path d="M65 131c-6 10 7 15 0 24s6 13 0 20" fill="none" stroke="#f7dfb2" strokeOpacity=".85" strokeWidth="1.8" />
      <path d={`M${35 + index % 4 * 5} 81l2 4 4 1-4 2-2 4-2-4-4-2 4-1z`} fill="#fff3cf" opacity=".85" />
    </svg>
  );
}
