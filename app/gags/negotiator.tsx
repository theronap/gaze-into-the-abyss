"use client";

import { useState } from "react";

type Round = { from: "you" | "them"; text: string };

const COUNTER_ROUND_1 = [
  (ask: string) => `Thank you for raising the matter of ${ask}. We've reviewed your position internally and find it ambitious. We'd like to propose ${ask}, but less.`,
  (ask: string) => `Your request regarding ${ask} has been noted. After consultation, we are prepared to offer a modified version of ${ask} — specifically, the version that costs us nothing.`,
  (ask: string) => `We appreciate you bringing ${ask} to the table. Our initial counter-offer is: ${ask}, but later, and in a reduced form we'll describe as 'essentially the same.'`,
  (ask: string) => `The team has reviewed ${ask} and agrees in principle. In practice, however, we'd like to suggest something smaller, sooner, with less follow-through on our part.`,
];

const COUNTER_ROUND_2 = [
  "We hear you. We'd like to meet in the middle. The middle we're proposing is closer to our end.",
  "Our revised offer accounts for your concerns, the current climate, and our preference not to do this. We think you'll find it almost acceptable.",
  "We're moving toward you. Slightly. We'd like acknowledgment for the movement, independent of where we end up.",
  "This is our best offer, which is not the same as a good offer. We want to be transparent about that distinction.",
];

const FINAL_SETTLEMENTS = [
  (ask: string) => `Final settlement: partial ${ask}, reviewed quarterly, subject to conditions not yet specified, pending approval from someone who is currently unavailable.`,
  (ask: string) => `Agreed: a version of ${ask} will be provided at a time and in a form to be determined. Both parties acknowledge this is not ${ask}.`,
  (ask: string) => `Binding resolution: ${ask} will be considered as part of a future conversation, the date of which is TBD. You will be notified. Eventually.`,
  (ask: string) => `Settlement reached: you will receive 40% of ${ask}, on the condition that you don't bring up the other 60%. This is final.`,
];

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 80 68" width="76" height="65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-negotiator">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-negotiator)" stroke="#44aaff" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="24" width="64" height="40" rx="4" />
        <path d="M28,24 L28,16 Q28,10 34,10 L46,10 Q52,10 52,16 L52,24" />
        <line x1="8" y1="40" x2="72" y2="40" />
        <line x1="34" y1="40" x2="46" y2="40" strokeWidth="4" />
      </g>
    </svg>
  );
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Negotiator() {
  const [input, setInput] = useState("");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [phase, setPhase] = useState<"idle" | "r1" | "r2" | "final">("idle");
  const [ask, setAsk] = useState("");

  function openNegotiations() {
    if (!input.trim()) return;
    const trimmed = input.trim();
    setAsk(trimmed);
    const r1fn = pick(COUNTER_ROUND_1);
    setRounds([
      { from: "you", text: `I would like ${trimmed}.` },
      { from: "them", text: r1fn(trimmed) },
    ]);
    setPhase("r1");
    setInput("");
  }

  function counterOffer() {
    setRounds((r) => [
      ...r,
      { from: "you", text: `I understand your position, but I still need ${ask}.` },
      { from: "them", text: pick(COUNTER_ROUND_2) },
    ]);
    setPhase("r2");
  }

  function finalOffer() {
    const fn = pick(FINAL_SETTLEMENTS);
    setRounds((r) => [
      ...r,
      { from: "you", text: "This is unacceptable. My final position stands." },
      { from: "them", text: fn(ask) },
    ]);
    setPhase("final");
  }

  function reset() {
    setRounds([]);
    setPhase("idle");
    setAsk("");
  }

  return (
    <div className="gag-container">
      <BriefcaseIcon />
      <span className="gag-label" style={{ color: "#44aaff" }}>Dispute Resolution Office</span>
      <h1 className="gag-heading">The Negotiator</h1>

      {phase === "idle" && (
        <>
          <p className="gag-subtext">What do you want?</p>
          <input
            className="gag-input"
            type="text"
            placeholder="a raise, more sleep, one afternoon off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && openNegotiations()}
            maxLength={80}
          />
          <button className="abyss-btn" onClick={openNegotiations} disabled={!input.trim()}>
            Open Negotiations
          </button>
        </>
      )}

      {rounds.length > 0 && (
        <div style={{ width: "100%", maxWidth: "540px", display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
          {rounds.map((r, i) => (
            <div
              key={i}
              style={{
                alignSelf: r.from === "you" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "0.65rem 1rem",
                borderRadius: "4px",
                fontSize: "0.85rem",
                lineHeight: "1.7",
                background: r.from === "you" ? "var(--card)" : "transparent",
                border: "1px solid var(--border)",
                borderLeft: r.from === "them" ? "3px solid #44aaff" : "1px solid var(--border)",
                color: r.from === "them" ? "#88ccff" : "var(--fg)",
                fontStyle: r.from === "them" ? "italic" : "normal",
              }}
            >
              {r.text}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        {phase === "r1" && (
          <button className="abyss-btn" onClick={counterOffer}>Push Back</button>
        )}
        {phase === "r2" && (
          <button className="abyss-btn" onClick={finalOffer}>Demand Final Offer</button>
        )}
        {phase === "final" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "1rem", fontStyle: "italic" }}>
              Settlement reached. Both parties acknowledge this could have gone better.
            </p>
            <button className="abyss-btn" onClick={reset}>New Negotiation</button>
          </div>
        )}
      </div>
    </div>
  );
}
