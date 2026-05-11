"use client";

import { useState } from "react";

const DURATIONS = [17, 22, 26, 34, 43, 19, 28, 31, 47, 23];
const WINDOWS = ["12:14 PM", "1:07 PM", "2:33 PM", "11:48 AM", "3:19 PM", "12:52 PM", "2:06 PM", "1:41 PM"];
const ALERTNESS = ["+14%", "+22%", "+9%", "+31%", "+18%", "+26%", "+11%", "+38%"];
const OVERSHOOT_RISK = ["moderate (41%)", "low (17%)", "elevated (63%)", "moderate (38%)", "high (72%)", "low (22%)", "moderate (44%)", "elevated (58%)"];
const TASK_VERDICTS = [
  "survivable, but not today",
  "manageable with sufficient delay",
  "completable in theory",
  "technically possible after sufficient rest",
  "viable if approached correctly, which you won't",
  "doable, eventually",
  "within normal difficulty parameters",
  "possible. Not advisable. Possible.",
];
const NOTES = [
  "Subject demonstrated awareness of task. This is the first step. No further steps were observed.",
  "Optimal nap window identified. Subject is advised not to check phone during nap. Subject will check phone during nap.",
  "Risk of nap extending to 2.5 hours assessed and accepted as inherent to the human condition.",
  "Task difficulty has been reviewed. The nap is recommended regardless of task difficulty.",
  "Post-nap motivation surge projected at 6–9 minutes before returning to baseline.",
  "All projections assume subject does not lie awake mentally reviewing past decisions for 40 minutes first.",
];

function MoonIcon() {
  return (
    <svg viewBox="0 0 60 70" width="55" height="65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-nap">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-nap)" stroke="#0066cc" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M38,8 Q14,14 14,36 Q14,58 38,62 Q16,62 8,44 Q2,28 12,14 Q20,4 38,8 Z" />
        <line x1="44" y1="12" x2="44" y2="18" strokeWidth="2" />
        <line x1="50" y1="22" x2="56" y2="22" strokeWidth="2" />
        <line x1="46" y1="30" x2="50" y2="34" strokeWidth="2" />
      </g>
    </svg>
  );
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function NapOptimizer() {
  const [input, setInput] = useState("");
  const [report, setReport] = useState<{
    duration: number; window: string; alertness: string; risk: string; verdict: string; note: string;
  } | null>(null);

  function optimize() {
    if (!input.trim()) return;
    setReport({
      duration: pick(DURATIONS),
      window: pick(WINDOWS),
      alertness: pick(ALERTNESS),
      risk: pick(OVERSHOOT_RISK),
      verdict: pick(TASK_VERDICTS),
      note: pick(NOTES),
    });
  }

  function reset() {
    setInput("");
    setReport(null);
  }

  return (
    <div className="gag-container">
      <MoonIcon />
      <span className="gag-label" style={{ color: "#0066cc" }}>Restorative Delay Sciences</span>
      <h1 className="gag-heading">Nap Optimizer</h1>

      {report === null ? (
        <>
          <p className="gag-subtext">
            Enter what you need to do this afternoon.
            <br />Receive a clinically optimal nap plan.
          </p>
          <input
            className="gag-input"
            type="text"
            placeholder="respond to emails, finish the thing"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && optimize()}
            maxLength={100}
            style={{ color: "#0a2040" }}
          />
          <button className="abyss-btn" onClick={optimize} disabled={!input.trim()}>
            Optimize
          </button>
        </>
      ) : (
        <>
          <div
            className="gag-card"
            style={{
              maxWidth: "480px",
              width: "100%",
              fontFamily: "monospace",
              fontSize: "0.82rem",
              lineHeight: "2",
              borderColor: "#b8d4ee",
              borderLeft: "3px solid #0066cc",
            }}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0066cc", marginBottom: "0.75rem" }}>
              NAP OPTIMIZATION REPORT — {new Date().toLocaleDateString()}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 1rem" }}>
              <span style={{ color: "#6688aa" }}>Task:</span>
              <span style={{ fontStyle: "italic" }}>&ldquo;{input}&rdquo;</span>
              <span style={{ color: "#6688aa" }}>Rec. Duration:</span>
              <span style={{ fontWeight: "bold", color: "#0055dd" }}>{report.duration} minutes</span>
              <span style={{ color: "#6688aa" }}>Optimal Window:</span>
              <span>{report.window}</span>
              <span style={{ color: "#6688aa" }}>Alertness Gain:</span>
              <span>{report.alertness} (projected)</span>
              <span style={{ color: "#6688aa" }}>Overshoot Risk:</span>
              <span>{report.risk}</span>
              <span style={{ color: "#6688aa" }}>Task Viability:</span>
              <span style={{ fontStyle: "italic" }}>{report.verdict}</span>
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#6688aa", borderTop: "1px solid #b8d4ee", paddingTop: "0.75rem", fontStyle: "italic" }}>
              Note: {report.note}
            </p>
          </div>
          <button className="abyss-btn" onClick={optimize}>Re-Optimize</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "#6688aa", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            Different task
          </button>
        </>
      )}
    </div>
  );
}
