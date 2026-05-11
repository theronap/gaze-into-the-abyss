"use client";

import { useState } from "react";

const FINDINGS = [
  "The follow-up behavior is almost always more revealing than the initial incident. This is more revealing.",
  "On a scale from 'yellow flag' to 'evacuate the building,' this registers closer to the latter.",
  "Healthy relationships do not typically require this level of forensic analysis to decode.",
  "You know this is a red flag. That is why you are asking a website.",
  "The optimistic reading of this situation requires assumptions the evidence does not support.",
  "Multiple flags detected. They are red.",
  "A reasonable person, presented with this information, would describe it as 'concerning.'",
  "This behavior pattern has a known trajectory. The destination is not good.",
  "The fact that you can explain it away does not mean you should.",
  "Your instincts flagged this before you finished typing. Trust your instincts.",
  "This is not the first time something like this has happened. That is the flag.",
  "People who are not red flags do not regularly prompt the question of whether they are red flags.",
  "The situation contains what analysts call 'elevated ambiguity with downside risk.'",
  "A temporary excuse does not address a permanent pattern.",
  "You described this as 'probably nothing.' It is not probably nothing.",
  "The minimum concerning interpretation of this situation is still concerning.",
  "This machine has processed 40,000 flag assessments. This is a flag.",
  "The flag is not about what happened. It is about what the response to it reveals.",
  "You would advise a friend to leave. Apply that advice.",
  "Significant red flag. Confidence: high.",
];

const SEVERITY = ["ELEVATED", "SEVERE", "CRITICAL", "SIGNIFICANT", "SEVERE", "CRITICAL"];

function WarningIcon() {
  return (
    <svg viewBox="0 0 80 72" width="80" height="72" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-redflag">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-redflag)">
        <path d="M40,6 L74,66 L6,66 Z" fill="none" stroke="#ffcc00" strokeWidth="3" strokeLinejoin="round" />
        <line x1="40" y1="26" x2="40" y2="46" stroke="#ffcc00" strokeWidth="4" strokeLinecap="round" />
        <circle cx="40" cy="56" r="3" fill="#ffcc00" />
      </g>
    </svg>
  );
}

export default function RedFlag() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ finding: string; severity: string } | null>(null);

  function analyze() {
    if (!input.trim()) return;
    setResult({
      finding: FINDINGS[Math.floor(Math.random() * FINDINGS.length)],
      severity: SEVERITY[Math.floor(Math.random() * SEVERITY.length)],
    });
  }

  function reset() {
    setInput("");
    setResult(null);
  }

  return (
    <div className="gag-container">
      <WarningIcon />
      <span className="gag-label" style={{ color: "#ffcc00" }}>Behavioral Threat Assessment</span>
      <h1 className="gag-heading">Is This a Red Flag?</h1>

      {result === null ? (
        <>
          <p className="gag-subtext" style={{ color: "#999900" }}>
            Describe the situation. Receive an objective assessment.
          </p>
          <input
            className="gag-input"
            type="text"
            placeholder="They always cancel last minute but..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            maxLength={140}
          />
          <button className="abyss-btn" onClick={analyze} disabled={!input.trim()}>
            Analyze
          </button>
        </>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#ffcc00" }}>THREAT LEVEL</div>
            <div style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", fontWeight: "900", color: "#ff4422", letterSpacing: "0.1em" }}>
              {result.severity}
            </div>
          </div>
          <div className="gag-answer" style={{ fontSize: "clamp(2rem, 7vw, 4rem)" }}>Yes.</div>
          <div className="gag-card" style={{ borderColor: "#ff4422", borderWidth: "1px" }}>
            {result.finding}
          </div>
          <button className="abyss-btn" onClick={analyze}>Analyze Again</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            Submit different situation
          </button>
        </>
      )}
    </div>
  );
}
