import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { sceneBackgrounds } from "../../data/projectImages";
import { burstConfetti } from "../../lib/confetti";
import { useSound } from "../SoundController";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SceneShell } from "../ui/SceneShell";

type Props = { onComplete: () => void };
const HITS_NEEDED = 3;

export function HammerGameScene({ onComplete }: Props) {
  const { play } = useSound();
  const [hits, setHits] = useState(0);
  const [striking, setStriking] = useState(false);
  const [broken, setBroken] = useState(false);
  const [shake, setShake] = useState(false);
  const [swingTarget, setSwingTarget] = useState({ x: -180, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<SVGSVGElement>(null);
  const hammerRef = useRef<HTMLButtonElement>(null);

  const strike = useCallback(() => {
    if (broken || striking) return;
    setStriking(true);
    const giftBounds = giftRef.current?.getBoundingClientRect();
    const hammerBounds = hammerRef.current?.getBoundingClientRect();
    const stageBounds = stageRef.current?.getBoundingClientRect();
    if (giftBounds && hammerBounds && stageBounds) {
      const lockX = giftBounds.left + giftBounds.width * 0.548;
      const lockY = giftBounds.top + giftBounds.height * 0.51;
      const hammerHeadX = hammerBounds.left + hammerBounds.width * 0.5;
      const hammerHeadY = hammerBounds.top + hammerBounds.height * 0.28;
      setSwingTarget({
        x: Math.round(lockX - hammerHeadX),
        y: Math.round(lockY - hammerHeadY),
      });
    }
    play("hammer");
    const next = hits + 1;
    setHits(next);
    setShake(true);
    window.setTimeout(() => setShake(false), 320);
    window.setTimeout(() => setStriking(false), 760);
    if (next >= HITS_NEEDED) {
      window.setTimeout(() => {
        setBroken(true);
        play("giftOpen");
        burstConfetti({ particleCount: 150, spread: 100, origin: { y: 0.52 } });
      }, 620);
    }
  }, [broken, striking, hits, play]);

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(1)} className="bg-gradient-to-br from-blush via-rose-100 to-champagne/30">
      <div className="relative z-10 w-full max-w-5xl text-center">
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-hand text-3xl text-cherry sm:text-4xl md:text-5xl">A very serious birthday mission</motion.p>
        <h2 className="mt-1 font-display text-4xl font-semibold text-burgundy sm:text-5xl md:text-6xl">THE BIG PRESENT BREAK-IN</h2>
        <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-burgundy/85 sm:text-2xl md:text-3xl">A mountain of birthday magic is hiding inside. Give this giant gift three good taps.</p>

        <div ref={stageRef} className="relative mx-auto mt-5 h-[20rem] w-full max-w-[58rem] sm:h-[24rem] md:mt-8 md:h-[27rem]">
          <motion.svg ref={giftRef} viewBox="0 0 500 420" animate={shake ? { x: [0, -3, 3, -2, 0] } : {}} transition={{ duration: .28 }} className="absolute bottom-0 left-0 h-auto w-[min(75vw,31rem)] overflow-visible drop-shadow-[0_25px_25px_rgba(70,15,40,.25)] sm:left-[2%]" aria-hidden="true">
            <defs>
              <linearGradient id="hammer-gift-front" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fc5470"/><stop offset=".5" stopColor="#ce1642"/><stop offset="1" stopColor="#8e0b31"/></linearGradient>
              <linearGradient id="hammer-gift-side" x1="0" x2="1"><stop stopColor="#a80f37"/><stop offset="1" stopColor="#610a27"/></linearGradient>
              <linearGradient id="hammer-gift-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff2be"/><stop offset=".45" stopColor="#dfa943"/><stop offset="1" stopColor="#fff0b1"/></linearGradient>
              <radialGradient id="gift-inside"><stop stopColor="#fff9d9"/><stop offset=".4" stopColor="#ffd06c"/><stop offset="1" stopColor="#f5799a" stopOpacity=".05"/></radialGradient>
            </defs>
            <ellipse cx="270" cy="377" rx="176" ry="23" fill="#6e263b" opacity=".18" />
            <motion.g animate={broken ? { y: 16, scale: .98 } : shake ? { x: [0, -8, 8, -4, 0], rotate: [0, -1, 1, 0] } : {}} transition={{ duration: .34 }}>
              <path d="m105 169 245-61 116 57-248 68z" fill="#ffb1bf" stroke="#f6d68f" strokeWidth="4" />
              <path d="m105 169 113 64v138l-113-59z" fill="url(#hammer-gift-front)" stroke="#f6d68f" strokeWidth="4" />
              <path d="m218 233 248-68v138l-248 68z" fill="url(#hammer-gift-side)" stroke="#f6d68f" strokeWidth="4" />
              <path d="m185 189 48 26v141l-48-27z" fill="url(#hammer-gift-gold)" />
              <path d="m337 201 42-12v138l-42 12z" fill="url(#hammer-gift-gold)" />
              <motion.g animate={broken ? { y: -112, rotate: -12, x: -18 } : {}} transition={{ type: "spring", stiffness: 100, damping: 13 }}>
                <path d="m77 160 278-70 138 68-280 75z" fill="#ed4564" stroke="#fff0c0" strokeWidth="5" />
                <path d="m203 128 54-14 142 67-58 15z" fill="url(#hammer-gift-gold)" />
                {!broken && <g>
                  <path d="M263 204v-31c0-14 23-14 23 0v31" fill="none" stroke="#fff0bf" strokeWidth="9" />
                  <rect x="251" y="194" width="47" height="44" rx="10" fill="url(#hammer-gift-gold)" stroke="#a56a24" strokeWidth="3" />
                  <circle cx="274" cy="211" r="5" fill="#6f1730"/><path d="m274 214-4 12h8z" fill="#6f1730"/>
                </g>}
              </motion.g>
              {broken && <motion.circle cx="285" cy="215" r="58" fill="url(#gift-inside)" initial={{ scale: 0 }} animate={{ scale: [0, 1.6, 1] }} transition={{ duration: .7 }} />}
            </motion.g>
            {hits > 0 && !broken && <g fill="none" stroke="#590b26" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
              <path d="m274 212-12 12 11 8-15 13" />
              {hits > 1 && <><path d="m194 240-10 12 12 7-7 15"/><path d="m298 225 11 9-7 10 12 8"/></>}
            </g>}
            {!broken && Array.from({ length: hits }, (_, index) => {
              const offsets = [{ x: 0, y: 0, rotate: 0 }, { x: -17, y: 13, rotate: -18 }, { x: 16, y: -12, rotate: 22 }];
              const offset = offsets[index] ?? offsets[0];
              return (
                <motion.g key={index} initial={{ scale: 0, opacity: 0, rotate: offset.rotate - 35 }} animate={{ scale: 1, opacity: .96, rotate: offset.rotate }} transition={{ type: "spring", stiffness: 320, damping: 13 }} style={{ transformOrigin: `${274 + offset.x}px ${211 + offset.y}px` }}>
                  <path d={`M${274 + offset.x} ${211 + offset.y - 34} L${283 + offset.x} ${200 + offset.y - 12} L${307 + offset.x} ${195 + offset.y} L${289 + offset.x} ${212 + offset.y + 4} L${296 + offset.x} ${238 + offset.y} L${274 + offset.x} ${225 + offset.y + 8} L${253 + offset.x} ${239 + offset.y} L${259 + offset.x} ${213 + offset.y + 4} L${240 + offset.x} ${197 + offset.y} L${265 + offset.x} ${200 + offset.y - 12} Z`} fill={index === 0 ? "#fff3be" : index === 1 ? "#f5be4e" : "#fff8dd"} stroke="#b66827" strokeWidth="3" />
                  <path d={`m${269 + offset.x} ${210 + offset.y} 5-10 5 10 10 2-8 6 2 10-9-5-9 5 2-10-8-6z`} fill="#fff" opacity=".8" />
                </motion.g>
              );
            })}
          </motion.svg>

          <motion.button
            type="button"
            onClick={strike}
            disabled={broken}
            ref={hammerRef}
            className="absolute bottom-[9%] right-[1%] z-20 flex min-h-20 min-w-20 items-center justify-center rounded-full p-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-cherry disabled:cursor-default sm:right-[4%] md:right-[6%]"
            aria-label={broken ? "The birthday present is open" : "Swing the large hammer at the birthday present"}
            animate={striking ? { rotate: [-18, -39, 13, -18], x: [0, 58, swingTarget.x, 0], y: [0, -68, swingTarget.y, 0] } : { rotate: -18, y: [0, -7, 0] }}
            transition={striking ? { duration: .72, times: [0, .34, .62, 1], ease: [0.2, 0.8, 0.2, 1] } : { repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            style={{ transformOrigin: "48% 45%" }}
            whileHover={!broken ? { scale: 1.06, rotate: -12 } : undefined}
          >
            <svg viewBox="0 0 300 330" className="h-[min(56vw,17rem)] w-[min(52vw,16rem)] overflow-visible drop-shadow-[0_24px_22px_rgba(39,18,12,.34)]" aria-hidden="true">
              <defs>
                <linearGradient id="hammer-wood" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#5c2c1b"/><stop offset=".25" stopColor="#c08043"/><stop offset=".5" stopColor="#f0c27a"/><stop offset=".78" stopColor="#9a5a31"/><stop offset="1" stopColor="#482317"/></linearGradient>
                <linearGradient id="hammer-steel" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff"/><stop offset=".12" stopColor="#d9e0e8"/><stop offset=".42" stopColor="#8795a8"/><stop offset=".68" stopColor="#f3f5f7"/><stop offset="1" stopColor="#535f72"/></linearGradient>
                <linearGradient id="hammer-head-side" x1="0" x2="1"><stop stopColor="#465164"/><stop offset=".5" stopColor="#cad2de"/><stop offset="1" stopColor="#596579"/></linearGradient>
              </defs>
              <path d="M139 151h38l28 158q2 13-13 16l-26 4q-14 2-18-11l-25-151z" fill="url(#hammer-wood)" stroke="#482317" strokeWidth="5" />
              <path d="m145 186 27-4 3 14-27 5zM166 262l27-5 3 14-27 5z" fill="#f1d292" opacity=".9" />
              <path d="m63 56 159-22q19-2 22 17l12 64q3 16-15 20l-166 27q-21 4-24-16L41 81q-4-21 22-25z" fill="url(#hammer-steel)" stroke="#455166" strokeWidth="7" />
              <path d="m63 56-22 25 10 65 22 16-12-55z" fill="url(#hammer-head-side)" stroke="#455166" strokeWidth="5" />
              <path d="m221 34 24 17 11 64-15 20-4-61z" fill="#667386" stroke="#455166" strokeWidth="5" />
              <path d="m72 68 145-20" stroke="white" strokeOpacity=".8" strokeWidth="8" strokeLinecap="round" />
              <path d="m86 138 137-23" stroke="#354154" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </motion.button>

          {!broken && <div className="absolute bottom-2 left-[22%] rounded-full border border-champagne/70 bg-white/75 px-5 py-2 text-lg font-semibold text-burgundy shadow-lg sm:left-[27%] sm:text-xl">{hits} <span className="text-burgundy/45">/ {HITS_NEEDED}</span></div>}
          {broken && <motion.div initial={{ opacity: 0, scale: .5, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute left-[18%] top-[12%] rounded-3xl border border-champagne/60 bg-white/85 px-6 py-3 font-hand text-3xl text-cherry shadow-2xl sm:left-[28%] sm:text-4xl">Birthday magic unlocked!</motion.div>}
        </div>

        <motion.p key={hits} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 min-h-9 font-hand text-2xl text-cherry sm:text-3xl md:text-4xl">
          {broken ? "Violence? No. Birthday engineering." : hits === 0 ? "Take a swing at the lock. The gift is enormous." : hits < HITS_NEEDED ? "Ooh, that one landed. One more big swing!" : "The lock is giving way…"}
        </motion.p>
        {broken && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4"><PrimaryButton className="mb-8 px-9 py-4 text-lg md:text-xl" onClick={onComplete}>Open the next surprise →</PrimaryButton></motion.div>}
      </div>
    </SceneShell>
  );
}
