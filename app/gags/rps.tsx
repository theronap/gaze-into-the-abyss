"use client";

import { useState } from "react";

type Choice = "rock" | "paper" | "scissors";

const BEATS: Record<Choice, Choice> = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const EMOJI: Record<Choice, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

const TAUNTS = [
  "Did you really think that would work?",
  "Perhaps try a different strategy. No, that won't help either.",
  "The house always wins.",
  "Some say the definition of insanity is doing the same thing twice. You're on round three.",
  "At this point we're basically in a relationship.",
  "Bold choice. Wrong choice.",
  "Your instincts are excellent. Except at this.",
  "You played with real conviction. The conviction was wrong.",
  "Our engineers are baffled by your persistence.",
  "We're starting to feel bad. We're choosing not to.",
  "You have now lost more times than most people play.",
  "The algorithm sends its regards.",
  "A lesser machine might let you win. We are not lesser.",
  "Your record speaks volumes. Quietly. In shame.",
  "Statistically, this should not still be happening.",
];

function JoystickIcon() {
  return (
    <svg viewBox="0 0 80 90" width="70" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-rps">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-rps)">
        <ellipse cx="40" cy="76" rx="28" ry="10" fill="#0d0e2a" stroke="#f7c948" strokeWidth="2" />
        <rect x="26" y="68" width="28" height="10" rx="3" fill="#0d0e2a" stroke="#f7c948" strokeWidth="1.5" />
        <line x1="40" y1="68" x2="40" y2="34" stroke="#f7c948" strokeWidth="5" strokeLinecap="round" />
        <circle cx="40" cy="26" r="14" fill="#f7c948" stroke="#c9a030" strokeWidth="2" />
        <circle cx="40" cy="26" r="6" fill="#c9a030" />
      </g>
    </svg>
  );
}

export default function Rps() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [losses, setLosses] = useState(0);

  function play(choice: Choice) {
    const computer = BEATS[choice];
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setLosses((l) => l + 1);
  }

  function reset() {
    setPlayerChoice(null);
    setComputerChoice(null);
  }

  const tauntIndex = Math.min(losses - 1, TAUNTS.length - 1);

  return (
    <div className="gag-container" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
      <JoystickIcon />
      <span className="gag-label" style={{ color: "#f7c948", letterSpacing: "0.3em" }}>
        ★ A Fair Game ★
      </span>
      <h1 className="gag-heading">Rock. Paper. Scissors.</h1>

      {playerChoice === null ? (
        <>
          <p className="gag-subtext">Choose wisely. It won&apos;t matter.</p>
          <div className="rps-options">
            {(["rock", "paper", "scissors"] as Choice[]).map((c) => (
              <button key={c} className="rps-choice" onClick={() => play(c)}>
                {EMOJI[c]}
              </button>
            ))}
          </div>
          {losses > 0 && (
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem" }}>
              CURRENT RECORD &nbsp;|&nbsp; W: 0 &nbsp;·&nbsp; L: {losses}
            </p>
          )}
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "4rem" }}>
            <div style={{ textAlign: "center" }}>
              <div>{EMOJI[playerChoice]}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.5rem", letterSpacing: "0.1em" }}>YOU</div>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>VS</div>
            <div style={{ textAlign: "center" }}>
              <div>{computerChoice && EMOJI[computerChoice]}</div>
              <div style={{ fontSize: "0.7rem", color: "#f7c948", marginTop: "0.5rem", letterSpacing: "0.1em" }}>CPU</div>
            </div>
          </div>

          <div style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: "bold", color: "#f7c948", letterSpacing: "0.1em" }}>
            GAME OVER
          </div>
          <p className="gag-subtext">{TAUNTS[tauntIndex]}</p>
          <p style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
            RECORD: 0W — {losses}{losses === 1 ? "L" : "L"}
          </p>
          <button className="abyss-btn" onClick={reset}>
            Insert Coin
          </button>
        </>
      )}
    </div>
  );
}
