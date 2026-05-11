"use client";

import { useState } from "react";

const JUSTIFICATIONS = [
  "You have adapted to survive on discarded resources and sheer stubbornness. You are most active at inconvenient hours. You wash your hands more than necessary and still feel like things aren't quite clean. The raccoon recognizes you.",
  "You forage for meaning in places others have given up on. You wear the dark circles of experience. You have been caught going through things that weren't yours — information, snacks, other people's problems. The raccoon understands.",
  "You are technically nocturnal by preference. You are technically fine. You are technically thriving. The raccoon nods slowly from the fence.",
  "You are highly intelligent, deeply misunderstood, and primarily motivated by snacks and the mild chaos you call comfort. You have survived several situations that should have ended you. The raccoon tips its hat.",
  "You have a reputation. The reputation is not entirely unearned. You have also done nothing wrong, technically. The raccoon is the same way.",
  "You have been in the trash. Not literally, or not only literally. You found something valuable there. You always do. The raccoon respects this.",
  "You are an excellent problem-solver when the problem involves getting into something you aren't supposed to get into. You mask well. The raccoon knows.",
  "You operate with a level of adaptability that others call 'chaotic' and you call 'responsive.' You have made every environment work eventually. The raccoon has been watching you for years.",
  "You are, at your core, a creature who thrives in the margins — not quite wild, not quite domesticated, impeccably resourceful. The raccoon has always seen you for exactly who you are.",
  "The raccoon chose you. The raccoon does not explain its choices. Neither do you, usually. This is why it works.",
];

function RaccoonIcon() {
  return (
    <svg viewBox="0 0 80 70" width="85" height="75" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-spirit">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-spirit)">
        <ellipse cx="40" cy="38" rx="26" ry="24" fill="none" stroke="#44bb55" strokeWidth="2.5" />
        <circle cx="28" cy="30" r="8" fill="none" stroke="#44bb55" strokeWidth="2" />
        <circle cx="52" cy="30" r="8" fill="none" stroke="#44bb55" strokeWidth="2" />
        <circle cx="28" cy="30" r="4" fill="#44bb55" opacity="0.4" />
        <circle cx="52" cy="30" r="4" fill="#44bb55" opacity="0.4" />
        <ellipse cx="40" cy="44" rx="6" ry="4" fill="none" stroke="#44bb55" strokeWidth="1.5" />
        <line x1="26" y1="46" x2="18" y2="50" stroke="#44bb55" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="49" x2="16" y2="52" stroke="#44bb55" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="46" x2="62" y2="50" stroke="#44bb55" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="49" x2="64" y2="52" stroke="#44bb55" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26,14 Q22,4 28,8" stroke="#44bb55" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M54,14 Q58,4 52,8" stroke="#44bb55" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function SpiritAnimal() {
  const [revealed, setRevealed] = useState(false);
  const [justification] = useState(() => JUSTIFICATIONS[Math.floor(Math.random() * JUSTIFICATIONS.length)]);
  const [currentJustification, setCurrentJustification] = useState(justification);

  function reveal() {
    setCurrentJustification(JUSTIFICATIONS[Math.floor(Math.random() * JUSTIFICATIONS.length)]);
    setRevealed(true);
  }

  return (
    <div className="gag-container">
      <RaccoonIcon />
      <span className="gag-label" style={{ color: "#44bb55" }}>Spirit Guide Identification</span>
      <h1 className="gag-heading">My Spirit Animal</h1>

      {!revealed ? (
        <>
          <p className="gag-subtext">
            The animal kingdom has been consulted.
            <br />There is consensus.
          </p>
          <button className="abyss-btn" onClick={reveal}>
            Reveal My Animal
          </button>
        </>
      ) : (
        <>
          <div className="gag-answer" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", letterSpacing: "0.05em" }}>
            A Tired Raccoon.
          </div>
          <div className="gag-card" style={{ borderColor: "#0a2a14", fontStyle: "italic", textAlign: "center" }}>
            {currentJustification}
          </div>
          <button className="abyss-btn" onClick={reveal}>Ask Again</button>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontStyle: "italic" }}>
            It will still be a raccoon.
          </p>
        </>
      )}
    </div>
  );
}
