"use client";

import { useState } from "react";

const APOLOGIES = [
  (thing: string) => `I, the undersigned party, do hereby formally and without reservation express my sincere regret regarding the matter of "${thing}," hereinafter referred to as The Incident. My actions constituted a lapse in judgment that I neither excuse nor minimize. I acknowledge the impact of The Incident upon all affected parties, including those present, those adjacent, and those who heard about it secondhand and formed opinions. I am committed to a period of reflection and improved conduct going forward, and I request your consideration in the spirit of moving forward collaboratively and in good faith. Signed under duress of conscience.`,

  (thing: string) => `Please accept this communication as formal acknowledgment of my role in the events surrounding "${thing}." I recognize that my behavior fell below the standard reasonably expected of a person in my position, and I offer this apology not as an excuse but as a sincere expression of accountability. I am aware that words are insufficient. I am offering them anyway, as they are what I currently have. Additional gestures of contrition may follow pending your feedback.`,

  (thing: string) => `To Whom It May Concern Regarding "${thing}": I am writing to formally apologize. The incident in question reflects poorly on my judgment, my character, and my capacity to read a room. I offer no defense, no context, and no mitigating narrative — only the acknowledgment that it happened, that I was responsible, and that I am aware of how it reflects on me. I have consulted several people about appropriate next steps. This letter is the result. Please confirm receipt at your earliest convenience.`,

  (thing: string) => `This letter constitutes a formal and binding apology for the matter of "${thing}." I understand that an apology is not an erasure of events but an acknowledgment of them. I am acknowledging. I am sorry. I am prepared to be sorry for a reasonable period of time, as defined by you, the aggrieved party. If further sorry-ness is required beyond that period, we may revisit this agreement. Terms negotiable.`,

  (thing: string) => `Re: "${thing}" — I want to begin by taking full responsibility. Not partial responsibility, not shared responsibility, not circumstantially mitigated responsibility. Full. I was there. I made choices. The choices produced the outcome. The outcome is the reason you are reading this letter. I am sorry for the outcome. I am working on the choices. The being-there part is harder to address but I am open to suggestions.`,
];

function ScrollIcon() {
  return (
    <svg viewBox="0 0 70 80" width="65" height="75" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-apology">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-apology)">
        <rect x="12" y="10" width="46" height="60" rx="2" fill="#ede4cc" stroke="#7a5c2a" strokeWidth="2" />
        <line x1="20" y1="24" x2="52" y2="24" stroke="#aa8855" strokeWidth="1.5" />
        <line x1="20" y1="33" x2="52" y2="33" stroke="#aa8855" strokeWidth="1.5" />
        <line x1="20" y1="42" x2="52" y2="42" stroke="#aa8855" strokeWidth="1.5" />
        <line x1="20" y1="51" x2="40" y2="51" stroke="#aa8855" strokeWidth="1.5" />
        <ellipse cx="35" cy="10" rx="12" ry="5" fill="#ede4cc" stroke="#7a5c2a" strokeWidth="2" />
        <ellipse cx="35" cy="70" rx="12" ry="5" fill="#ede4cc" stroke="#7a5c2a" strokeWidth="2" />
        <path d="M44,54 Q54,46 50,64 Q42,68 44,54 Z" fill="#7a5c2a" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function Apology() {
  const [input, setInput] = useState("");
  const [apology, setApology] = useState<string | null>(null);

  function generate() {
    if (!input.trim()) return;
    const template = APOLOGIES[Math.floor(Math.random() * APOLOGIES.length)];
    setApology(template(input.trim()));
  }

  function reset() {
    setInput("");
    setApology(null);
  }

  return (
    <div className="gag-container" style={{ fontFamily: "Georgia, serif" }}>
      <ScrollIcon />
      <span className="gag-label">Formal Correspondence Services</span>
      <h1 className="gag-heading">The Apology Generator</h1>

      {apology === null ? (
        <>
          <p className="gag-subtext">
            Enter what you did. Receive a legally non-binding but emotionally comprehensive apology.
          </p>
          <input
            className="gag-input"
            type="text"
            placeholder="forgot to reply for 3 weeks"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            maxLength={80}
            style={{ fontFamily: "Georgia, serif" }}
          />
          <button className="abyss-btn" onClick={generate} disabled={!input.trim()}>
            Generate Apology
          </button>
        </>
      ) : (
        <>
          <div
            className="gag-card"
            style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", lineHeight: "1.9", fontStyle: "italic", borderLeft: "3px solid #7a5c2a" }}
          >
            {apology}
          </div>
          <button className="abyss-btn" onClick={generate}>Generate Another</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            Apologize for something else
          </button>
        </>
      )}
    </div>
  );
}
