import { SCENE_COUNT, SCENE_LABELS } from "../data/theme";

type Props = {
  current: number;
  onJump?: (index: number) => void;
};

export function ProgressIndicator({ current, onJump }: Props) {
  return (
    <nav
      className="fixed bottom-4 left-1/2 z-[90] flex max-w-[95vw] -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md md:gap-2 md:px-4"
      aria-label="Experience progress"
    >
      {Array.from({ length: SCENE_COUNT }, (_, i) => (
        <button
          key={SCENE_LABELS[i]}
          type="button"
          onClick={() => onJump?.(i)}
          className="group flex flex-col items-center gap-0.5 p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
          aria-label={`Go to ${SCENE_LABELS[i]}${i === current ? ", current scene" : ""}`}
          aria-current={i === current ? "step" : undefined}
        >
          <span
            className={`block h-1.5 rounded-full transition-all md:h-2 ${
              i === current ? "w-6 bg-champagne md:w-8" : i < current ? "w-3 bg-rose/80 md:w-4" : "w-2 bg-white/30 md:w-3"
            }`}
          />
          <span className="hidden text-xs text-white/70 group-hover:text-white md:block">{SCENE_LABELS[i]}</span>
        </button>
      ))}
    </nav>
  );
}
