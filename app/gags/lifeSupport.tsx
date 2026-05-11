"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { from: "user" | "bot"; text: string };

const BOT_SCRIPT = [
  "Thank you for contacting Life Support. Your issue has been logged as Priority 4 (Non-Emergency). How can I direct your inquiry today?",
  "I understand. This has been escalated to a Case Manager. Due to high volume, estimated wait time is 8–12 years. Is there anything else I can help you with today?",
  "I see. For matters of this nature, we recommend consulting the FAQ. The FAQ is temporarily unavailable. I am attaching the FAQ link. The link goes to another form. Can you confirm this is helpful?",
  "Your patience is appreciated. I want you to know your experience matters to us. We are unable to resolve it. But it matters. Is there anything else I can help you with today?",
  "We're transferring you to a specialist. Please hold. ............... It appears the specialist is unavailable. I can take a message. The message will be reviewed in the order it was received.",
  "[ChatSupport23 has left the chat.]\n[Session timed out due to inactivity.]\n[Please rate your support experience: 1 / 5 stars — Was this helpful?]",
];

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 70 70" width="65" height="65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-chat">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-chat)" stroke="#0077cc" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12,36 Q12,12 35,12 Q58,12 58,36" />
        <rect x="8" y="34" width="12" height="18" rx="4" />
        <rect x="50" y="34" width="12" height="18" rx="4" />
        <path d="M58,46 Q58,56 50,58 L42,58" />
        <ellipse cx="40" cy="58" rx="4" ry="3" />
      </g>
    </svg>
  );
}

export default function LifeSupport() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Welcome to Life Support™. Average wait time: you have already waited long enough. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [scriptIdx, setScriptIdx] = useState(0);
  const [closed, setClosed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send() {
    if (!input.trim() || typing || closed) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setTyping(true);

    const delay = 1200 + Math.random() * 1000;
    setTimeout(() => {
      const response = BOT_SCRIPT[scriptIdx] ?? BOT_SCRIPT[BOT_SCRIPT.length - 1];
      setMessages((m) => [...m, { from: "bot", text: response }]);
      setTyping(false);
      if (scriptIdx >= BOT_SCRIPT.length - 1) setClosed(true);
      setScriptIdx((i) => i + 1);
    }, delay);
  }

  return (
    <div className="gag-container">
      <HeadsetIcon />
      <span className="gag-label" style={{ color: "#0077cc" }}>Life Support™ — 24/7 Assistance</span>
      <h1 className="gag-heading">Live Chat Support</h1>

      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          height: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          padding: "1rem",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%",
              padding: "0.55rem 0.9rem",
              background: m.from === "user" ? "#0077cc" : "transparent",
              border: m.from === "bot" ? "1px solid var(--border)" : "none",
              color: m.from === "user" ? "#ffffff" : "var(--fg)",
              fontSize: "0.85rem",
              lineHeight: "1.65",
              borderRadius: "4px",
              whiteSpace: "pre-wrap",
            }}
          >
            {m.from === "bot" && (
              <span style={{ fontSize: "0.6rem", display: "block", color: "#0077cc", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>
                SUPPORT
              </span>
            )}
            {m.text}
          </div>
        ))}
        {typing && (
          <div style={{ alignSelf: "flex-start", color: "var(--muted)", fontSize: "0.8rem", fontStyle: "italic" }}>
            Support is typing
            <span style={{ animation: "none" }}>...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!closed ? (
        <div style={{ display: "flex", gap: "0.5rem", width: "100%", maxWidth: "520px", marginTop: "0.5rem" }}>
          <input
            className="gag-input"
            type="text"
            placeholder="Describe your issue..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={typing}
            style={{ flex: 1, color: "#1a2030" }}
          />
          <button className="abyss-btn" onClick={send} disabled={typing || !input.trim()} style={{ flexShrink: 0 }}>
            Send
          </button>
        </div>
      ) : (
        <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontStyle: "italic", marginTop: "0.75rem", textAlign: "center" }}>
          The session has ended. Your feedback has been submitted to a folder.
        </p>
      )}
    </div>
  );
}
