"use client";

import { useState } from "react";

const ALL_SEARCHES = [
  "how to seem confident when you're not",
  "is it normal to still think about that",
  "how long is too long to hold a grudge",
  "do i need to respond right now",
  "symptoms of just being tired vs something else",
  "how to cancel plans without lying",
  "is cheese bad for you now",
  "what does it mean when",
  "how to apologize when you don't know what you did",
  "best excuses for not going to things",
  "why do i keep dreaming about",
  "how to seem less desperate",
  "is this a red flag or am i paranoid",
  "what to do when you can't stop thinking",
  "normal amount of anxiety",
  "how to be less weird in social situations",
  "why does my",
  "how long until this gets easier",
  "is everyone else this tired",
  "what to do if you've been avoiding something for weeks",
  "acceptable amount of coffee per day",
  "how to start things you've been putting off",
  "does [person] hate me or are they just busy",
  "how to stop overthinking",
  "what counts as a good day",
  "can dogs tell when you're stressed",
  "why is it always",
  "can i eat this still",
  "how to care less what people think",
  "am i the problem or is everyone else",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 70 70" width="62" height="62" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-search">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-search)" stroke="var(--accent)" fill="none" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="28" cy="28" r="20" />
        <line x1="43" y1="43" x2="62" y2="62" />
      </g>
    </svg>
  );
}

export default function SearchHistory() {
  const [searches, setSearches] = useState(() => shuffle(ALL_SEARCHES).slice(0, 22));
  const [cleared, setCleared] = useState(false);

  function clearHistory() {
    setCleared(true);
  }

  function restore() {
    setSearches(shuffle(ALL_SEARCHES).slice(0, 22));
    setCleared(false);
  }

  return (
    <div className="gag-container">
      <SearchIcon />
      <span className="gag-label" style={{ color: "var(--accent)" }}>Recent Activity</span>
      <h1 className="gag-heading">Haunted by Your Search History</h1>

      {cleared ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ fontSize: "1rem", color: "var(--muted)", fontStyle: "italic" }}>History cleared.</p>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.5rem", opacity: 0.6 }}>
            It remembers anyway.
          </p>
          <button className="abyss-btn" onClick={restore} style={{ marginTop: "2rem" }}>
            Restore
          </button>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "520px", display: "flex", flexDirection: "column" }}>
          {searches.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.55rem 1rem",
                borderBottom: "1px solid var(--border)",
                fontSize: "0.875rem",
                color: "var(--fg)",
                opacity: 0.55 + (i / searches.length) * 0.45,
              }}
            >
              <span style={{ color: "var(--accent)", fontSize: "0.75rem", opacity: 0.6, minWidth: "14px" }}>↺</span>
              <span style={{ color: "var(--accent)" }}>{s}</span>
            </div>
          ))}
          <button
            onClick={clearHistory}
            style={{
              marginTop: "1.5rem",
              alignSelf: "center",
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              cursor: "pointer",
              padding: "0.45rem 1.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              fontFamily: "inherit",
              borderRadius: "2px",
            }}
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
