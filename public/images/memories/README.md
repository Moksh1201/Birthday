# Photos

Your photos live in the project root **`images/`** folder (sibling to `src/` and `public/`).

When you run `npm run dev` or `npm run build`, they are copied into `public/images/` automatically.

Edit captions in `src/data/memories.ts` (generated from `src/data/projectImages.ts`).

To register a **new** filename after adding a file, add it to the `IMAGE_FILES` list in `src/data/projectImages.ts`.

For the final page's together photo, add `best-bestie-together.jpg` directly to the project root `images/` folder. It is copied to `public/images/` automatically and displayed beneath the “BEST BESTIE IN THE WORLD” headline.
