"use client";

import { useState, useEffect, useRef } from "react";

const ANALYSES = [
  "On one hand, the act itself carries inherent risk. On the other hand, inaction also carries risk. The question, then, is not whether to act, but whether you are the sort of person who acts — and whether that person is trustworthy. Studies suggest that 74% of decisions made after 2pm are regretted by 9am. The remaining 26% are also regretted, just quietly. RECOMMENDATION: defer.",

  "A surface reading suggests a simple binary: do it, or don't. But this framing ignores the third option — think about doing it for an extended period, never quite committing, until the decision resolves itself through external circumstance or the heat death of the universe. This is historically the most popular approach. RECOMMENDATION: wait and see.",

  "The emotional calculus here is staggering. Consider: how will you feel if it goes well? Temporarily good. How will you feel if it goes poorly? Briefly bad, then fine. Now ask yourself: are either of those outcomes worth the cognitive overhead of deciding right now? Probably not. RECOMMENDATION: revisit in six to eight weeks.",

  "Every decision creates a version of you who made the other choice. That other version is currently thriving or suffering in equal measure. Neither outcome speaks to your inherent worth as a person, though it does speak to your decision-making framework, which per this analysis could use some work. RECOMMENDATION: flip a coin, then feel bad about the outcome.",

  "Let's be honest. You already know what you're going to do. You came here looking for permission or a warning, not analysis. This machine cannot provide either. What it can provide is the illusion of having done due diligence. RECOMMENDATION: you're going to do it. You know you are.",

  "The decision before you is not, at its core, a decision about the thing itself. It is a decision about what kind of person makes this decision. Consider: would you judge someone else for this? No. Would you hold yourself to a different standard? Irrelevant. You already are. RECOMMENDATION: proceed, but catastrophize first for thoroughness.",

  "This question has been asked by approximately 4.7 billion people across human history, in various forms. All of them eventually made a choice. Some regretted it. Others didn't. The available evidence suggests outcomes are distributed roughly evenly across a range of 'fine' to 'also fine.' RECOMMENDATION: choose.",

  "The fact that you are running this analysis suggests you have already decided and are seeking permission. This machine cannot grant permission. However, it notes that you are an adult, the stakes are probably moderate, and the worst-case scenario is a good story. RECOMMENDATION: the answer is yes.",

  "Consulting relevant literature: Aristotle would say to examine your telos. Kant would say to consider universalizability. Camus would say it doesn't matter anyway. Your mom would probably say go for it. The consensus leans permissive. RECOMMENDATION: your mother was right.",

  "This analysis has reviewed your history of similar decisions. The pattern suggests you will overthink this for several days, then make a snap judgment at an inconvenient moment, then wonder why you didn't think it through more carefully. The machine respectfully suggests you skip to the end. RECOMMENDATION: snap judgment now.",

  "There is no good time for this decision. There is also no bad time. Time is a flat circle and you are standing on it, waiting for a sign. This is the sign. It says: recommendation pending. The recommendation: pending. RECOMMENDATION: pending.",

  "The machine has detected that this is not actually a hard decision. The real concern is fear of commitment, failure, or the specific look someone makes when things don't go as planned. None of these are good reasons to avoid acting. All of them are very human ones. RECOMMENDATION: do it. Tell no one you consulted a machine.",
];

function TerminalIcon() {
  return (
    <svg viewBox="0 0 80 70" width="80" height="70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-overthink">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-overthink)">
        <rect x="4" y="4" width="72" height="48" rx="4" fill="none" stroke="#00ff41" strokeWidth="2.5" />
        <rect x="10" y="10" width="60" height="36" fill="#001200" />
        <rect x="14" y="16" width="14" height="8" rx="1" fill="#00ff41" />
        <line x1="14" y1="30" x2="50" y2="30" stroke="#00ff41" strokeWidth="1.5" />
        <line x1="14" y1="38" x2="38" y2="38" stroke="#00ff41" strokeWidth="1.5" />
        <line x1="36" y1="52" x2="44" y2="62" stroke="#00ff41" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="62" x2="56" y2="62" stroke="#00ff41" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function BlinkingCursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: on ? 1 : 0, color: "#00ff41" }}>█</span>;
}

export default function Overthinking() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function analyze() {
    if (!input.trim()) return;
    setAnalysis(ANALYSES[Math.floor(Math.random() * ANALYSES.length)]);
  }

  function reset() {
    setInput("");
    setAnalysis(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div
      className="gag-container"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      <TerminalIcon />
      <span className="gag-label" style={{ fontFamily: "monospace", color: "#00cc33" }}>
        DECISION_SUPPORT_ENGINE v2.4.1
      </span>
      <h1 className="gag-heading" style={{ fontFamily: "monospace" }}>
        The Overthinking Machine
      </h1>

      {analysis === null ? (
        <>
          <p className="gag-subtext" style={{ fontStyle: "normal", color: "#00aa22" }}>
            Enter any decision. Receive a comprehensive analysis
            <br />that helps no one.
          </p>
          <div style={{ display: "flex", alignItems: "center", maxWidth: "480px", width: "100%" }}>
            <span style={{ color: "#00ff41", marginRight: "0.5rem", fontSize: "1rem" }}>&gt;</span>
            <input
              ref={inputRef}
              className="gag-input"
              type="text"
              placeholder="Should I text them back?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
              maxLength={120}
              style={{ fontFamily: "monospace" }}
            />
          </div>
          <button className="abyss-btn" onClick={analyze} disabled={!input.trim()}
            style={{ fontFamily: "monospace" }}>
            [EXECUTE]
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: "0.8rem", color: "#00aa22", fontFamily: "monospace" }}>
            &gt; INPUT: &ldquo;{input}&rdquo;
            <br />
            &gt; ANALYZING... COMPLETE
          </p>
          <div
            className="gag-card"
            style={{ fontFamily: "monospace", fontSize: "0.88rem", borderColor: "#002800", color: "#00cc33", lineHeight: "1.9" }}
          >
            {analysis}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#00aa22" }}>
            &gt; <BlinkingCursor />
          </div>
          <button className="abyss-btn" onClick={reset} style={{ fontFamily: "monospace" }}>
            [NEW QUERY]
          </button>
        </>
      )}
    </div>
  );
}
