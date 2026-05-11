"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    q: "When was the last time you fully completed something?",
    opts: ["Today, actually", "This week, maybe", "I can't quite remember", "What counts as 'fully'?"],
  },
  {
    q: "Your phone battery is at 4%. You:",
    opts: [
      "Charge it immediately",
      "Acknowledge it and do nothing",
      "Feel a vague sense of solidarity with it",
      "Experience this as a metaphor",
    ],
  },
  {
    q: "How often do you mentally compose messages you never send?",
    opts: ["Rarely", "Sometimes, sure", "It's basically a hobby", "Constantly. There's a whole queue."],
  },
  {
    q: "The plan was 7pm. It's 7:38pm. You:",
    opts: [
      "Have been there since 6:55",
      "Are en route and texting",
      "Are still getting ready, technically",
      "Have not yet begun getting ready",
    ],
  },
  {
    q: "Describe your current relationship with your to-do list:",
    opts: [
      "Managed. Under control.",
      "Stressful but real",
      "A document I open to feel bad",
      "What list? I stopped writing them.",
    ],
  },
];

const DIAGNOSES = [
  {
    title: "Chronically Pending",
    body: "You are a person in the process of getting to it. The process is genuine. The arrival is theoretical. This is a recognized condition affecting most adults. Treatment: unclear.",
  },
  {
    title: "Functionally Overwhelmed",
    body: "Your capacity exceeds your output by approximately one task. The tasks themselves are normal. The accumulation is the problem. You are not broken. You are full.",
  },
  {
    title: "Aspirationally Organized",
    body: "The systems are there. The binder exists. The calendar has colors. The follow-through is elsewhere. You are a person who has invested in the infrastructure of productivity without yet inhabiting it.",
  },
  {
    title: "Professionally Fine",
    body: "To all external observers, you are doing well. The gap between the observed and the experienced is larger than advisable. You are maintaining it successfully. This is both impressive and exhausting.",
  },
  {
    title: "Maintenance Mode",
    body: "You are not behind. You are not ahead. You are keeping things from getting worse, which is underrated work. The growth will resume when the load lightens. The load will lighten eventually.",
  },
  {
    title: "Selectively Avoidant",
    body: "You are capable of completing most tasks. The ones not getting done are not random — they share a characteristic. You know what it is. The knowing doesn't help, but it counts for something.",
  },
];

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 60 80" width="54" height="72" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-quiz">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-quiz)" stroke="#0055dd" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="44" height="58" rx="3" />
        <path d="M22,14 L22,8 Q22,4 30,4 Q38,4 38,8 L38,14" />
        <line x1="18" y1="30" x2="42" y2="30" strokeWidth="2" opacity="0.5" />
        <line x1="18" y1="40" x2="42" y2="40" strokeWidth="2" opacity="0.5" />
        <line x1="18" y1="50" x2="34" y2="50" strokeWidth="2" opacity="0.5" />
      </g>
    </svg>
  );
}

export default function WhatIsWrong() {
  const [step, setStep] = useState(0);
  const [diagnosis, setDiagnosis] = useState<(typeof DIAGNOSES)[0] | null>(null);

  function next() {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDiagnosis(DIAGNOSES[Math.floor(Math.random() * DIAGNOSES.length)]);
    }
  }

  function reset() {
    setStep(0);
    setDiagnosis(null);
  }

  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="gag-container">
      <ClipboardIcon />
      <span className="gag-label" style={{ color: "#0055dd" }}>Diagnostic Assessment Tool</span>
      <h1 className="gag-heading">What Is Wrong With Me?</h1>

      {diagnosis === null ? (
        <>
          <div style={{ width: "100%", maxWidth: "480px", marginBottom: "0.5rem" }}>
            <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: "#0055dd",
                  width: `${progress}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.4rem", letterSpacing: "0.05em" }}>
              Question {step + 1} of {QUESTIONS.length}
            </p>
          </div>

          <div className="gag-card" style={{ borderColor: "#c0d0e8", maxWidth: "480px", width: "100%" }}>
            <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "1.25rem", color: "var(--fg)", fontWeight: "500" }}>
              {QUESTIONS[step].q}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {QUESTIONS[step].opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={next}
                  style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
                    cursor: "pointer",
                    padding: "0.6rem 1rem",
                    textAlign: "left",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                    lineHeight: "1.5",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.borderColor = "#0055dd";
                    (e.target as HTMLButtonElement).style.background = "#e8f0f8";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.borderColor = "var(--border)";
                    (e.target as HTMLButtonElement).style.background = "none";
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="gag-card" style={{ borderColor: "#c0d0e8", maxWidth: "480px", width: "100%", borderLeft: "3px solid #0055dd" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#0055dd", marginBottom: "0.5rem" }}>
              Diagnosis
            </p>
            <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0a1a3a", marginBottom: "0.75rem" }}>{diagnosis.title}</p>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.85", fontStyle: "italic", color: "#2a3a5a" }}>{diagnosis.body}</p>
          </div>
          <button className="abyss-btn" onClick={reset}>Take Again</button>
          <p style={{ fontSize: "0.7rem", color: "var(--muted)", fontStyle: "italic" }}>Results may vary. All results are correct.</p>
        </>
      )}
    </div>
  );
}
