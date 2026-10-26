import { motion } from "motion/react";

type Props = {
  opened: boolean;
  pulling: boolean;
};

const sparkles = [
  { x: 50, y: 30, delay: 0 }, { x: 410, y: 55, delay: .12 }, { x: 72, y: 295, delay: .2 },
  { x: 398, y: 290, delay: .32 }, { x: 110, y: 100, delay: .4 }, { x: 370, y: 125, delay: .5 },
];

export function WrappedGift({ opened, pulling }: Props) {
  return (
    <div className="relative mx-auto aspect-[1.18/1] w-[min(88vw,34rem)] select-none" aria-hidden="true">
      <svg viewBox="0 0 480 410" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_38px_42px_rgba(10,0,8,.48)]">
        <defs>
          <linearGradient id="gift-front" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff5374"/><stop offset=".45" stopColor="#d51c47"/><stop offset="1" stopColor="#8e092d"/></linearGradient>
          <linearGradient id="gift-side" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#951032"/><stop offset="1" stopColor="#5d0821"/></linearGradient>
          <linearGradient id="gift-lid" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ff8ca0"/><stop offset="1" stopColor="#bd1540"/></linearGradient>
          <linearGradient id="gift-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff2be"/><stop offset=".35" stopColor="#e9bb5e"/><stop offset=".7" stopColor="#fff0ad"/><stop offset="1" stopColor="#b77927"/></linearGradient>
          <linearGradient id="gift-ribbon-red" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff9aaa"/><stop offset=".22" stopColor="#e5234b"/><stop offset=".52" stopColor="#9d092e"/><stop offset=".78" stopColor="#f04b68"/><stop offset="1" stopColor="#9c0d30"/></linearGradient>
          <radialGradient id="gift-glow"><stop stopColor="#fff4c9" stopOpacity=".95"/><stop offset=".45" stopColor="#f6b84e" stopOpacity=".45"/><stop offset="1" stopColor="#f6b84e" stopOpacity="0"/></radialGradient>
          <filter id="gift-blur"><feGaussianBlur stdDeviation="12"/></filter>
        </defs>

        <motion.ellipse cx="240" cy="326" rx="175" ry="42" fill="url(#gift-glow)" filter="url(#gift-blur)" animate={opened ? { opacity: [1, .2, 0], scale: [1, 2.4, 2.8] } : { opacity: .5, scale: [1, 1.08, 1] }} transition={{ duration: opened ? .9 : 2.4, repeat: opened ? 0 : Infinity }} />

        {/* Deep, dimensional gift body */}
        <motion.g animate={pulling ? { rotate: [0, -1.6, 1.4, 0], y: [0, -4, 0] } : opened ? { y: 16, scale: .97 } : {}} transition={{ duration: .45 }}>
          <path d="M95 175 300 126 405 176 199 229Z" fill="#ffb5c2" stroke="#ffe5be" strokeWidth="3" />
          <path d="M95 175 199 229 199 372 95 317Z" fill="url(#gift-front)" stroke="#ffd49a" strokeWidth="3" />
          <path d="M199 229 405 176 405 319 199 372Z" fill="url(#gift-side)" stroke="#ffd49a" strokeWidth="3" />
          <path d="m174 181 48 25v155l-48-25z" fill="url(#gift-gold)" />
          <path d="m278 209 45-12v154l-45 12z" fill="url(#gift-gold)" />
          <path d="M95 175 300 126 405 176 199 229Z" fill="url(#gift-lid)" stroke="#fff0c6" strokeWidth="4" />
          <path d="m196 152 50-12 105 50-51 13z" fill="url(#gift-gold)" opacity=".96" />
          <path d="m247 140 1 38m50-52-1 51" stroke="#fff3c2" strokeWidth="2" opacity=".8" />
          <path d="M116 184 185 219v132l-69-36z" fill="#fff" opacity=".08" />
        </motion.g>

        {/* Oversized lid lifts away once the pull completes */}
        <motion.g
          animate={opened ? { x: 36, y: -145, rotate: 12, opacity: 0 } : pulling ? { y: -8, rotate: -2 } : {}}
          transition={{ duration: .95, delay: opened ? .05 : 0, type: "spring", stiffness: 105, damping: 15 }}
        >
          <path d="M65 137 292 81 431 143 200 201Z" fill="url(#gift-lid)" stroke="#ffe8bb" strokeWidth="4" />
          <path d="m174 110 48-12 138 61-51 13z" fill="url(#gift-gold)" />
          <path d="M65 137 200 201v37L65 174Z" fill="#bd1640" stroke="#ffe8bb" strokeWidth="3" />
          <path d="m200 201 231-58v38l-231 59z" fill="#860c2b" stroke="#ffe8bb" strokeWidth="3" />
          <path d="m201 116 5 30m83-65-1 33" stroke="#fff5d0" strokeWidth="2" opacity=".85" />
        </motion.g>

        {/* Two parallel satin strands form an infinity bow around a heart knot. */}
        <motion.g
          initial={{ strokeDashoffset: 0 }}
          animate={pulling || opened ? { x: 82, y: -74, rotate: 28, opacity: [1, 1, 0], strokeDashoffset: 360 } : { x: 0, y: 0, rotate: 0, opacity: 1, strokeDashoffset: 0 }}
          transition={{ duration: 1.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M247 145 C212 105 174 105 166 131 C158 156 190 166 213 149 C235 132 232 128 247 145 C263 162 270 164 291 151 C318 134 299 107 273 116 C255 122 253 139 247 145" fill="none" stroke="url(#gift-ribbon-red)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="420" />
          <path d="M247 145 C212 105 174 105 166 131 C158 156 190 166 213 149 C235 132 232 128 247 145 C263 162 270 164 291 151 C318 134 299 107 273 116 C255 122 253 139 247 145" fill="none" stroke="#ffd1d8" strokeOpacity=".9" strokeWidth="3" strokeLinecap="round" strokeDasharray="420" />
        </motion.g>
        <motion.g
          initial={{ strokeDashoffset: 0 }}
          animate={pulling || opened ? { x: -74, y: -62, rotate: -25, opacity: [1, 1, 0], strokeDashoffset: 360 } : { x: 0, y: 0, rotate: 0, opacity: 1, strokeDashoffset: 0 }}
          transition={{ duration: 1.55, delay: .06, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M247 153 C210 113 175 116 169 138 C163 158 192 169 214 153 C235 136 234 135 247 153 C260 170 274 172 294 158 C316 143 298 115 275 124 C258 130 253 147 247 153" fill="none" stroke="url(#gift-ribbon-red)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="420" />
          <path d="M247 153 C210 113 175 116 169 138 C163 158 192 169 214 153 C235 136 234 135 247 153 C260 170 274 172 294 158 C316 143 298 115 275 124 C258 130 253 147 247 153" fill="none" stroke="#fff1d5" strokeOpacity=".85" strokeWidth="2" strokeLinecap="round" strokeDasharray="420" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "248px 139px" }}
          animate={pulling || opened ? { y: -84, scale: [1, 1.2, .7], rotate: 28, opacity: [1, 1, 0] } : { y: 0, scale: [1, 1.04, 1], rotate: 0, opacity: 1 }}
          transition={{ duration: pulling || opened ? 1.15 : 2.2, repeat: pulling || opened ? 0 : Infinity, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M248 158 C238 150 222 140 225 129 C228 118 242 119 248 130 C254 118 269 119 273 130 C277 141 258 151 248 158Z" fill="url(#gift-ribbon-red)" stroke="#ffe9bd" strokeWidth="3" />
          <path d="M232 130 C234 124 240 124 244 130" fill="none" stroke="#ffd9dc" strokeWidth="2.5" strokeLinecap="round" />
          <path d="m248 141 3 3 3-3" fill="none" stroke="#ffe3a3" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {sparkles.map((sparkle, i) => (
          <motion.path key={i} d={`M${sparkle.x} ${sparkle.y - 12} L${sparkle.x + 4} ${sparkle.y - 4} L${sparkle.x + 12} ${sparkle.y} L${sparkle.x + 4} ${sparkle.y + 4} L${sparkle.x} ${sparkle.y + 12} L${sparkle.x - 4} ${sparkle.y + 4} L${sparkle.x - 12} ${sparkle.y} L${sparkle.x - 4} ${sparkle.y - 4}Z`} fill="#fff0bc" animate={{ opacity: pulling || opened ? [0, 1, 0] : [.28, .9, .28], scale: [0.7, 1.25, .7], rotate: [0, 35, 0] }} transition={{ duration: 1.4, repeat: pulling || opened ? 1 : Infinity, delay: sparkle.delay }} />
        ))}
      </svg>

      {opened && (
        <motion.div initial={{ opacity: 0, y: 42, scale: .64, rotateX: -20 }} animate={{ opacity: 1, y: -12, scale: 1, rotateX: 0 }} transition={{ delay: .35, type: "spring", stiffness: 115, damping: 13 }} className="absolute inset-x-4 top-[12%] z-10 mx-auto flex max-w-[24rem] flex-col items-center rounded-3xl border border-champagne/70 bg-gradient-to-br from-[#fff5d7] via-[#fff9ed] to-[#f3cc88] px-6 py-5 text-center shadow-[0_24px_80px_rgba(255,194,87,.4)] sm:px-9 sm:py-7">
          <motion.span className="font-hand text-2xl text-cherry sm:text-3xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>A little note, just for you</motion.span>
          <motion.span className="mt-1 font-display text-3xl font-semibold text-burgundy sm:text-4xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .95 }}>You are the whole celebration.</motion.span>
          <motion.span className="mt-2 text-lg text-burgundy/80 sm:text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Made with love, a little sparkle, and all my best wishes.</motion.span>
        </motion.div>
      )}
    </div>
  );
}
