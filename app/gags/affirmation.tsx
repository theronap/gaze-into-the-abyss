"use client";

import { useState } from "react";

const AFFIRMATIONS = [
  "You are doing your best. Your best is sufficient. Nobody is grading this.",
  "You don't need to be productive to deserve rest. You are not a machine. You are a biological entity with finite energy and the universe has no KPIs.",
  "You have survived 100% of your worst days. This is either reassuring or a low bar. It can be both.",
  "Not every problem needs to be solved today. Some problems solve themselves. Others get worse. It is genuinely hard to tell the difference in advance, which is almost its own form of peace.",
  "You are allowed to not know what you want. Wanting clarity is not the same as having it. This is acceptable and extremely common.",
  "The version of you that got here made reasonable decisions with the information available. Do not hold that person to a standard that required information they didn't have.",
  "Rest is not a reward for completed work. Rest is a condition of being alive. You have met the condition.",
  "You are not behind. There is no schedule. The schedule is made up. You have been keeping up with a thing that isn't real.",
  "It is okay to do something imperfectly. Imperfect things exist. They take up space. They serve purposes. You are allowed to be one of them sometimes.",
  "Some days are maintenance days. Not growth days, not progress days — maintenance. You stayed in the game. This counts.",
  "You cannot pour from an empty cup. This is true. It is also true that you are not a cup. You are a person. The metaphor is doing its best.",
  "Other people are also uncertain, also tired, also making it up as they go. You are not uniquely behind. You are commonly behind. This is different.",
  "The fact that you could do more does not mean you should have. Capacity and obligation are not the same thing.",
  "Your feelings are valid. They are also not permanent. You do not have to solve them today. You do not have to perform them for anyone.",
  "You are enough. This is not a call to stop improving. It is a call to stop treating your current self as a problem to be fixed.",
  "Progress is not always visible. Some of it is internal. Some of it is rest. Some of it is simply not making things worse, which is underrated.",
  "You have gotten through every difficult day so far. The sample size is your entire life. The trend is in your favor.",
  "It is not weak to need support. It is not weak to need rest. It is not weak to be a human being with human limitations. It is, in fact, the only option.",
  "You are not falling behind on your life. Your life is happening right now, including this part.",
  "Today does not have to be significant. Most days aren't. Most days are just days, and that is completely fine and normal and enough.",
];

function SunIcon() {
  return (
    <svg viewBox="0 0 80 80" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-affirm">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-affirm)">
        <circle cx="40" cy="40" r="16" fill="none" stroke="#111" strokeWidth="2.5" />
        <line x1="40" y1="8" x2="40" y2="16" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="64" x2="40" y2="72" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="40" x2="16" y2="40" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="40" x2="72" y2="40" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="17" y1="17" x2="23" y2="23" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        <line x1="57" y1="57" x2="63" y2="63" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        <line x1="63" y1="17" x2="57" y2="23" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="63" x2="23" y2="57" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Affirmation() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * AFFIRMATIONS.length));

  function next() {
    setIndex((i) => {
      let next = Math.floor(Math.random() * AFFIRMATIONS.length);
      if (next === i) next = (i + 1) % AFFIRMATIONS.length;
      return next;
    });
  }

  return (
    <div className="gag-container">
      <SunIcon />
      <span className="gag-label">Daily Affirmation for Realists</span>
      <div
        style={{
          fontSize: "clamp(1rem, 3vw, 1.4rem)",
          maxWidth: "560px",
          lineHeight: "1.8",
          textAlign: "center",
          color: "var(--fg)",
          fontStyle: "italic",
          padding: "0 1rem",
        }}
      >
        &ldquo;{AFFIRMATIONS[index]}&rdquo;
      </div>
      <button className="abyss-btn" onClick={next}>
        Another One
      </button>
      <p className="gag-subtext" style={{ fontSize: "0.75rem" }}>
        All of these are true. Even the ones that sting a little.
      </p>
    </div>
  );
}
