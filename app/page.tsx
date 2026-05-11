"use client";

import { useState } from "react";
import { gags, getNextGag, type Gag } from "@/lib/gag-registry";
import Stove from "./gags/stove";
import Problem from "./gags/problem";
import Rps from "./gags/rps";
import Horoscope from "./gags/horoscope";
import Overthinking from "./gags/overthinking";
import RedFlag from "./gags/redFlag";
import Villain from "./gags/villain";
import Apology from "./gags/apology";
import SpiritAnimal from "./gags/spiritAnimal";
import Cooked from "./gags/cooked";
import Affirmation from "./gags/affirmation";
import StartupName from "./gags/startupName";
import GiveUp from "./gags/giveUp";
import Excuse from "./gags/excuse";
import Reply from "./gags/reply";

const GAG_COMPONENTS: Record<string, React.ComponentType> = {
  stove: Stove,
  problem: Problem,
  rps: Rps,
  horoscope: Horoscope,
  overthinking: Overthinking,
  redFlag: RedFlag,
  villain: Villain,
  apology: Apology,
  spiritAnimal: SpiritAnimal,
  cooked: Cooked,
  affirmation: Affirmation,
  startupName: StartupName,
  giveUp: GiveUp,
  excuse: Excuse,
  reply: Reply,
};

export default function Home() {
  // TODO: TESTING ONLY — restore: useState<Gag>(() => getRandomGag()) and next() calling getRandomGag(current.id)
  const [current, setCurrent] = useState<Gag>(() => gags[0]);
  const GagComponent = GAG_COMPONENTS[current.id];
  const { theme } = current;

  function next() {
    setCurrent(getNextGag(current.id));
  }

  const themeVars = {
    "--bg": theme.bg,
    "--fg": theme.fg,
    "--accent": theme.accent,
    "--muted": theme.muted,
    "--border": theme.border,
    "--card": theme.card,
    "--btn-fg": theme.btnFg ?? "#fff",
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...themeVars,
        background: theme.bg,
        color: theme.fg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "1.25rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.2rem" }}>
            You have been chosen
          </p>
          <h1 style={{ fontSize: "1.1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg)" }}>
            Gaze into the Abyss
          </h1>
        </div>
        <button className="abyss-btn" onClick={next}>
          Gaze Further →
        </button>
      </header>

      <main style={{ flex: 1 }}>
        <GagComponent />
      </main>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div className="ad-slot">Advertisement</div>
        <p style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
          {current.title}
        </p>
      </footer>
    </div>
  );
}
