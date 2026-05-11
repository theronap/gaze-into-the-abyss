"use client";

import { useState } from "react";

const REASONS = [
  "Your texts are 94% shorter than the average person's responses to you.",
  "You have rescheduled plans three times in the past month and called it 'self-care.'",
  "You said 'we should hang out sometime' and meant it as a farewell.",
  "You responded to 'are you okay?' with 'lol yeah why.'",
  "Your Spotify listening history is a cry for help that no one has addressed.",
  "You have rehearsed arguments with people who don't know you're upset.",
  "You have eaten an entire meal over the sink and felt fine about it.",
  "Your most recent apology contained the phrase 'but to be fair.'",
  "You told someone 'no worries' when you were, in fact, full of worries.",
  "You have sent a 'haha' as a response to something that required real words.",
  "You have 'fixed' a recurring problem by waiting for someone else to fix it.",
  "The number of group chats you have muted exceeds the number you have not.",
  "You have explained your side of a situation to your pet in considerable detail.",
  "You have walked past a mess you created three times without addressing it.",
  "Your most common form of apology is changing the subject.",
  "You have replied 'sounds good' to a message you did not fully read.",
  "You have described yourself as 'bad at texting' while being visibly online.",
  "You have cancelled plans due to 'not feeling up to it' and then watched TV for four hours.",
  "You have responded to direct feedback with a personal anecdote that made it about you.",
  "Your internal monologue has filed formal complaints about people you have said nothing to.",
  "You have described a recurring conflict as something that 'just happens sometimes.'",
  "You have said 'I'm fine' at a volume and with a tone that means the opposite.",
  "At least one person in your life has described you as 'a lot.' They were being generous.",
  "You have spent significant energy crafting a message that communicates exactly nothing.",
  "You already knew this.",
];

function MagnifyingGlass() {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-problem">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-problem)">
        <circle cx="30" cy="30" r="22" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="30" cy="30" r="13" fill="none" stroke="#b52a2a" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x="30" y="36" textAnchor="middle" fontSize="18" fill="#b52a2a" fontWeight="bold" fontFamily="Georgia, serif">?</text>
        <line x1="47" y1="47" x2="70" y2="72" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="47" y1="47" x2="70" y2="72" stroke="#555" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Problem() {
  const [phase, setPhase] = useState<"idle" | "thinking" | "done">("idle");
  const [reason, setReason] = useState("");

  function analyze() {
    setPhase("thinking");
    setTimeout(() => {
      setReason(REASONS[Math.floor(Math.random() * REASONS.length)]);
      setPhase("done");
    }, 1800);
  }

  function reset() {
    setPhase("idle");
    setReason("");
  }

  return (
    <div
      className="gag-container"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <MagnifyingGlass />
      <span className="gag-label">Behavioral Assessment — Form 7C</span>
      <h1 className="gag-heading">Am I the Problem?</h1>

      {phase === "idle" && (
        <>
          <p className="gag-subtext">
            A rigorous algorithmic assessment of your personal accountability.
            Results are binding.
          </p>
          <button className="abyss-btn" onClick={analyze}>
            Analyze Me
          </button>
        </>
      )}

      {phase === "thinking" && (
        <p className="gag-subtext" style={{ fontStyle: "normal", letterSpacing: "0.05em" }}>
          Reviewing behavioral record&hellip;
        </p>
      )}

      {phase === "done" && (
        <>
          <div
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: "900",
              color: "#b52a2a",
              transform: "rotate(-4deg)",
              border: "4px solid #b52a2a",
              padding: "0.2rem 1rem",
              letterSpacing: "0.1em",
              display: "inline-block",
              opacity: 0.9,
            }}
          >
            VERDICT: YES
          </div>
          <div className="gag-card" style={{ borderLeft: "3px solid #b52a2a" }}>
            {reason}
          </div>
          <button className="abyss-btn" onClick={analyze}>
            Re-Analyze
          </button>
          <button
            onClick={reset}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}
          >
            I would like to speak to a supervisor
          </button>
        </>
      )}
    </div>
  );
}
