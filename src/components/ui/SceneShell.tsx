import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundPhoto?: string;
  backgroundPhotos?: string[];
  rotateBackgroundPhoto?: string;
};

export function SceneShell({ children, className = "", id, backgroundPhoto, backgroundPhotos = [], rotateBackgroundPhoto }: Props) {
  const photos = backgroundPhoto ? [backgroundPhoto, ...backgroundPhotos] : backgroundPhotos;
  return (
    <section
      id={id}
      className={`relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 pb-40 pt-24 md:px-8 md:pb-44 md:pt-28 ${className}`}
    >
      {photos.map((photo) => <div key={photo} aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-[0.29] mix-blend-soft-light saturate-[1.15] ${photo === rotateBackgroundPhoto ? "-rotate-90 scale-[1.8]" : ""}`} style={{ backgroundImage: `url("${photo}")` }} />)}
      {photos.length > 0 && <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-cherry/[0.06] via-transparent to-champagne/[0.07]" />}
      {children}
    </section>
  );
}
