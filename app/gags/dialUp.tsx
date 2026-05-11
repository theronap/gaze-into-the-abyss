"use client";

import { useState, useRef } from "react";

type Phase = "idle" | "dialing" | "handshake" | "connecting" | "connected";

const LOADING_MESSAGES = [
  "Establishing connection...",
  "Verifying protocol...",
  "Negotiating baud rate...",
  "Synchronizing clocks...",
  "Downloading the internet...",
  "Connected at 56,000 bps",
];

const FAKE_PAGE = {
  title: "Welcome to the Information Superhighway",
  hits: Math.floor(10000 + Math.random() * 90000),
  links: [
    "Under Construction — check back in 2004",
    "My Geocities Page (Last updated: never)",
    "Guestbook (Sign it! 3 entries)",
    "Cool Links (most are broken)",
    "About Me (very long, no paragraph breaks)",
    "Download Winamp Skins",
  ],
  marquee: "WELCOME TO MY WEBSITE !!! ... YOU ARE VISITOR #",
};

function ModemIcon() {
  return (
    <svg viewBox="0 0 80 60" width="80" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-dialup">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-dialup)" stroke="#00ff00" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="16" width="64" height="28" rx="4" />
        <circle cx="22" cy="30" r="3" fill="#00ff00" opacity="0.6" />
        <circle cx="32" cy="30" r="3" opacity="0.3" />
        <circle cx="42" cy="30" r="3" opacity="0.3" />
        <line x1="56" y1="22" x2="64" y2="22" strokeWidth="2" />
        <line x1="56" y1="28" x2="64" y2="28" strokeWidth="2" />
        <line x1="56" y1="34" x2="64" y2="34" strokeWidth="2" />
        <path d="M20,44 L20,54 M60,44 L60,54" strokeWidth="2" />
        <line x1="20" y1="54" x2="60" y2="54" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function DialUp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef(false);

  function getCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function playDialTone(duration: number): Promise<void> {
    return new Promise((resolve) => {
      try {
        const ctx = getCtx();
        if (ctx.state === "suspended") ctx.resume();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
        osc1.frequency.value = 350; osc2.frequency.value = 440;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime + duration / 1000);
        osc1.start(); osc2.start();
        osc1.stop(ctx.currentTime + duration / 1000 + 0.05);
        osc2.stop(ctx.currentTime + duration / 1000 + 0.05);
      } catch (_) {}
      setTimeout(resolve, duration);
    });
  }

  function playHandshake(duration: number): Promise<void> {
    return new Promise((resolve) => {
      try {
        const ctx = getCtx();
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        const totalSecs = duration / 1000;
        // Alternating FSK tones — the classic modem screech
        for (let i = 0; i < totalSecs * 12; i++) {
          const t = now + i * (totalSecs / (totalSecs * 12));
          const freq = i % 2 === 0 ? 1300 : 2100;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = "square";
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
          gain.gain.setValueAtTime(0.08, t + totalSecs / (totalSecs * 12) - 0.01);
          gain.gain.linearRampToValueAtTime(0, t + totalSecs / (totalSecs * 12));
          osc.start(t);
          osc.stop(t + totalSecs / (totalSecs * 12) + 0.05);
        }
      } catch (_) {}
      setTimeout(resolve, duration);
    });
  }

  async function connect() {
    stopRef.current = false;
    setPhase("dialing");
    setProgress(0);
    setMsgIdx(0);

    await playDialTone(800);
    if (stopRef.current) return;

    setPhase("handshake");
    await playHandshake(2500);
    if (stopRef.current) return;

    setPhase("connecting");
    // Animate progress bar
    for (let i = 0; i <= 5; i++) {
      if (stopRef.current) return;
      await new Promise((r) => setTimeout(r, 280));
      setProgress(i);
      setMsgIdx(i);
    }
    await new Promise((r) => setTimeout(r, 300));
    setPhase("connected");
  }

  function disconnect() {
    stopRef.current = true;
    setPhase("idle");
    setProgress(0);
  }

  return (
    <div className="gag-container" style={{ fontFamily: "'Courier New', monospace" }}>
      <ModemIcon />
      <span className="gag-label" style={{ color: "#00ff00" }}>Dial-Up Experience Simulator</span>
      <h1 className="gag-heading">Connect to the Internet</h1>

      {phase === "idle" && (
        <>
          <p className="gag-subtext" style={{ color: "#00aa00" }}>
            The internet is waiting.
            <br />It will take a moment.
          </p>
          <button className="abyss-btn" onClick={connect}>Connect</button>
        </>
      )}

      {(phase === "dialing" || phase === "handshake" || phase === "connecting") && (
        <div style={{ textAlign: "center", width: "100%", maxWidth: "400px" }}>
          <p style={{ color: "#00cc00", fontSize: "0.85rem", marginBottom: "1rem" }}>
            {phase === "dialing" && "Dialing..."}
            {phase === "handshake" && "Negotiating connection..."}
            {phase === "connecting" && LOADING_MESSAGES[msgIdx]}
          </p>

          {phase === "handshake" && (
            <div style={{ fontSize: "0.7rem", color: "#004400", marginBottom: "1rem", letterSpacing: "0.2em", wordBreak: "break-all" }}>
              {"ATH0 ATZ ATDT *99# ~~~+++ AT&F AT&C1 AT&D2".split("").map((c, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    animation: `none`,
                    opacity: Math.random() > 0.3 ? 1 : 0.3,
                    color: Math.random() > 0.5 ? "#00ff00" : "#00aa00",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {phase === "connecting" && (
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ height: "12px", border: "1px solid #00ff00", width: "100%", background: "#000800" }}>
                <div
                  style={{
                    height: "100%",
                    background: "#00ff00",
                    width: `${(progress / 5) * 100}%`,
                    transition: "width 0.25s linear",
                  }}
                />
              </div>
              <p style={{ fontSize: "0.65rem", color: "#005500", marginTop: "0.3rem" }}>
                {Math.round((progress / 5) * 100)}%
              </p>
            </div>
          )}

          <button
            onClick={disconnect}
            style={{ background: "none", border: "1px solid #005500", color: "#005500", cursor: "pointer", padding: "0.3rem 1rem", fontSize: "0.75rem", fontFamily: "monospace" }}
          >
            Cancel
          </button>
        </div>
      )}

      {phase === "connected" && (
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <p style={{ fontSize: "0.65rem", color: "#00aa00", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
            CONNECTED AT 56,000 BPS — WELCOME TO THE INTERNET (1999)
          </p>
          <div
            style={{
              border: "2px solid #00ff00",
              background: "#000800",
              padding: "1rem",
              fontFamily: "'Courier New', monospace",
              fontSize: "0.78rem",
              lineHeight: "1.8",
            }}
          >
            <div style={{ background: "#00aa00", color: "#000800", padding: "0.2rem 0.5rem", marginBottom: "0.75rem", fontSize: "0.75rem" }}>
              {FAKE_PAGE.marquee}{FAKE_PAGE.hits}
            </div>
            <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "0.5rem" }}>{FAKE_PAGE.title}</p>
            <p style={{ color: "#006600", marginBottom: "0.5rem" }}>Best viewed in Internet Explorer 5 at 800x600</p>
            <hr style={{ borderColor: "#005500", margin: "0.5rem 0" }} />
            <p style={{ color: "#004400", marginBottom: "0.5rem" }}>Links:</p>
            {FAKE_PAGE.links.map((link, i) => (
              <p
                key={i}
                style={{ color: "#0088ff", textDecoration: "underline", cursor: "not-allowed", marginBottom: "0.2rem" }}
                title="This page cannot be displayed"
              >
                &gt; {link}
              </p>
            ))}
            <hr style={{ borderColor: "#005500", margin: "0.75rem 0" }} />
            <p style={{ color: "#006600", fontSize: "0.7rem" }}>
              &copy; 1999 This Website. All rights reserved. Do not steal.
            </p>
          </div>
          <button className="abyss-btn" onClick={disconnect} style={{ marginTop: "1rem" }}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
