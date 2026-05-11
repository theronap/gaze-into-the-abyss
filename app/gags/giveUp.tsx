"use client";

import { useState } from "react";

const TIMELINES = [
  (task: string) => `"${task}": You will begin with genuine enthusiasm and the purchasing of supplies you do not yet know how to use. By day 3, the initial momentum will plateau. By day 6, the project will migrate from the desk to a shelf. By day 12, it will be somewhere you cannot currently locate. Estimated time to abandonment: 8 days.`,

  (task: string) => `"${task}": You will open it, feel briefly good about having opened it, and close it to do something easier first. The easier thing will take longer than expected. You will revisit ${task} at a time when you are already tired. Estimated time to abandonment: the second time it gets hard.`,

  (task: string) => `"${task}": Initial phase — research. You will spend more time researching the task than doing it. This is normal. The research will be interesting. The task itself will be less interesting than the research suggested. Estimated time to abandonment: 4-6 hours after the research ends.`,

  (task: string) => `"${task}": You will tell someone about this plan. Telling someone about it will provide 40% of the satisfaction of completing it, without the effort. This will reduce your motivation. Estimated time to abandonment: shortly after you mention it to someone for the second time.`,

  (task: string) => `"${task}": You will work on it in two excellent sessions. In the third session, you will encounter a setback. The setback will be solvable. You will not solve it that day. You will not return to it for 11 days. You will not return to it at all. Estimated time to abandonment: session three.`,

  (task: string) => `"${task}": You will succeed. Briefly. You will reach a point where you need to decide whether to continue or call it done. You will call it done prematurely, feel satisfied, and never return. The task technically remains unfinished. You will tell people it is finished. Estimated time to quasi-abandonment: sooner than you think.`,

  (task: string) => `"${task}": You will lose momentum not because the task becomes hard, but because something more interesting appears nearby. This is not a failure of character. It is a predictable feature of how human attention works. You are not broken. You are distracted. Estimated time to abandonment: the moment something else appears.`,
];

function HourglassIcon() {
  return (
    <svg viewBox="0 0 50 80" width="50" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-giveup">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-giveup)">
        <line x1="8" y1="8" x2="42" y2="8" stroke="#00e8d4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="72" x2="42" y2="72" stroke="#00e8d4" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10,8 L25,40 L10,72" fill="none" stroke="#00e8d4" strokeWidth="2" strokeLinejoin="round" />
        <path d="M40,8 L25,40 L40,72" fill="none" stroke="#00e8d4" strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="25" cy="20" rx="10" ry="6" fill="#00e8d4" opacity="0.3" />
        <line x1="25" y1="40" x2="25" y2="60" stroke="#00e8d4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="25" cy="60" r="3" fill="#00e8d4" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function GiveUp() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    if (!input.trim()) return;
    const template = TIMELINES[Math.floor(Math.random() * TIMELINES.length)];
    setResult(template(input.trim()));
  }

  function reset() {
    setInput("");
    setResult(null);
  }

  return (
    <div className="gag-container" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
      <HourglassIcon />
      <span className="gag-label" style={{ color: "#00e8d4" }}>Perseverance Analytics Engine</span>
      <h1 className="gag-heading">How Long Until I Give Up?</h1>

      {result === null ? (
        <>
          <p className="gag-subtext" style={{ color: "#00aa99" }}>
            Enter any task or goal. Receive an honest timeline.
          </p>
          <input
            className="gag-input"
            type="text"
            placeholder="learning guitar"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            maxLength={80}
            style={{ fontFamily: "monospace" }}
          />
          <button className="abyss-btn" onClick={calculate} disabled={!input.trim()}>
            Calculate
          </button>
        </>
      ) : (
        <>
          <div className="gag-card" style={{ fontFamily: "monospace", borderColor: "#003830", color: "#99ffee", fontSize: "0.9rem", lineHeight: "1.9" }}>
            {result}
          </div>
          <button className="abyss-btn" onClick={calculate}>Recalculate</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "monospace" }}>
            Try a different task
          </button>
        </>
      )}
    </div>
  );
}
