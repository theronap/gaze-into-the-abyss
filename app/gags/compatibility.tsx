"use client";

import { useState, useEffect } from "react";

const PERCENTAGES = [7, 14, 23, 31, 38, 44, 51, 62, 67, 73, 81, 88, 94, 97, 3, 19];

const REASONS = [
  (a: string, b: string) => `${a} has a dominant Mercury placement that directly conflicts with ${b}'s approach to loading the dishwasher.`,
  (a: string, b: string) => `Both ${a} and ${b} believe they are the reasonable one in arguments. This is statistically unsustainable.`,
  (a: string, b: string) => `${b} will, at some point, breathe too loudly in ${a}'s presence. The data does not suggest recovery.`,
  (a: string, b: string) => `${a} and ${b} share a fundamental misalignment around what constitutes 'being ready to leave.'`,
  (a: string, b: string) => `${b}'s energy is primarily afternoon-based. ${a}'s is evening-based. This gap is larger than it sounds.`,
  (a: string, b: string) => `Both ${a} and ${b} say 'I don't care, you pick' and then do, in fact, care.`,
  (a: string, b: string) => `${a} will send ${b} a meme that doesn't land. The relationship will technically survive but something will shift.`,
  (a: string, b: string) => `${b} has a playlist that ${a} will not understand. This will come up.`,
  (a: string, b: string) => `${a} and ${b} are compatible in the way that most things are compatible — until they aren't.`,
  (a: string, b: string) => `The analysis detected that ${a} types with two spaces after a period. ${b} does not. This is irreconcilable.`,
  (a: string, b: string) => `${b} will want to leave the party 20 minutes before ${a} is ready to leave. Every time. Without exception.`,
  (a: string, b: string) => `Both ${a} and ${b} are doing their best. This is both reassuring and statistically unhelpful.`,
];

const METRICS = [
  "Scanning aura compatibility...",
  "Cross-referencing childhood dinner table energy...",
  "Analyzing attachment style residue...",
  "Measuring snack-based conflict potential...",
  "Querying the Mercury retrograde archive...",
  "Calculating playlist overlap index...",
  "Assessing simultaneous talking frequency...",
  "Running 'they're fine' suppression test...",
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 80 72" width="76" height="68" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-compat">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-compat)" stroke="#ff2266" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40,62 Q6,44 6,22 Q6,8 18,8 Q28,8 40,22 Q52,8 62,8 Q74,8 74,22 Q74,44 40,62 Z" />
        <path d="M24,28 Q28,16 36,20" opacity="0.4" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function Compatibility() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "result">("idle");
  const [metricIdx, setMetricIdx] = useState(0);
  const [result, setResult] = useState<{ pct: number; reason: string } | null>(null);

  useEffect(() => {
    if (phase !== "loading") return;
    const shuffled = [...METRICS].sort(() => Math.random() - 0.5);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setMetricIdx(i % shuffled.length);
      if (i >= shuffled.length) {
        clearInterval(t);
        const pct = PERCENTAGES[Math.floor(Math.random() * PERCENTAGES.length)];
        const reasonFn = REASONS[Math.floor(Math.random() * REASONS.length)];
        setResult({ pct, reason: reasonFn(nameA, nameB) });
        setPhase("result");
      }
    }, 600);
    return () => clearInterval(t);
  }, [phase, nameA, nameB]);

  function analyze() {
    if (!nameA.trim() || !nameB.trim()) return;
    setMetricIdx(0);
    setResult(null);
    setPhase("loading");
  }

  function reset() {
    setNameA("");
    setNameB("");
    setPhase("idle");
    setResult(null);
  }

  return (
    <div className="gag-container">
      <HeartIcon />
      <span className="gag-label" style={{ color: "#ff2266" }}>Interpersonal Analytics Division</span>
      <h1 className="gag-heading">Compatibility Report</h1>

      {phase === "idle" && (
        <>
          <p className="gag-subtext">Enter two names. Receive the truth.</p>
          <div style={{ display: "flex", gap: "0.75rem", width: "100%", maxWidth: "440px" }}>
            <input
              className="gag-input"
              type="text"
              placeholder="First name"
              value={nameA}
              onChange={(e) => setNameA(e.target.value)}
              style={{ flex: 1 }}
              maxLength={40}
            />
            <input
              className="gag-input"
              type="text"
              placeholder="Second name"
              value={nameB}
              onChange={(e) => setNameB(e.target.value)}
              style={{ flex: 1 }}
              maxLength={40}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
            />
          </div>
          <button className="abyss-btn" onClick={analyze} disabled={!nameA.trim() || !nameB.trim()}>
            Analyze
          </button>
        </>
      )}

      {phase === "loading" && (
        <div style={{ textAlign: "center", color: "var(--muted)", fontStyle: "italic", marginTop: "1rem" }}>
          <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>{METRICS[metricIdx]}</p>
          <div style={{ width: "200px", height: "3px", background: "var(--border)", margin: "0 auto", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: "#ff2266",
                width: `${((metricIdx + 1) / METRICS.length) * 100}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      )}

      {phase === "result" && result && (
        <>
          <div style={{ fontSize: "clamp(3rem, 10vw, 6rem)", fontWeight: "900", color: "#ff2266", lineHeight: 1 }}>
            {result.pct}%
          </div>
          <div className="gag-card" style={{ borderColor: "#330022", maxWidth: "480px", fontStyle: "italic", lineHeight: "1.8" }}>
            {result.reason}
          </div>
          <button className="abyss-btn" onClick={analyze}>Re-Analyze</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            Different people
          </button>
        </>
      )}
    </div>
  );
}
