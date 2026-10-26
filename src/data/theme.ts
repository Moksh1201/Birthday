export const theme = {
  colors: {
    cherry: "#B5122B",
    cherryDeep: "#8B0E22",
    rose: "#F4A6B8",
    blush: "#FFF0F3",
    ivory: "#FFFBF7",
    champagne: "#E8C98B",
    burgundy: "#390713",
    black: "#0D0A0B",
  },
} as const;

export const SCENE_LABELS = [
  "The Gift",
  "Hammer Time",
  "Party!",
  "Appreciation",
  "Memories",
  "Gorgeous",
  "Cake",
  "Surprises",
  "Forever",
] as const;

export const SCENE_COUNT = SCENE_LABELS.length;
