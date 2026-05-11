"use client";

import { useState, useRef } from "react";

const REEL_A = ["Last night", "Last week", "That Tuesday", "Three months ago", "Just now", "Last year"];
const REEL_B = ["texted the ex", "skipped the gym", "said 'I'll start Monday'", "bought a thing", "sent it anyway", "ignored the deadline"];
const REEL_C = ["worth it", "not worth it", "unclear", "still happening", "hard to say", "between these two"];

const VERDICTS: Record<string, string> = {
  "worth it": "The machine acknowledges this. It does not endorse it.",
  "not worth it": "The machine has noted this for the record. The record changes nothing.",
  "unclear": "The analysis is inconclusive. A follow-up may be needed in approximately five years.",
  "still happening": "The machine has flagged this as an ongoing situation. Resolution is not projected.",
  "hard to say": "Ambiguous outcomes are the machine's specialty. This is one of those.",
  "between these two": "The machine cannot locate a third option. This is the closest available truth.",
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function SlotIcon() {
  return (
    <svg viewBox="0 0 80 72" width="76" height="68" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-slot">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-slot)" stroke="#cc0033" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="68" height="50" rx="4" />
        <rect x="14" y="24" width="16" height="24" rx="2" />
        <rect x="32" y="24" width="16" height="24" rx="2" />
        <rect x="50" y="24" width="16" height="24" rx="2" />
        <line x1="6" y1="36" x2="74" y2="36" opacity="0.3" />
        <path d="M68,4 L68,14 M64,4 L72,4" />
        <rect x="24" y="58" width="32" height="8" rx="3" />
      </g>
    </svg>
  );
}

export default function SlotMachine() {
  const [phase, setPhase] = useState<"idle" | "spinning" | "result">("idle");
  const [reels, setReels] = useState(["?", "?", "?"]);
  const [spinCount, setSpinCount] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function getCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function playClick() {
    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") ctx.resume();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buf;
      src.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      src.start();
    } catch (_) {}
  }

  function playLand() {
    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.2);
      osc.type = "sine";
      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch (_) {}
  }

  function pull() {
    if (phase === "spinning") return;
    const finalA = pick(REEL_A);
    const finalB = pick(REEL_B);
    const finalC = pick(REEL_C);

    setPhase("spinning");
    setReels(["...", "...", "..."]);
    setSpinCount((c) => c + 1);

    // Spin with clicks
    let clicks = 0;
    const clickInterval = setInterval(() => {
      playClick();
      setReels([pick(REEL_A), pick(REEL_B), pick(REEL_C)]);
      clicks++;
      if (clicks >= 14) {
        clearInterval(clickInterval);
        // Land reels one by one
        setTimeout(() => { playLand(); setReels([finalA, "...", "..."]); }, 100);
        setTimeout(() => { playLand(); setReels([finalA, finalB, "..."]); }, 500);
        setTimeout(() => { playLand(); setReels([finalA, finalB, finalC]); setPhase("result"); }, 900);
      }
    }, 100);
  }

  return (
    <div className="gag-container">
      <SlotIcon />
      <span className="gag-label" style={{ color: "#cc0033" }}>Regret Randomization Engine</span>
      <h1 className="gag-heading">Slot Machine of Regrets</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.5rem",
          width: "100%",
          maxWidth: "560px",
          margin: "1rem 0",
        }}
      >
        {reels.map((val, i) => (
          <div
            key={i}
            className="gag-card"
            style={{
              textAlign: "center",
              padding: "1rem 0.5rem",
              fontSize: "0.75rem",
              lineHeight: "1.5",
              minHeight: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderColor: phase === "result" ? "#cc0033" : "var(--border)",
              transition: "border-color 0.3s",
              color: phase === "spinning" ? "var(--muted)" : "#ffd700",
              fontStyle: "italic",
            }}
          >
            {val}
          </div>
        ))}
      </div>

      <button className="abyss-btn" onClick={pull} disabled={phase === "spinning"}>
        {phase === "spinning" ? "Spinning..." : spinCount === 0 ? "Pull Lever" : "Pull Again"}
      </button>

      {phase === "result" && (
        <div
          className="gag-card"
          style={{
            maxWidth: "480px",
            textAlign: "center",
            borderColor: "#330011",
            fontStyle: "italic",
            fontSize: "0.875rem",
            lineHeight: "1.8",
            marginTop: "0.5rem",
          }}
        >
          {VERDICTS[reels[2]] ?? "The machine has rendered its verdict."}
        </div>
      )}
    </div>
  );
}
