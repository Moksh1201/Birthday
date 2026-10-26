import { Volume2, VolumeX } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { resumeAudio, sounds } from "../lib/audio";

type SoundKey = keyof typeof sounds;

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (key: SoundKey) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      if (!v) void resumeAudio();
      return !v;
    });
  }, []);

  const play = useCallback(
    (key: SoundKey) => {
      if (!enabled) return;
      sounds[key]();
    },
    [enabled],
  );

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

export function SoundToggle({ className = "" }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      className={`fixed top-4 right-4 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-champagne/40 bg-burgundy/80 text-champagne shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${className}`}
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={enabled}
    >
      {enabled ? <Volume2 className="h-5 w-5" aria-hidden /> : <VolumeX className="h-5 w-5" aria-hidden />}
    </button>
  );
}
