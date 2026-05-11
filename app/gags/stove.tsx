"use client";

import { useState } from "react";

const STEPS = [
  "Establishing satellite uplink...",
  "Locating your kitchen...",
  "Analyzing thermal signatures...",
  "Reviewing neighborhood fire reports...",
  "Consulting your oven's browser history...",
  "Cross-referencing the last 7 times you asked this...",
  "Recalibrating anxiety sensors...",
  "Attempting to reach your landlord for comment...",
  "Running final probability matrix...",
  "Preparing notification for your insurance provider...",
];

function FlameIcon() {
  return (
    <svg viewBox="0 0 60 80" width="70" height="90" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-stove">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-stove)">
        <path
          d="M30,74 C12,66 6,50 12,36 C16,24 22,30 20,15 C29,23 25,38 33,42 C28,28 38,18 41,6 C50,20 53,38 45,52 C56,44 57,30 49,20 C61,36 61,56 52,66 C46,74 37,78 30,74 Z"
          fill="#e85d04" stroke="#c44100" strokeWidth="1" strokeLinejoin="round"
        />
        <path
          d="M30,68 C18,60 14,48 18,36 C22,26 26,32 26,22 C32,28 28,42 35,44 C30,33 40,24 42,14 C48,26 48,42 42,52 C50,46 50,34 44,26 C54,40 52,56 44,64 C40,70 35,72 30,68 Z"
          fill="#ff8c00" opacity="0.65" strokeLinejoin="round"
        />
        <path
          d="M30,60 C24,54 22,44 26,36 C30,28 32,34 32,28 C36,32 33,44 37,46 C34,38 42,30 42,22 C46,32 44,44 40,52 C44,48 44,38 40,32 C48,42 46,54 40,60 C37,64 34,64 30,60 Z"
          fill="#ffcc00" opacity="0.4" strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function Stove() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [visibleSteps, setVisibleSteps] = useState(0);

  function check() {
    setPhase("loading");
    setVisibleSteps(0);
    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps(i + 1);
        if (i === STEPS.length - 1) {
          setTimeout(() => setPhase("done"), 600);
        }
      }, i * 600);
    });
  }

  function reset() {
    setPhase("idle");
    setVisibleSteps(0);
  }

  return (
    <div className="gag-container">
      <FlameIcon />
      <span className="gag-label">Emergency Home Diagnostics</span>
      <h1 className="gag-heading">Did I Leave the Stove On?</h1>

      {phase === "idle" && (
        <>
          <p className="gag-subtext">
            One click. Complete peace of mind. Probably.
          </p>
          <button className="abyss-btn" onClick={check}>
            Check Now
          </button>
        </>
      )}

      {phase === "loading" && (
        <div className="loading-steps">
          {STEPS.slice(0, visibleSteps).map((step, i) => (
            <div key={i} className="loading-step">
              <span style={{ color: "#e85d04" }}>▶</span> {step}
            </div>
          ))}
        </div>
      )}

      {phase === "done" && (
        <>
          <div className="gag-answer">Yes.</div>
          <p className="gag-subtext">It&apos;s always on. You knew this.</p>
          <button className="abyss-btn" onClick={check}>
            Check Again
          </button>
          <button
            onClick={reset}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}
          >
            I refuse to accept this
          </button>
        </>
      )}
    </div>
  );
}
