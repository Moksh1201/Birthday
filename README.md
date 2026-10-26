# Bestie Birthday — interactive surprise site

A multi-scene, interactive birthday experience built with React, TypeScript, Vite, Tailwind CSS, and Motion.

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Your photos

Put all photos in the **`images/`** folder at the project root (where you already added them).

- `npm run dev` and `npm run build` run **`npm run sync-images`** first, copying `images/*` → `public/images/`.
- The gallery uses **every file** listed in `src/data/projectImages.ts` → `IMAGE_FILES`.
- Edit captions in `MEMORY_CAPTIONS` in the same file (or in `src/data/memories.ts`).

If you add a new photo file, add its exact filename to `IMAGE_FILES` in `src/data/projectImages.ts`.

Add your photo together as `images/best-bestie-together.jpg`. It appears beneath “BEST BESTIE IN THE WORLD” on the final page. If the file is not there yet, the page shows a designed photo placeholder.

## Personalization (text)

| Content | File |
|------|--------|
| Appreciation messages | `src/data/messages.ts` |
| Flirty compliments & surprise gifts | `src/data/compliments.ts` |
| Final letter | `finalBirthdayMessage` in `src/data/messages.ts` |

## Production build

```bash
npm run build
npm run preview
```

Made with love for your best bestie.
