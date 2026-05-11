"use client";

import { useState } from "react";

const ANALYSES = [
  "The message has waited this long. It can wait until tomorrow, when you will be marginally more equipped to engage with whatever it contains. Responding now, in your current state, is not in anyone's interest.",
  "The perceived urgency of a message is rarely equal to its actual urgency. Examine the evidence: has anything required your reply yet? No. Tomorrow remains viable.",
  "A reply sent now would reflect the version of you that exists at this hour, with this energy level, in this mood. That version is not your best representative. Tomorrow has a better version available.",
  "Consider: what do you actually want to say? You don't know yet. That's the whole problem. Tomorrow you might know, or you'll have a cleaner approximation of not knowing.",
  "The message will still be there tomorrow. So will you. The gap between you is currently too large to close responsibly. Give it time.",
  "You have been composing a response internally for some time. It is not ready. You can feel that it is not ready. Sending the unready version will require a follow-up. Wait for the ready version. Tomorrow.",
  "There is a meaningful difference between 'I will reply tomorrow' and 'I forgot to reply.' You are choosing the former. This is responsible behavior. Tomorrow.",
  "This situation requires a response, not a reaction. You are currently positioned to react. Sleep is the mechanism that converts reactions into responses. Use the mechanism.",
  "The person who sent this message also has a tomorrow. They are probably in it. They are probably fine. Reply when you can do it well.",
  "Whatever this message contains — good news, bad news, logistics, conflict — your reply will be better tomorrow. This is statistically reliable. Tomorrow.",
];

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 80 70" width="80" height="70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-reply">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-reply)">
        <path d="M8,8 Q8,4 12,4 L68,4 Q72,4 72,8 L72,46 Q72,50 68,50 L28,50 L14,64 L14,50 L12,50 Q8,50 8,46 Z"
          fill="none" stroke="#58a6ff" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="22" y1="20" x2="58" y2="20" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="22" y1="30" x2="48" y2="30" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function Reply() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function analyze() {
    if (!input.trim()) return;
    setResult(ANALYSES[Math.floor(Math.random() * ANALYSES.length)]);
  }

  function reset() {
    setInput("");
    setResult(null);
  }

  return (
    <div className="gag-container">
      <ChatBubbleIcon />
      <span className="gag-label" style={{ color: "#58a6ff" }}>Response Timing Analysis</span>
      <h1 className="gag-heading">Should I Reply?</h1>

      {result === null ? (
        <>
          <p className="gag-subtext">
            Describe the message situation.
            <br />Receive a professional assessment.
          </p>
          <input
            className="gag-input"
            type="text"
            placeholder="They asked how I'm doing but it feels weighted"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            maxLength={120}
          />
          <button className="abyss-btn" onClick={analyze} disabled={!input.trim()}>
            Analyze
          </button>
        </>
      ) : (
        <>
          <div className="gag-answer" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>Tomorrow.</div>
          <div className="gag-card" style={{ borderColor: "#21262d" }}>{result}</div>
          <button className="abyss-btn" onClick={analyze}>Re-Analyze</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            Different message
          </button>
        </>
      )}
    </div>
  );
}
