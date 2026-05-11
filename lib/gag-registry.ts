export type GagTheme = {
  bg: string;
  fg: string;
  accent: string;
  muted: string;
  border: string;
  card: string;
  btnFg?: string;
};

export type Gag = {
  id: string;
  title: string;
  theme: GagTheme;
};

export const gags: Gag[] = [
  {
    id: "stove",
    title: "Did I Leave the Stove On?",
    theme: {
      bg: "#0c0804",
      fg: "#f0e6d3",
      accent: "#e85d04",
      muted: "#7a4a20",
      border: "#2a1a0a",
      card: "#160e05",
    },
  },
  {
    id: "problem",
    title: "Am I the Problem?",
    theme: {
      bg: "#f0ebe0",
      fg: "#1a1a1a",
      accent: "#b52a2a",
      muted: "#888",
      border: "#d0c8b8",
      card: "#e8e2d4",
    },
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    theme: {
      bg: "#08091a",
      fg: "#d0d4ff",
      accent: "#f7c948",
      muted: "#4444aa",
      border: "#1a1a44",
      card: "#0d0e2a",
      btnFg: "#08091a",
    },
  },
  {
    id: "horoscope",
    title: "Horoscope for Realists",
    theme: {
      bg: "#080412",
      fg: "#e8d5b7",
      accent: "#c9a84c",
      muted: "#5533aa",
      border: "#1a0e30",
      card: "#110820",
    },
  },
  {
    id: "overthinking",
    title: "The Overthinking Machine",
    theme: {
      bg: "#000c00",
      fg: "#00cc33",
      accent: "#00ff41",
      muted: "#004400",
      border: "#002800",
      card: "#001200",
      btnFg: "#000c00",
    },
  },
];

export function getRandomGag(excludeId?: string): Gag {
  const pool = excludeId ? gags.filter((g) => g.id !== excludeId) : gags;
  return pool[Math.floor(Math.random() * pool.length)];
}
