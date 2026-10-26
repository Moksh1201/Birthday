import { IMAGE_FILES, MEMORY_CAPTIONS, imagePath } from "./projectImages";

export type MemoryPhoto = {
  id: string;
  src: string;
  caption: string;
  alt: string;
};

/** Gallery entries — one per file in the root `images/` folder. */
export const memories: MemoryPhoto[] = IMAGE_FILES.map((file, index) => ({
  id: String(index + 1).padStart(2, "0"),
  src: imagePath(file),
  caption: MEMORY_CAPTIONS[index % MEMORY_CAPTIONS.length],
  alt: `Birthday memory ${index + 1}`,
}));
