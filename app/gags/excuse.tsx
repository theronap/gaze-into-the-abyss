"use client";

import { useState } from "react";

const EXCUSES = [
  "Please accept my sincere apologies for the delay. I was in the process of addressing a personal matter of a non-specific but time-sensitive nature which, while now resolved, required my full attention during the window in question. I appreciate your patience and look forward to resuming normal communication cadence.",

  "I regret that my attendance/response/presence was unavailable during the referenced period. A confluence of logistical circumstances, each individually manageable, combined to create a situation that was collectively unmanageable. I have since addressed the root cause. It will not happen again, at this particular frequency.",

  "I want to acknowledge that I was not where I said I would be, and I recognize that this created inconvenience. I have given this matter considerable thought and determined that the responsible path forward is this formal acknowledgment, followed by a reasonable period of improved conduct. I appreciate your understanding in advance.",

  "Due to circumstances beyond my control — and some, frankly, within my control but still difficult — I was unable to fulfill the commitment referenced herein. I do not offer this as an excuse but as context. The distinction is, I am told, meaningful. I remain committed to doing better, starting tomorrow at the latest.",

  "I was unavailable for reasons that felt compelling in the moment and that I acknowledge may not translate adequately to text. What I can confirm is that the unavailability was genuine, the inconvenience was unintended, and my regret is proportional to the significance of the event, which I have been told was significant.",

  "I understand that my absence/lateness/silence raised questions. I would like to address those questions with the following statement: something came up. I recognize this is insufficient. I am in the process of developing more detailed documentation of the situation and will have it ready approximately never, but the intention to have it ready is sincere.",

  "The matter of my delayed response/arrival/completion is one I have reflected on at length. I have identified contributing factors, assessed the impact on all parties, and arrived at the conclusion that an apology is warranted. This is that apology. It is genuine. Please confirm receipt at your earliest convenience.",
];

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 80 60" width="85" height="65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-excuse">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-excuse)">
        <rect x="6" y="8" width="68" height="48" rx="3" fill="none" stroke="#224488" strokeWidth="2.5" />
        <path d="M6,8 L40,34 L74,8" fill="none" stroke="#224488" strokeWidth="2" strokeLinejoin="round" />
        <line x1="6" y1="56" x2="30" y2="34" stroke="#224488" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="74" y1="56" x2="50" y2="34" stroke="#224488" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Excuse() {
  const [excuse, setExcuse] = useState<string | null>(null);

  function generate() {
    setExcuse(EXCUSES[Math.floor(Math.random() * EXCUSES.length)]);
  }

  return (
    <div className="gag-container" style={{ fontFamily: "Georgia, serif" }}>
      <EnvelopeIcon />
      <span className="gag-label" style={{ color: "#224488" }}>Professional Communications Office</span>
      <h1 className="gag-heading">Today&apos;s Excuse</h1>

      {excuse === null ? (
        <>
          <p className="gag-subtext">
            One click. A complete, formally worded explanation
            <br />for whatever it is you failed to do.
          </p>
          <button className="abyss-btn" onClick={generate}>Generate Excuse</button>
        </>
      ) : (
        <>
          <div
            className="gag-card"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: "1.9", fontSize: "0.92rem", borderLeft: "3px solid #224488" }}
          >
            {excuse}
          </div>
          <button className="abyss-btn" onClick={generate}>Generate Another</button>
          <p style={{ fontSize: "0.7rem", color: "var(--muted)", fontStyle: "italic" }}>
            For personal use only. This machine accepts no liability.
          </p>
        </>
      )}
    </div>
  );
}
