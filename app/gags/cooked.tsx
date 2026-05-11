"use client";

import { useState } from "react";

const METRICS = [
  "Reviewing recent decisions...",
  "Analyzing workplace standing...",
  "Auditing the last 90 days...",
  "Consulting available tea leaves...",
  "Cross-referencing the group chat...",
  "Evaluating your most recent email tone...",
  "Scanning for exit opportunities...",
  "Reviewing your facial expressions in the last meeting...",
];

const FINDINGS = [
  "You described a core responsibility as 'not really my job' in a meeting that was recorded.",
  "You were added to a calendar invite titled 'Quick Sync' with no agenda and 8 attendees. This is never quick.",
  "Your last performance review contained the phrase 'growing into the role.' You have been in the role for three years.",
  "Someone senior has started CC'ing you on your own work as if to establish a paper trail.",
  "You have sent a message to the wrong group chat. You know which one.",
  "You referred to a project as 'pretty much done' approximately four times before it was done.",
  "Your manager's manager nodded slowly at something you said. Not the good kind of slowly.",
  "You were not invited to a meeting about a thing you are responsible for. The decision was made without you.",
  "You said 'circle back' unironically in a context where it was not warranted.",
  "Your enthusiasm in onboarding has been described as a 'high bar' that you are no longer consistently clearing.",
  "You have been 'looped in' rather than 'included from the start' on four separate occasions this quarter.",
  "You have sent a message that ended with 'let me know if you have questions' to someone who clearly had questions and did not ask them.",
];

function ThermometerIcon() {
  return (
    <svg viewBox="0 0 40 80" width="40" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-cooked">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-cooked)">
        <rect x="16" y="6" width="8" height="46" rx="4" fill="none" stroke="#6677ff" strokeWidth="2" />
        <rect x="18" y="28" width="4" height="24" rx="2" fill="#6677ff" />
        <circle cx="20" cy="62" r="10" fill="none" stroke="#6677ff" strokeWidth="2.5" />
        <circle cx="20" cy="62" r="6" fill="#6677ff" />
        <line x1="26" y1="14" x2="30" y2="14" stroke="#6677ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="22" x2="30" y2="22" stroke="#6677ff" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Cooked() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [visibleMetrics, setVisibleMetrics] = useState(0);
  const [finding, setFinding] = useState("");

  function diagnose() {
    setPhase("loading");
    setVisibleMetrics(0);
    const selectedFinding = FINDINGS[Math.floor(Math.random() * FINDINGS.length)];
    METRICS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleMetrics(i + 1);
        if (i === METRICS.length - 1) {
          setTimeout(() => {
            setFinding(selectedFinding);
            setPhase("done");
          }, 500);
        }
      }, i * 500);
    });
  }

  function reset() {
    setPhase("idle");
    setVisibleMetrics(0);
    setFinding("");
  }

  return (
    <div className="gag-container">
      <ThermometerIcon />
      <span className="gag-label" style={{ color: "#6677ff" }}>Professional Vitality Assessment</span>
      <h1 className="gag-heading">Am I Cooked?</h1>

      {phase === "idle" && (
        <>
          <p className="gag-subtext">
            A comprehensive diagnostic of your current standing.
            Results are confidential. Results are also bad.
          </p>
          <button className="abyss-btn" onClick={diagnose}>Run Diagnostics</button>
        </>
      )}

      {phase === "loading" && (
        <div className="loading-steps" style={{ color: "#6677ff" }}>
          {METRICS.slice(0, visibleMetrics).map((m, i) => (
            <div key={i} className="loading-step">
              <span style={{ color: "#6677ff" }}>▸</span> {m}
            </div>
          ))}
        </div>
      )}

      {phase === "done" && (
        <>
          <div className="gag-answer">Cooked.</div>
          <div className="gag-card" style={{ borderColor: "#222640" }}>{finding}</div>
          <button className="abyss-btn" onClick={diagnose}>Re-Run Diagnostics</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            I demand a second opinion
          </button>
        </>
      )}
    </div>
  );
}
