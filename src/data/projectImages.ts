/**
 * All photos live in the project root `images/` folder (synced to `public/images/` for Vite).
 * Add or replace files there, then run `npm run sync-images`.
 */

export const IMAGE_FILES = [
  "27F4F11D-12BF-4646-86F0-4FCCB4D3C226.JPG",
  "IMG_8429.jpg",
  "IMG_8431.jpg",
  "IMG_8432.jpg",
  "IMG_8433.jpg",
  "IMG_8435.jpg",
  "IMG_8439.jpg",
  "IMG_8440.jpg",
  "IMG_8442.jpg",
  "IMG_8444.jpg",
  "IMG_8445.jpg",
  "IMG_8446.jpg",
  "IMG_8447.jpg",
  "IMG_8448.jpg",
  "IMG_8449.jpg",
  "IMG_8450.jpg",
  "IMG_8451.jpg",
  "IMG_8452.jpg",
  "IMG_8453.jpg",
  "IMG_8454.jpg",
] as const;

export function imagePath(filename: (typeof IMAGE_FILES)[number] | string): string {
  return `/images/${encodeURIComponent(filename)}`;
}

export const MEMORY_CAPTIONS = [
  "One of those memories I'll always keep.",
  "Proof that we have our own kind of chaos.",
  "You, being effortlessly you.",
  "A moment I wish I could replay.",
  "A little memory. A lot of love.",
  "More memories to make, please.",
  "One of my favourite memories.",
  "Chaos, but make it cute.",
  "This face. Every time.",
  "Us being us.",
  "Soft light, big smiles.",
  "Would relive this in a heartbeat.",
  "Another chapter of our story.",
  "Forever grateful for this one.",
  "And so many more to come.",
] as const;

/** Two subtle background layers per scene (indices into IMAGE_FILES). */
export const SCENE_BACKGROUND_PAIRS: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
  [12, 13],
  [14, 15],
  [16, 17],
];

export function sceneBackgrounds(pairIndex: number): string[] {
  const pair = SCENE_BACKGROUND_PAIRS[pairIndex];
  if (!pair) return [];
  return pair.map((i) => imagePath(IMAGE_FILES[i]));
}

/** Balloon pop reveal photos (balloon id → image). */
export const BALLOON_PHOTOS: Record<string, string> = {
  b1: imagePath(IMAGE_FILES[0]),
  b2: imagePath(IMAGE_FILES[1]),
  b3: imagePath(IMAGE_FILES[2]),
  b4: imagePath(IMAGE_FILES[3]),
  b5: imagePath(IMAGE_FILES[4]),
  b6: imagePath(IMAGE_FILES[5]),
  b7: imagePath(IMAGE_FILES[6]),
  b8: imagePath(IMAGE_FILES[7]),
};

/** Birthday cake scrapbook strip. */
export const CAKE_SCRAPBOOK_PHOTOS = [
  imagePath(IMAGE_FILES[17]),
  imagePath(IMAGE_FILES[18]),
  imagePath(IMAGE_FILES[19]),
] as const;
