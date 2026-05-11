"use client";

import { useState, useEffect } from "react";

const OPINIONS = [
  "You look like you've been meaning to do something about that.",
  "The cat has assessed your situation. The cat is not impressed.",
  "You are approximately 60% less put-together than you believe.",
  "The cat notes you came here instead of doing the thing.",
  "You have not been filling the bowl correctly. This is unrelated, and also related.",
  "The cat has decided you are fine. Not good. Fine.",
  "You are overthinking it. The cat would not.",
  "Your energy is off today. The cat sensed this from another room.",
  "You wanted someone to tell you it's okay. It is. Provisionally.",
  "The cat has reviewed your recent decisions and is withholding comment.",
  "You're doing better than you think. Slightly.",
  "The cat is judging you. The cat is always judging you. This is neutral information.",
  "You should eat something. This is not a metaphor.",
  "You came here. That was the whole plan, wasn't it.",
  "The cat finds you acceptable. For a human.",
  "Your vibe is 'trying.' The cat respects the effort, not the execution.",
  "You have been staring at this screen for too long. The cat has been watching.",
  "The cat has no notes. The cat lies.",
  "Something is clearly on your mind. The cat is not going to ask what it is.",
  "The cat would like you to know that it has seen worse. Not much worse, but worse.",
];

function CatFace({ blink }: { blink: boolean }) {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-cat">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-cat)" stroke="var(--accent)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="46" r="28" />
        <polygon points="16,26 8,8 28,20" />
        <polygon points="64,26 72,8 52,20" />
        {blink ? (
          <>
            <line x1="28" y1="40" x2="36" y2="40" strokeWidth="2.5" />
            <line x1="44" y1="40" x2="52" y2="40" strokeWidth="2.5" />
          </>
        ) : (
          <>
            <circle cx="32" cy="40" r="5" fill="var(--accent)" opacity="0.85" />
            <circle cx="48" cy="40" r="5" fill="var(--accent)" opacity="0.85" />
            <circle cx="33" cy="39" r="2" fill="var(--bg)" />
            <circle cx="49" cy="39" r="2" fill="var(--bg)" />
          </>
        )}
        <path d="M38,50 L40,53 L42,50 M40,53 L40,55" />
        <line x1="8" y1="48" x2="26" y2="50" opacity="0.45" />
        <line x1="8" y1="53" x2="26" y2="53" opacity="0.45" />
        <line x1="54" y1="50" x2="72" y2="48" opacity="0.45" />
        <line x1="54" y1="53" x2="72" y2="53" opacity="0.45" />
      </g>
    </svg>
  );
}

export default function CatOpinion() {
  const [blink, setBlink] = useState(false);
  const [opinion, setOpinion] = useState<string | null>(null);
  const [lastIdx, setLastIdx] = useState(-1);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    function cycle() {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          cycle();
        }, 160);
      }, 2800 + Math.random() * 2500);
    }
    cycle();
    return () => clearTimeout(t);
  }, []);

  function ask() {
    let next = Math.floor(Math.random() * OPINIONS.length);
    if (next === lastIdx) next = (next + 1) % OPINIONS.length;
    setLastIdx(next);
    setOpinion(OPINIONS[next]);
  }

  return (
    <div className="gag-container">
      <CatFace blink={blink} />
      <span className="gag-label" style={{ color: "var(--accent)" }}>Feline Behavioral Assessment</span>
      <h1 className="gag-heading">The Cat&apos;s Opinion of You</h1>
      {opinion === null ? (
        <>
          <p className="gag-subtext">The cat is watching. The cat always has thoughts.</p>
          <button className="abyss-btn" onClick={ask}>Ask the Cat</button>
        </>
      ) : (
        <>
          <div
            className="gag-card"
            style={{ fontStyle: "italic", textAlign: "center", lineHeight: "1.9", fontSize: "1rem", maxWidth: "460px" }}
          >
            &ldquo;{opinion}&rdquo;
          </div>
          <button className="abyss-btn" onClick={ask}>Ask Again</button>
          <p className="gag-subtext" style={{ fontSize: "0.7rem" }}>
            The cat reserves the right to feel differently tomorrow.
          </p>
        </>
      )}
    </div>
  );
}
