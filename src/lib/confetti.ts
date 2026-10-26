import confetti from "canvas-confetti";

type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
};

const palette = ["#B5122B", "#F4A6B8", "#E8C98B", "#FFF0F3", "#FF6B8A"];

export function burstConfetti(options: ConfettiOptions = {}) {
  confetti({
    particleCount: options.particleCount ?? 80,
    spread: options.spread ?? 70,
    startVelocity: options.startVelocity ?? 32,
    origin: options.origin ?? { y: 0.6 },
    colors: options.colors ?? palette,
    disableForReducedMotion: true,
  });
}

export function burstHearts() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤", scalar });
  const star = confetti.shapeFromText({ text: "✦", scalar: 1.2 });

  confetti({
    particleCount: 30,
    spread: 100,
    origin: { y: 0.5 },
    shapes: [heart, star],
    scalar,
    disableForReducedMotion: true,
  });
}

export function sideConfetti() {
  const end = Date.now() + 400;
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: palette,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: palette,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
