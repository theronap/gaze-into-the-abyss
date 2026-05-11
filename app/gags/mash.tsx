"use client";

import { useState, useEffect } from "react";

const HOUSING = ["Mansion", "Apartment", "Shack", "House"];

const DEFAULT_INPUTS = {
  partner: ["Ryan Gosling", "Your ex", "A mystery", "Yourself"],
  career: ["CEO of something", "Professional napper", "Not sure yet", "Crime"],
  city: ["New York", "A van", "Somewhere warm", "Here, indefinitely"],
};

type Phase = "setup" | "eliminating" | "result";

interface Categories {
  partner: string[];
  career: string[];
  city: string[];
}

function computeEliminations(cats: string[][]): number[][] {
  // Returns list of [catIdx, itemIdx] to eliminate, in order
  const n = 3 + Math.floor(Math.random() * 3); // elimination number 3-5
  const alive: boolean[][] = cats.map((cat) => cat.map(() => true));
  const result: number[][] = [];

  const isDone = () => cats.every((_, ci) => alive[ci].filter(Boolean).length <= 1);

  // flat interleaved list: [c0i0, c1i0, c2i0, c3i0, c0i1, ...]
  const flat: number[][] = [];
  const maxLen = Math.max(...cats.map((c) => c.length));
  for (let j = 0; j < maxLen; j++) {
    for (let i = 0; i < cats.length; i++) {
      if (j < cats[i].length) flat.push([i, j]);
    }
  }

  let count = 0;
  let pos = 0;
  let guard = 0;

  while (!isDone() && guard < 500) {
    guard++;
    const [ci, ii] = flat[pos % flat.length];
    pos++;
    if (!alive[ci][ii]) continue;
    if (alive[ci].filter(Boolean).length <= 1) continue;
    count++;
    if (count === n) {
      alive[ci][ii] = false;
      result.push([ci, ii]);
      count = 0;
    }
  }

  return result;
}

function HouseIcon() {
  return (
    <svg viewBox="0 0 70 70" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-mash">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-mash)" stroke="#ff6b9d" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8,36 L35,8 L62,36" />
        <rect x="16" y="36" width="38" height="26" />
        <rect x="28" y="46" width="14" height="16" />
        <rect x="20" y="38" width="10" height="10" />
        <rect x="40" y="38" width="10" height="10" />
      </g>
    </svg>
  );
}

export default function Mash() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [inputs, setInputs] = useState<Categories>({
    partner: [...DEFAULT_INPUTS.partner],
    career: [...DEFAULT_INPUTS.career],
    city: [...DEFAULT_INPUTS.city],
  });
  const [eliminated, setEliminated] = useState<Set<string>>(new Set());
  const [elQueue, setElQueue] = useState<number[][]>([]);
  const [result, setResult] = useState<{ housing: string; partner: string; career: string; city: string } | null>(null);

  const categories = [HOUSING, inputs.partner, inputs.career, inputs.city];
  const catNames = ["housing", "partner", "career", "city"];

  useEffect(() => {
    if (phase !== "eliminating" || elQueue.length === 0) return;
    const t = setTimeout(() => {
      const [ci, ii] = elQueue[0];
      setEliminated((prev) => new Set(prev).add(`${ci}-${ii}`));
      setElQueue((q) => q.slice(1));
    }, 180);
    return () => clearTimeout(t);
  }, [phase, elQueue]);

  useEffect(() => {
    if (phase === "eliminating" && elQueue.length === 0 && eliminated.size > 0) {
      // Find survivors
      const survivors = categories.map((cat, ci) => {
        const alive = cat.find((_, ii) => !eliminated.has(`${ci}-${ii}`));
        return alive ?? cat[0];
      });
      setTimeout(() => {
        setResult({
          housing: survivors[0],
          partner: survivors[1],
          career: survivors[2],
          city: survivors[3],
        });
        setPhase("result");
      }, 600);
    }
  }, [elQueue, eliminated, phase]);

  function startGame() {
    const queue = computeEliminations(categories);
    setEliminated(new Set());
    setElQueue(queue);
    setPhase("eliminating");
  }

  function reset() {
    setPhase("setup");
    setEliminated(new Set());
    setElQueue([]);
    setResult(null);
    setInputs({
      partner: [...DEFAULT_INPUTS.partner],
      career: [...DEFAULT_INPUTS.career],
      city: [...DEFAULT_INPUTS.city],
    });
  }

  function updateInput(cat: keyof Categories, idx: number, val: string) {
    setInputs((prev) => {
      const updated = { ...prev, [cat]: [...prev[cat]] };
      updated[cat][idx] = val;
      return updated;
    });
  }

  if (phase === "setup") {
    return (
      <div className="gag-container">
        <HouseIcon />
        <span className="gag-label" style={{ color: "#ff6b9d" }}>Life Outcome Projection System</span>
        <h1 className="gag-heading">M.A.S.H.</h1>
        <p className="gag-subtext">Fill in your options. The algorithm decides your fate.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "100%", maxWidth: "560px" }}>
          <div className="gag-card" style={{ borderColor: "#e8e0d0" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ff6b9d", marginBottom: "0.75rem" }}>Where You&apos;ll Live</p>
            {HOUSING.map((h) => (
              <p key={h} style={{ fontSize: "0.85rem", color: "var(--muted)", padding: "0.2rem 0", borderBottom: "1px solid var(--border)" }}>{h}</p>
            ))}
            <p style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.4rem", fontStyle: "italic" }}>fixed</p>
          </div>

          {(["partner", "career", "city"] as (keyof Categories)[]).map((cat, ci) => (
            <div key={cat} className="gag-card" style={{ borderColor: "#e8e0d0" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ff6b9d", marginBottom: "0.75rem" }}>
                {cat === "partner" ? "Who You'll Marry" : cat === "career" ? "What You'll Do" : "Where You'll Be"}
              </p>
              {inputs[cat].map((val, ii) => (
                <input
                  key={ii}
                  value={val}
                  onChange={(e) => updateInput(cat, ii, e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    color: "#1a1a2a",
                    fontSize: "0.85rem",
                    padding: "0.2rem 0",
                    fontFamily: "inherit",
                    outline: "none",
                    marginBottom: "0.1rem",
                  }}
                  maxLength={30}
                />
              ))}
            </div>
          ))}
        </div>

        <button className="abyss-btn" onClick={startGame} style={{ marginTop: "1rem" }}>
          Reveal My Fate
        </button>
      </div>
    );
  }

  if (phase === "eliminating" || phase === "result") {
    return (
      <div className="gag-container">
        <HouseIcon />
        <span className="gag-label" style={{ color: "#ff6b9d" }}>Life Outcome Projection System</span>
        <h1 className="gag-heading">M.A.S.H.</h1>
        {phase === "eliminating" && (
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontStyle: "italic", marginBottom: "1rem" }}>Computing destiny...</p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "100%", maxWidth: "560px" }}>
          {categories.map((cat, ci) => (
            <div key={ci} className="gag-card" style={{ borderColor: "#e8e0d0" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ff6b9d", marginBottom: "0.6rem" }}>
                {ci === 0 ? "Live" : ci === 1 ? "Partner" : ci === 2 ? "Career" : "City"}
              </p>
              {cat.map((item, ii) => {
                const isElim = eliminated.has(`${ci}-${ii}`);
                const isSurvivor = phase === "result" && !isElim;
                return (
                  <p
                    key={ii}
                    style={{
                      fontSize: "0.85rem",
                      padding: "0.2rem 0",
                      borderBottom: "1px solid var(--border)",
                      textDecoration: isElim ? "line-through" : "none",
                      color: isSurvivor ? "#ff6b9d" : isElim ? "var(--muted)" : "#1a1a2a",
                      fontWeight: isSurvivor ? "700" : "normal",
                      transition: "color 0.3s, text-decoration 0.1s",
                      opacity: isElim ? 0.4 : 1,
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          ))}
        </div>

        {phase === "result" && result && (
          <>
            <div
              className="gag-card"
              style={{
                borderColor: "#ff6b9d",
                maxWidth: "480px",
                width: "100%",
                marginTop: "1rem",
                textAlign: "center",
                lineHeight: "1.9",
              }}
            >
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ff6b9d", marginBottom: "0.5rem" }}>Your Destiny</p>
              <p style={{ fontSize: "0.95rem" }}>
                You will live in a <strong>{result.housing}</strong> in <strong>{result.city}</strong>,{" "}
                married to <strong>{result.partner}</strong>, working as <strong>{result.career}</strong>.
              </p>
            </div>
            <button className="abyss-btn" onClick={reset}>Play Again</button>
          </>
        )}
      </div>
    );
  }

  return null;
}
