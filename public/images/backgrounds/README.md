# Scene background photos

The background layers use photos from the project root `images/` folder. Vite syncs them into `public/images/` when you run `npm run dev` or `npm run build`. Each scene's two-photo pairing is configured in `SCENE_BACKGROUND_PAIRS` in `src/data/projectImages.ts`.

Opening scene photos: `images/27F4F11D-12BF-4646-86F0-4FCCB4D3C226.JPG` and `images/IMG_8429.jpg`. The first opening-scene photo is rotated 90° counterclockwise on that page only. Other scenes keep their own orientation and photo pair. The images are more visible now and softly tinted rose and champagne to sit with the scene colors while keeping text clear.

To use a different background, add the image to `images/` and change that scene's pair in `src/data/projectImages.ts`. Keep the opening photo rotation attached to the first opening-scene source if you replace it with another horizontal image.
