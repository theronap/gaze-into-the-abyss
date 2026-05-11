"use client";

import { useState } from "react";

const CALM = [
  "This is a manageable situation with multiple viable paths forward.",
  "Most outcomes here are recoverable. You have handled comparable things before.",
  "The probability of the worst case is lower than it currently feels.",
  "This requires action, not resolution. Action is available to you.",
  "Other people are uncertain about this too. You are not uniquely unprepared.",
  "The discomfort you're feeling is proportional feedback, not a verdict.",
  "You have more time than panic suggests. Not infinite time. But enough.",
  "This is solvable. Not today, necessarily. But solvable.",
  "What you are experiencing is a normal human response to an abnormal load.",
  "The situation is ambiguous. Ambiguity is uncomfortable but not dangerous.",
  "You are not behind. You are exactly where you are. That's a real place.",
  "Taking a breath is not avoidance. It's maintenance.",
];

const BRAIN_HEARS = [
  "EVERYTHING IS COLLAPSING. THIS IS THE ONE THAT UNDOES IT ALL.",
  "Everyone already knows. They've all been talking about it. The group chat is active.",
  "You should have fixed this years ago. It's too late now. It was always going to be too late.",
  "You are the problem. You have always been the problem. This confirms it.",
  "The worst possible outcome is the most likely outcome because that is how your life works.",
  "You need to solve this RIGHT NOW or it will be worse. Also solving it will make it worse.",
  "No one else struggles with this. Only you. You are uniquely failing at being a person.",
  "This will still be happening in 10 years. You will still be this way in 10 years.",
  "Sleep is no longer an option. Sleep would be irresponsible given the scope of this.",
  "The people who love you are quietly reconsidering. This is the thing that tips them.",
  "There is a correct decision and you are going to make the wrong one. You always do.",
  "Relaxing right now is how things get worse. You cannot afford to stop being anxious.",
];

function BrainIcon() {
  return (
    <svg viewBox="0 0 80 68" width="80" height="68" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-anxiety">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-anxiety)" stroke="#aa77ff" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20,50 Q8,50 8,36 Q8,22 20,20 Q20,8 34,8 Q44,4 52,14 Q62,12 68,22 Q76,22 76,34 Q76,48 64,50 Q60,62 48,60 Q36,62 32,52 Q20,54 20,50Z" />
        <path d="M20,20 Q28,28 20,36" opacity="0.5" />
        <path d="M52,14 Q48,22 56,30 Q62,36 52,44" opacity="0.5" />
        <path d="M34,8 Q30,18 38,26 Q44,32 36,42" opacity="0.5" />
      </g>
    </svg>
  );
}

export default function AnxietyTranslator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ calm: string; brain: string } | null>(null);

  function translate() {
    if (!input.trim()) return;
    setResult({
      calm: CALM[Math.floor(Math.random() * CALM.length)],
      brain: BRAIN_HEARS[Math.floor(Math.random() * BRAIN_HEARS.length)],
    });
  }

  function reset() {
    setInput("");
    setResult(null);
  }

  return (
    <div className="gag-container">
      <BrainIcon />
      <span className="gag-label" style={{ color: "#aa77ff" }}>Cognitive Distortion Services</span>
      <h1 className="gag-heading">Anxiety Translator</h1>

      {result === null ? (
        <>
          <p className="gag-subtext">
            Type what you&apos;re anxious about.
            <br />Receive both versions.
          </p>
          <input
            className="gag-input"
            type="text"
            placeholder="I haven't responded to that email for 3 days"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && translate()}
            maxLength={120}
          />
          <button className="abyss-btn" onClick={translate} disabled={!input.trim()}>
            Translate
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              width: "100%",
              maxWidth: "660px",
              marginTop: "0.5rem",
            }}
          >
            <div className="gag-card" style={{ borderColor: "#224422", background: "#0a180a" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#44bb55", marginBottom: "0.6rem" }}>
                Rational Assessment
              </p>
              <p style={{ fontSize: "0.85rem", lineHeight: "1.75", fontStyle: "italic", color: "#bbffcc" }}>{result.calm}</p>
            </div>
            <div className="gag-card" style={{ borderColor: "#440022", background: "#180010" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff4466", marginBottom: "0.6rem" }}>
                What Your Brain Hears
              </p>
              <p style={{ fontSize: "0.85rem", lineHeight: "1.75", fontStyle: "italic", color: "#ffccdd" }}>{result.brain}</p>
            </div>
          </div>
          <button className="abyss-btn" onClick={translate}>Translate Again</button>
          <button onClick={reset} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            New topic
          </button>
        </>
      )}
    </div>
  );
}
