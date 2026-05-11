"use client";

import { useState } from "react";

const ORIGINS = [
  "You were put on hold for 47 minutes. The hold music was a 30-second loop. The representative resolved nothing. And something in you resolved everything.",
  "A coworker microwaved fish in the shared kitchen. You said nothing. You smiled. You filed it away. You are still filing.",
  "You were given feedback in front of the group. The feedback was minor. The public nature of it was not. You have not forgotten the room. You have not forgotten who was in it.",
  "You sent a message. You watched the read receipt appear. No reply came. You have been composing your response to that silence ever since.",
  "You were left off an email chain that concerned you directly. By the time you were added, decisions had been made. The decisions were fine. The exclusion was not.",
  "You held the door. Nobody said thank you. This was the fourteenth time. You began counting on the fifteenth.",
  "You were told your idea was 'interesting' and then watched someone else present a nearly identical version two weeks later to significant applause. You applauded. You have excellent posture.",
  "The group project gave your name last in the presentation. After 'and others.' You were not an other. You were a primary contributor. The slideshow remembers nothing. You remember everything.",
  "You ordered something specific. You received something adjacent. You ate it without complaint. You have been adjacent ever since.",
  "Your suggestion was ignored in the meeting. Three minutes later, someone repeated it. Everyone praised it. You smiled and took notes on what you had just learned about the world.",
  "You did the right thing. It cost you. Nobody noticed it had cost you. You noticed.",
  "You held the elevator. They were running. They stopped running when they saw you holding it. They did not say thank you. They checked their phone. You pressed the door-close button one floor early.",
];

function LightningIcon() {
  return (
    <svg viewBox="0 0 50 80" width="50" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-villain">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-villain)">
        <path
          d="M32,4 L12,44 L24,44 L18,76 L42,32 L28,32 Z"
          fill="#9933ff" stroke="#6600cc" strokeWidth="1.5" strokeLinejoin="round"
        />
        <path
          d="M32,4 L12,44 L24,44 L18,76 L42,32 L28,32 Z"
          fill="none" stroke="#cc88ff" strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}

export default function Villain() {
  const [origin, setOrigin] = useState<string | null>(null);

  function generate() {
    setOrigin(ORIGINS[Math.floor(Math.random() * ORIGINS.length)]);
  }

  return (
    <div className="gag-container">
      <LightningIcon />
      <span className="gag-label" style={{ color: "#9933ff", letterSpacing: "0.2em" }}>
        Origin Classification — Class IV
      </span>
      <h1 className="gag-heading">My Villain Origin Story</h1>

      {origin === null ? (
        <>
          <p className="gag-subtext">
            Every villain has a beginning. Yours is more mundane than you&apos;d like.
            And more formative than anyone suspects.
          </p>
          <button className="abyss-btn" onClick={generate}>
            Generate My Origin
          </button>
        </>
      ) : (
        <>
          <div className="gag-card" style={{ borderColor: "#440088", fontSize: "1rem", fontStyle: "italic", lineHeight: "1.9", textAlign: "center" }}>
            {origin}
          </div>
          <button className="abyss-btn" onClick={generate}>Generate Another</button>
        </>
      )}
    </div>
  );
}
