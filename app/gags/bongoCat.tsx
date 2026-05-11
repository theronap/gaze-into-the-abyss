"use client";

import { useState, useEffect, useRef } from "react";

function BongoCatSVG({ leftDown, rightDown }: { leftDown: boolean; rightDown: boolean }) {
  return (
    <svg viewBox="0 0 160 140" width="200" height="175" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-bongo">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-bongo)" stroke="#ff9933" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Body */}
        <ellipse cx="80" cy="96" rx="36" ry="30" />
        {/* Head */}
        <circle cx="80" cy="52" r="28" />
        {/* Ears */}
        <polygon points="56,30 46,12 68,26" />
        <polygon points="104,30 114,12 92,26" />
        {/* Eyes */}
        <line x1="68" y1="46" x2="76" y2="46" strokeWidth="3" strokeLinecap="round" />
        <line x1="84" y1="46" x2="92" y2="46" strokeWidth="3" strokeLinecap="round" />
        {/* Nose + mouth */}
        <path d="M78,56 L80,59 L82,56 M80,59 L80,62" strokeWidth="2" />
        {/* Whiskers */}
        <line x1="46" y1="54" x2="62" y2="56" opacity="0.4" strokeWidth="1.5" />
        <line x1="46" y1="60" x2="62" y2="60" opacity="0.4" strokeWidth="1.5" />
        <line x1="98" y1="56" x2="114" y2="54" opacity="0.4" strokeWidth="1.5" />
        <line x1="98" y1="60" x2="114" y2="60" opacity="0.4" strokeWidth="1.5" />
        {/* Left arm */}
        <g
          style={{
            transformOrigin: "60px 110px",
            transform: leftDown ? "rotate(30deg)" : "rotate(-10deg)",
            transition: "transform 0.06s ease-out",
          }}
        >
          <path d="M60,110 Q44,118 36,128" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="34" cy="130" rx="7" ry="5" />
        </g>
        {/* Right arm */}
        <g
          style={{
            transformOrigin: "100px 110px",
            transform: rightDown ? "rotate(-30deg)" : "rotate(10deg)",
            transition: "transform 0.06s ease-out",
          }}
        >
          <path d="M100,110 Q116,118 124,128" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="126" cy="130" rx="7" ry="5" />
        </g>
        {/* Bongos */}
        <ellipse cx="36" cy="134" rx="18" ry="8" />
        <line x1="18" y1="134" x2="18" y2="148" />
        <line x1="54" y1="134" x2="54" y2="148" />
        <path d="M18,148 Q36,154 54,148" />
        <ellipse cx="124" cy="134" rx="18" ry="8" />
        <line x1="106" y1="134" x2="106" y2="148" />
        <line x1="142" y1="134" x2="142" y2="148" />
        <path d="M106,148 Q124,154 142,148" />
      </g>
    </svg>
  );
}

export default function BongoCat() {
  const [leftDown, setLeftDown] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [hits, setHits] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function getCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function playBongo(high: boolean) {
    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(high ? 190 : 85, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(high ? 120 : 55, ctx.currentTime + 0.15);
      osc.type = "sine";
      gain.gain.setValueAtTime(0.75, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (_) {}
  }

  function hitLeft() {
    playBongo(false);
    setLeftDown(true);
    setHits((h) => h + 1);
    setTimeout(() => setLeftDown(false), 110);
  }

  function hitRight() {
    playBongo(true);
    setRightDown(true);
    setHits((h) => h + 1);
    setTimeout(() => setRightDown(false), 110);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "q" || e.key === "Q" || e.key === "ArrowLeft") hitLeft();
      if (e.key === "p" || e.key === "P" || e.key === "ArrowRight") hitRight();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="gag-container" style={{ userSelect: "none" }}>
      <BongoCatSVG leftDown={leftDown} rightDown={rightDown} />
      <span className="gag-label" style={{ color: "#ff9933" }}>Interactive Audio Experience</span>
      <h1 className="gag-heading">Bongo Cat</h1>

      <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.25rem" }}>
        <button
          className="abyss-btn"
          onMouseDown={hitLeft}
          onTouchStart={(e) => { e.preventDefault(); hitLeft(); }}
          style={{ minWidth: "80px" }}
        >
          Left [Q]
        </button>
        <button
          className="abyss-btn"
          onMouseDown={hitRight}
          onTouchStart={(e) => { e.preventDefault(); hitRight(); }}
          style={{ minWidth: "80px" }}
        >
          Right [P]
        </button>
      </div>

      {hits > 0 && (
        <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          {hits} {hits === 1 ? "hit" : "hits"}
          {hits >= 20 && " — the cat approves"}
          {hits >= 50 && ". technically."}
          {hits >= 100 && " you've gone too far."}
        </p>
      )}
      {hits === 0 && (
        <p className="gag-subtext" style={{ fontSize: "0.75rem" }}>
          Click the buttons or use Q / P keys
        </p>
      )}
    </div>
  );
}
