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
    theme: { bg: "#0c0804", fg: "#f0e6d3", accent: "#e85d04", muted: "#7a4a20", border: "#2a1a0a", card: "#160e05" },
  },
  {
    id: "problem",
    title: "Am I the Problem?",
    theme: { bg: "#f0ebe0", fg: "#1a1a1a", accent: "#b52a2a", muted: "#888", border: "#d0c8b8", card: "#e8e2d4" },
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    theme: { bg: "#08091a", fg: "#d0d4ff", accent: "#f7c948", muted: "#4444aa", border: "#1a1a44", card: "#0d0e2a", btnFg: "#08091a" },
  },
  {
    id: "horoscope",
    title: "Horoscope for Realists",
    theme: { bg: "#080412", fg: "#e8d5b7", accent: "#c9a84c", muted: "#5533aa", border: "#1a0e30", card: "#110820" },
  },
  {
    id: "overthinking",
    title: "The Overthinking Machine",
    theme: { bg: "#000c00", fg: "#00cc33", accent: "#00ff41", muted: "#004400", border: "#002800", card: "#001200", btnFg: "#000c00" },
  },
  {
    id: "redFlag",
    title: "Is This a Red Flag?",
    theme: { bg: "#0d0d00", fg: "#ffe860", accent: "#ff4422", muted: "#666600", border: "#2a2a00", card: "#1a1a00" },
  },
  {
    id: "villain",
    title: "My Villain Origin Story",
    theme: { bg: "#08000f", fg: "#ddbeff", accent: "#9933ff", muted: "#441166", border: "#220044", card: "#100020" },
  },
  {
    id: "apology",
    title: "The Apology Generator",
    theme: { bg: "#f7f0e0", fg: "#2a1a00", accent: "#7a5c2a", muted: "#aa8855", border: "#d4c4a0", card: "#ede4cc", btnFg: "#f7f0e0" },
  },
  {
    id: "spiritAnimal",
    title: "My Spirit Animal",
    theme: { bg: "#04100a", fg: "#bbeecc", accent: "#44bb55", muted: "#2a5a2a", border: "#0a2a14", card: "#081a0e" },
  },
  {
    id: "cooked",
    title: "Am I Cooked?",
    theme: { bg: "#111420", fg: "#c4c8e8", accent: "#6677ff", muted: "#333656", border: "#222640", card: "#181c30" },
  },
  {
    id: "affirmation",
    title: "Daily Affirmation for Realists",
    theme: { bg: "#f8f8f8", fg: "#111111", accent: "#111111", muted: "#999", border: "#e0e0e0", card: "#f0f0f0" },
  },
  {
    id: "startupName",
    title: "Startup Name Generator",
    theme: { bg: "#f0f5ff", fg: "#0d1f44", accent: "#1a44dd", muted: "#8899bb", border: "#c4d4ff", card: "#e4edff", btnFg: "#ffffff" },
  },
  {
    id: "giveUp",
    title: "How Long Until I Give Up?",
    theme: { bg: "#001a18", fg: "#99ffee", accent: "#00e8d4", muted: "#005550", border: "#003830", card: "#002520", btnFg: "#001a18" },
  },
  {
    id: "excuse",
    title: "Today's Excuse",
    theme: { bg: "#f8f6f0", fg: "#1a1a2a", accent: "#224488", muted: "#888", border: "#d8d4cc", card: "#eeeae0", btnFg: "#ffffff" },
  },
  {
    id: "reply",
    title: "Should I Reply?",
    theme: { bg: "#0d1117", fg: "#e6edf3", accent: "#58a6ff", muted: "#484f58", border: "#21262d", card: "#161b22" },
  },
  {
    id: "bongoCat",
    title: "Bongo Cat",
    theme: { bg: "#1a1a2a", fg: "#f0f0ff", accent: "#ff9933", muted: "#555577", border: "#2a2a44", card: "#222236" },
  },
  {
    id: "mash",
    title: "M.A.S.H.",
    theme: { bg: "#fffef5", fg: "#1a1a2a", accent: "#ff6b9d", muted: "#888880", border: "#e8e0d0", card: "#f7f5e8", btnFg: "#ffffff" },
  },
  {
    id: "whatIsWrong",
    title: "What Is Wrong With Me?",
    theme: { bg: "#f5f9ff", fg: "#0a1a3a", accent: "#0055dd", muted: "#7788aa", border: "#c0d0e8", card: "#e8f0f8", btnFg: "#ffffff" },
  },
  {
    id: "slotMachine",
    title: "Slot Machine of Regrets",
    theme: { bg: "#0d0005", fg: "#ffd700", accent: "#cc0033", muted: "#660022", border: "#330011", card: "#1a000a" },
  },
  {
    id: "lifeSupport",
    title: "Life Support Chat",
    theme: { bg: "#f4f6f8", fg: "#1a2030", accent: "#0077cc", muted: "#8899aa", border: "#d0dae8", card: "#e8eef4", btnFg: "#ffffff" },
  },
  {
    id: "anxietyTranslator",
    title: "Anxiety Translator",
    theme: { bg: "#0e0818", fg: "#e8deff", accent: "#aa77ff", muted: "#443366", border: "#221144", card: "#160d22" },
  },
  {
    id: "existentialClicker",
    title: "The Button",
    theme: { bg: "#050505", fg: "#bbbbbb", accent: "#ffffff", muted: "#333333", border: "#111111", card: "#0d0d0d" },
  },
  {
    id: "dialUp",
    title: "Dial-Up Simulator",
    theme: { bg: "#000800", fg: "#33ff33", accent: "#00ff00", muted: "#005500", border: "#002200", card: "#000f00", btnFg: "#000800" },
  },
  {
    id: "searchHistory",
    title: "Haunted by Your Search History",
    theme: { bg: "#202124", fg: "#e8eaed", accent: "#8ab4f8", muted: "#5f6368", border: "#3c4043", card: "#292a2d" },
  },
  {
    id: "compatibility",
    title: "Compatibility Report",
    theme: { bg: "#0f0006", fg: "#ffccdd", accent: "#ff2266", muted: "#661133", border: "#330022", card: "#1a000d" },
  },
  {
    id: "negotiator",
    title: "The Negotiator",
    theme: { bg: "#111215", fg: "#d0d5dd", accent: "#44aaff", muted: "#445566", border: "#1e2533", card: "#171a22" },
  },
  {
    id: "catOpinion",
    title: "The Cat's Opinion of You",
    theme: { bg: "#1a0f00", fg: "#ffe8cc", accent: "#ff8844", muted: "#663300", border: "#2a1500", card: "#221200" },
  },
  {
    id: "napOptimizer",
    title: "Nap Optimizer",
    theme: { bg: "#f0f8ff", fg: "#0a2040", accent: "#0066cc", muted: "#6688aa", border: "#b8d4ee", card: "#deeeff", btnFg: "#ffffff" },
  },
];

export function getRandomGag(excludeId?: string): Gag {
  const pool = excludeId ? gags.filter((g) => g.id !== excludeId) : gags;
  return pool[Math.floor(Math.random() * pool.length)];
}

// TODO: TESTING ONLY — remove getNextGag and restore random cycling in page.tsx
export function getNextGag(currentId: string): Gag {
  const idx = gags.findIndex((g) => g.id === currentId);
  return gags[(idx + 1) % gags.length];
}
