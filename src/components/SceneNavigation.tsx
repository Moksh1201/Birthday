import { ChevronLeft, ChevronRight } from "lucide-react";
import { SCENE_COUNT } from "../data/theme";

type Props = {
  current: number;
  onPrev: () => void;
  onNext: () => void;
  canGoNext?: boolean;
};

export function SceneNavigation({ current, onPrev, onNext, canGoNext = true }: Props) {
  if (current === 0) return null;

  return (
    <div className="fixed top-4 left-4 z-[90] flex gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={current <= 0}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
        aria-label="Previous scene"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {current < SCENE_COUNT - 1 && (
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex h-10 items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 text-xs text-white backdrop-blur-md transition hover:bg-black/60 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne md:text-sm"
          aria-label="Next scene"
        >
          Skip <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
