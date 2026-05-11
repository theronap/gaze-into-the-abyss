"use client";

import { useState } from "react";

const MILESTONES: [number, string][] = [
  [0, "Click the button."],
  [1, "You clicked it. That's one."],
  [5, "Five. The button expected this."],
  [10, "Ten clicks. You have proven nothing. You continue anyway."],
  [25, "Twenty-five. You are in a rhythm now. The rhythm leads nowhere."],
  [50, "Fifty. Somewhere, someone is having the best day of their life. You are here."],
  [75, "The button has started to feel responsible for you. It didn't ask for this."],
  [100, "One hundred. Round, symmetrical, shaped like an achievement. Not one, technically."],
  [150, "You could stop. You've always been able to stop. Interesting that you haven't."],
  [200, "Two hundred clicks. The button has filed a report. It was classified."],
  [300, "300. At half a second each, that's two and a half minutes. Of this. Specifically."],
  [500, "Five hundred. You have moved through purpose and out the other side."],
  [750, "The button has accepted this is your relationship now."],
  [1000, "One thousand. The void has been fully gazed into. It has submitted a formal complaint."],
  [2000, "Two thousand. The button no longer remembers a time before you. Neither does the void."],
];

function getMessage(count: number): string {
  let msg = MILESTONES[0][1];
  for (const [threshold, text] of MILESTONES) {
    if (count >= threshold) msg = text;
  }
  return msg;
}

function PointerIcon() {
  return (
    <svg viewBox="0 0 56 76" width="50" height="68" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-clicker">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-clicker)" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28,6 Q28,2 24,2 L20,2 Q16,2 16,6 L16,36 Q12,34 10,34 Q6,34 6,38 L6,52 Q6,70 22,70 L34,70 Q50,70 50,52 L50,22 Q50,18 46,18 Q42,18 42,22 L42,18 Q42,14 38,14 Q34,14 34,18 L34,14 Q34,10 30,10 Q28,10 28,12 Z" />
        <line x1="34" y1="18" x2="34" y2="28" opacity="0.4" />
        <line x1="42" y1="22" x2="42" y2="30" opacity="0.4" />
      </g>
    </svg>
  );
}

export default function ExistentialClicker() {
  const [count, setCount] = useState(0);

  return (
    <div className="gag-container">
      <PointerIcon />
      <span className="gag-label" style={{ color: "var(--accent)" }}>Purpose Accumulation Engine</span>
      <h1 className="gag-heading">The Button</h1>
      <div
        style={{
          fontSize: "clamp(4rem, 16vw, 9rem)",
          fontWeight: "900",
          color: "var(--fg)",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          marginBottom: "0.5rem",
        }}
      >
        {count.toLocaleString()}
      </div>
      <button className="abyss-btn" onClick={() => setCount((c) => c + 1)}>
        Click
      </button>
      <div
        className="gag-card"
        style={{
          maxWidth: "420px",
          textAlign: "center",
          fontStyle: "italic",
          fontSize: "0.9rem",
          lineHeight: "1.8",
          marginTop: "0.5rem",
        }}
      >
        {getMessage(count)}
      </div>
    </div>
  );
}
