let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function tone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.08) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

export const sounds = {
  giftOpen: () => {
    tone(440, 0.15);
    setTimeout(() => tone(660, 0.2), 80);
  },
  hammer: () => tone(120, 0.08, "square", 0.06),
  pop: () => tone(800, 0.05, "triangle", 0.05),
  balloon: () => tone(520, 0.06, "sine", 0.04),
  cork: () => {
    tone(180, 0.1, "sawtooth", 0.07);
    setTimeout(() => tone(90, 0.15, "sine", 0.05), 40);
  },
  blowOut: () => tone(200, 0.25, "sine", 0.05),
  sparkle: () => tone(880, 0.08, "triangle", 0.03),
};

export async function resumeAudio() {
  const ctx = getCtx();
  if (ctx?.state === "suspended") await ctx.resume();
}
