import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { memories, type MemoryPhoto } from "../../data/memories";
import { sceneBackgrounds } from "../../data/projectImages";
import { SceneShell } from "../ui/SceneShell";
import { PrimaryButton } from "../ui/PrimaryButton";

type Props = { onComplete: () => void };

const HEART_MASK = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='white' d='M50 94 C43 87 7 61 5 35 C3 19 14 8 29 8 C39 8 47 13 50 24 C53 13 61 8 71 8 C86 8 97 19 95 35 C93 61 57 87 50 94 Z'/%3E%3C/svg%3E\")";

function MemoryTile({ photo, index, onOpen }: { photo: MemoryPhoto; index: number; onOpen: () => void }) {
  const rotation = [-2, 1.6, -1.2, 2.1, -.8, 1.3][index % 6];
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ rotate: `${rotation}deg` }}
      className="group relative z-10 -m-0.5 aspect-square w-full overflow-hidden rounded-xl border-[3px] border-white/90 shadow-[0_8px_18px_rgba(20,0,10,.32)] transition duration-300 hover:z-30 hover:border-champagne focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-110 group-active:scale-105"
      />
    </button>
  );
}

export function HeartPhotoGallery({ onComplete }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + memories.length) % memories.length));
  }, []);
  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % memories.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  return (
    <SceneShell backgroundPhotos={sceneBackgrounds(4)} className="bg-gradient-to-b from-burgundy via-[#4a0818] to-blush/40">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-2">
        <h2 className="text-center font-display text-2xl uppercase tracking-wide text-blush md:text-4xl">
          A LITTLE PIECE OF MY HEART, IN PICTURES.
        </h2>
        <p className="mt-3 text-center text-sm text-champagne/90 md:text-base">
          Some memories are photographs. Some are feelings. These are a little bit of both.
        </p>

        <div className="relative mx-auto mt-10 w-[min(92vw,40rem)]">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-8 rounded-full bg-rose/35 blur-3xl" />
          <div className="relative aspect-square p-[10px] [filter:drop-shadow(0_24px_34px_rgba(20,0,10,.32))]" style={{ maskImage: HEART_MASK, WebkitMaskImage: HEART_MASK, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}>
            <div className="h-full w-full bg-gradient-to-br from-champagne via-rose to-cherry p-[6px]">
              <div className="grid h-full w-full grid-cols-4 grid-rows-5 gap-[3px] overflow-hidden rounded-[2rem] bg-[#64142c]">
                {memories.map((photo, index) => (
                  <MemoryTile key={photo.id} photo={photo} index={index} onOpen={() => setLightbox(index)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <PrimaryButton variant="dark" onClick={onComplete}>
            Okay but let's talk about how gorgeous you are →
          </PrimaryButton>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal
            aria-label="Photo lightbox"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={memories[lightbox].src}
                alt={memories[lightbox].alt}
                className="max-h-[70vh] w-full rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-4 text-center font-hand text-xl text-champagne">{memories[lightbox].caption}</p>
              <div className="mt-4 flex justify-center gap-4">
                <button type="button" onClick={prev} className="rounded-full bg-white/10 p-2 text-white" aria-label="Previous photo">
                  <ChevronLeft />
                </button>
                <button type="button" onClick={close} className="rounded-full bg-white/10 p-2 text-white" aria-label="Close lightbox">
                  <X />
                </button>
                <button type="button" onClick={next} className="rounded-full bg-white/10 p-2 text-white" aria-label="Next photo">
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  );
}
