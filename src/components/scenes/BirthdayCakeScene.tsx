import { motion } from "motion/react";
import { Mic } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CAKE_SCRAPBOOK_PHOTOS, sceneBackgrounds } from "../../data/projectImages";
import { burstConfetti, burstHearts } from "../../lib/confetti";
import { useSound } from "../SoundController";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };

type Phase = "year" | "age" | "wish" | "blown";

function Candle({ lit, delay }: { lit: boolean; delay: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="h-6 w-6 rounded-full bg-orange-300 shadow-[0_0_20px_8px_rgba(255,160,32,.5)] md:h-7 md:w-7"
        animate={lit ? { scale: [1, 1.1, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: lit ? delay : 0 }}
      />
      {lit && (
        <motion.div
          className="h-5 w-2 rounded-full bg-gradient-to-t from-amber-600 via-yellow-300 to-white shadow-[0_0_18px_rgba(255,206,70,.9)] md:h-6 md:w-2.5"
          animate={{ scaleY: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 0.5, delay }}
        />
      )}
      {!lit && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0.6, 0], y: -20 }}
          className="h-6 w-1 rounded-full bg-gray-400/50"
        />
      )}
      <div className="h-12 w-2.5 rounded-sm bg-gradient-to-r from-amber-600 via-champagne to-yellow-100 shadow-sm md:h-14 md:w-3" />
    </div>
  );
}

function CakeMemory({ src, index }: { src: string; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 22, rotate: (index - 1) * 10 }}
      whileInView={{ opacity: 1, y: 0, rotate: (index - 1) * 10 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className={`relative h-32 w-28 shrink-0 overflow-hidden rounded-xl border-[5px] border-white shadow-xl sm:h-40 sm:w-36 ${index === 1 ? "-translate-y-3" : index === 2 ? "translate-y-3" : ""}`}
    >
      <img src={src} alt={`Birthday scrapbook photo ${index + 1}`} loading="lazy" className="h-full w-full object-cover" />
    </motion.figure>
  );
}

export function BirthdayCakeScene({ onComplete }: Props) {
  const { play } = useSound();
  const [phase, setPhase] = useState<Phase>("year");
  const [zerosPopped, setZerosPopped] = useState(0);
  const [candlesLit, setCandlesLit] = useState(true);
  const [dimmed, setDimmed] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [celebrationReplay, setCelebrationReplay] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);

  const popZero = () => {
    if (phase !== "year" || zerosPopped >= 2) return;
    const next = zerosPopped + 1;
    setZerosPopped(next);
    play("sparkle");
    if (next === 2) {
      setTimeout(() => {
        setPhase("age");
        burstConfetti({ particleCount: 60 });
        burstHearts();
        play("giftOpen");
        setTimeout(() => setPhase("wish"), 1200);
      }, 400);
    }
  };

  const blowOut = useCallback(() => {
    if (phase !== "wish" || !candlesLit) return;
    setCandlesLit(false);
    setDimmed(true);
    play("blowOut");
    burstConfetti({ particleCount: 90 });
    setTimeout(() => {
      setDimmed(false);
      setPhase("blown");
    }, 800);
  }, [phase, candlesLit, play]);

  const cutCake = useCallback(() => {
    if (phase !== "blown" || cakeCut) return;
    setCakeCut(true);
    setCelebrationReplay((value) => value + 1);
    play("cork");
    burstConfetti({ particleCount: 120, spread: 105 });
    burstHearts();
    window.setTimeout(() => play("pop"), 250);
  }, [phase, cakeCut, play]);

  const replayCakeParty = () => {
    setCelebrationReplay((value) => value + 1);
    play("cork");
    burstConfetti({ particleCount: 90, spread: 100 });
    window.setTimeout(() => play("pop"), 250);
  };

  const startMic = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicActive(true);
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const check = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 45 && candlesLit && phase === "wish") blowOut();
        rafRef.current = requestAnimationFrame(check);
      };
      check();
    } catch {
      setMicActive(false);
    }
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(6)} className={`transition-colors duration-700 ${dimmed ? "bg-[#1a0810]" : "bg-gradient-to-b from-blush via-rose-50 to-champagne/40"}`}>
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="mb-3 flex items-end justify-center gap-2 font-display text-6xl font-bold text-cherry md:text-8xl">
          {phase === "year" && (
            <>
              <span>2</span>
              {[0, 1].map((i) => (
                <motion.button
                  key={i}
                  type="button"
                  disabled={i < zerosPopped}
                  onClick={popZero}
                  className="rounded-lg px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                  aria-label={`Pop zero digit ${i + 1}`}
                  animate={i < zerosPopped ? { y: -80, opacity: 0, rotate: 25 } : {}}
                  whileHover={i >= zerosPopped ? { scale: 1.08 } : undefined}
                >
                  0
                </motion.button>
              ))}
              <span>3</span>
            </>
          )}
          {(phase === "age" || phase === "wish" || phase === "blown") && (
            <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-glow-cherry">
              23
            </motion.span>
          )}
        </div>

        {phase === "year" && <p className="text-lg text-burgundy/85 md:text-xl">Tap the two zeroes to reveal your age ✨</p>}

        <div className="relative mx-auto mt-10 w-[min(82vw,30rem)]">
          <motion.div className="relative z-10" animate={cakeCut ? { x: [0, -6, 0] } : {}}>
          <motion.div className="relative rounded-t-[2.5rem] border border-white/70 bg-gradient-to-b from-[#fff5ec] via-[#f6cbd1] to-[#d97b91] px-5 pt-8 pb-5 shadow-[inset_0_10px_18px_rgba(255,255,255,.55),0_18px_35px_rgba(97,20,43,.2)]" animate={cakeCut ? { x: -28, rotate: -4 } : {}} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
            <div className="pointer-events-none absolute inset-x-0 top-8 h-4 bg-[radial-gradient(ellipse_at_center,_#fff8f1_0%,_#fff8f1_50%,_transparent_53%)] bg-[length:40px_28px]" />
            <div className="flex justify-center gap-6">
              <Candle lit={candlesLit} delay={0} />
              <Candle lit={candlesLit} delay={0.1} />
              <Candle lit={candlesLit} delay={0.2} />
            </div>
          </motion.div>
          <motion.div className="relative h-24 rounded-b-[1.8rem] border-x border-b border-white/30 bg-gradient-to-b from-[#c92750] via-[#9d1838] to-[#5f0c25] shadow-[inset_0_8px_12px_rgba(255,255,255,.2),0_20px_28px_rgba(50,5,20,.3)] md:h-32" animate={cakeCut ? { x: 26, rotate: 4 } : {}} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
            <div className="absolute inset-x-0 top-4 h-3 border-y border-champagne/80 bg-gradient-to-r from-champagne/10 via-champagne/80 to-champagne/10" />
            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-5 text-xl text-champagne md:text-2xl">✦ <span>✦</span> ✦</div>
          </motion.div>
          <div className="absolute -bottom-2 left-1/2 h-4 w-[110%] -translate-x-1/2 rounded-[50%] bg-black/20 blur-md" />
          <div className="mt-2 flex justify-center gap-2">
            <div className="h-4 w-[112%] rounded-[50%] border border-white/60 bg-gradient-to-r from-[#f6d8ca] via-white to-[#e4aaba] shadow-xl" />
          </div>
          </motion.div>
        </div>

        {(phase === "wish" || phase === "blown") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
            {phase === "wish" && (
              <p className="font-hand text-3xl text-cherry md:text-4xl">Now make a wish, birthday girl.</p>
            )}
            {phase === "wish" && (
              <>
                <PrimaryButton variant="rose" onClick={blowOut}>
                  BLOW OUT THE CANDLES
                </PrimaryButton>
                <button
                  type="button"
                  onClick={() => void startMic()}
                  className="mx-auto flex items-center gap-2 text-sm text-burgundy/70 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-cherry"
                  aria-pressed={micActive}
                >
                  <Mic className="h-4 w-4" aria-hidden />
                  {micActive ? "Listening for a blow..." : "Try blowing (microphone)"}
                </button>
              </>
            )}
            {phase === "blown" && (
              <>
                <p className="mx-auto max-w-2xl font-display text-xl leading-relaxed text-burgundy md:text-2xl">
                  MAKE A WISH. YOU DESERVE ALL THE BEAUTIFUL THINGS COMING YOUR WAY.
                </p>
                {!cakeCut && <PrimaryButton variant="gold" onClick={cutCake}>CUT THE CAKE ✦</PrimaryButton>}
                {cakeCut && (
                  <motion.div key={celebrationReplay} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-7 grid max-w-2xl grid-cols-2 gap-4">
                    <motion.div initial={{ y: 35, rotate: -18, scale: .65 }} animate={{ y: 0, rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 150 }} className="relative overflow-hidden rounded-2xl border border-champagne/70 bg-gradient-to-br from-white/80 to-rose-100/80 p-4 shadow-[0_18px_36px_rgba(87,20,42,.16)] backdrop-blur-sm">
                      <motion.span aria-hidden="true" initial={{ y: 0, rotate: 0 }} animate={{ y: -45, x: 24, rotate: 480 }} transition={{ delay: .18, duration: .7 }} className="absolute left-1/2 top-2 z-10 text-sm">✦</motion.span>
                      <svg viewBox="0 0 90 120" className="mx-auto h-20 w-16 drop-shadow-lg md:h-28 md:w-20" aria-hidden="true">
                        <defs><linearGradient id="toast-glass" x2="1"><stop stopColor="#123a2d"/><stop offset=".48" stopColor="#438264"/><stop offset="1" stopColor="#09271e"/></linearGradient></defs>
                        <path d="M36 8h18v22c0 10 5 14 12 22 6 7 8 15 8 25v29c0 8-9 12-29 12s-29-4-29-12V77c0-10 2-18 8-25 7-8 12-12 12-22Z" fill="url(#toast-glass)" stroke="#d6b56d" strokeWidth="2"/>
                        <path d="M36 8h18v23H36z" fill="#d7b466"/><path d="M20 68h50v24H20z" fill="#f8edcf" stroke="#cba95d"/>
                        <text x="45" y="83" textAnchor="middle" fill="#771b36" fontSize="8" fontFamily="Georgia">CHEERS</text>
                      </svg>
                      <p className="mt-2 text-base font-semibold text-burgundy md:text-lg">Champagne, darling.</p>
                    </motion.div>
                    <motion.div initial={{ y: 35, rotate: 18, scale: .65 }} animate={{ y: 0, rotate: 0, scale: 1 }} transition={{ delay: .12, type: "spring", stiffness: 150 }} className="relative overflow-hidden rounded-2xl border border-champagne/70 bg-gradient-to-br from-white/80 to-rose-100/80 p-4 shadow-[0_18px_36px_rgba(87,20,42,.16)] backdrop-blur-sm">
                      <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], y: [-8, -34], x: [-10, 16] }} transition={{ delay: .2, duration: 1 }} className="absolute inset-x-0 top-0 text-2xl tracking-[.5em] text-cherry">✦ ✧ ✦</motion.div>
                      <svg viewBox="0 0 100 110" className="mx-auto h-20 w-20 drop-shadow-lg md:h-28 md:w-28" aria-hidden="true">
                        <defs><linearGradient id="party-popper" x2="1" y2="1"><stop stopColor="#f3d28a"/><stop offset=".5" stopColor="#bd3151"/><stop offset="1" stopColor="#650f2d"/></linearGradient></defs>
                        <path d="m24 24 50 12-20 62-48-12Z" fill="url(#party-popper)" stroke="#d7b66b" strokeWidth="2"/>
                        <path d="m24 24 25-12 25 24Z" fill="#f2d28a" stroke="#fff1c9" strokeWidth="2"/>
                        <path d="m29 36 35 9M25 51l34 9M20 67l34 9" stroke="#fff0c7" strokeOpacity=".7" strokeWidth="3"/>
                        <path d="M55 14 53 3M78 29l10-7M16 27 7 18" stroke="#d9ad51" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <p className="mt-2 text-base font-semibold text-burgundy md:text-lg">And a little confetti.</p>
                    </motion.div>
                    <div className="col-span-2 flex flex-wrap justify-center gap-3 pt-2">
                      <PrimaryButton variant="dark" onClick={replayCakeParty}>Celebrate again</PrimaryButton>
                      <PrimaryButton onClick={onComplete}>Keep the party going →</PrimaryButton>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}

        <div className="mx-auto mt-12 max-w-3xl">
          <h3 className="font-display text-xl uppercase tracking-[.18em] text-burgundy/75 md:text-2xl">A little birthday scrapbook</h3>
          <div className="relative mx-auto mt-5 flex min-h-44 max-w-2xl items-center justify-center gap-2 sm:gap-5">
            {CAKE_SCRAPBOOK_PHOTOS.map((src, index) => (
              <CakeMemory key={src} src={src} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
