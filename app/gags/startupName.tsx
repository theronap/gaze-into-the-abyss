"use client";

import { useState } from "react";

const NAMES = ["Nublo", "Zynthr", "Fleev", "Quantix", "Borq", "Vennli", "Glyph", "Plattr", "Skuu", "Zestify", "Kliiq", "Mentum", "Xylo", "Blynk", "Grovo", "Fusely", "Traxo", "Lymn", "Ovro", "Spekt"];
const CATEGORIES = ["SaaS", "B2B", "consumer", "enterprise", "platform", "marketplace", "community-driven", "AI-native", "vertical"];
const INDUSTRIES = ["professional networking", "task management", "wellness", "sleep optimization", "B2B payments", "supply chain visibility", "talent acquisition", "async communication", "developer tooling", "meeting intelligence", "expense management", "knowledge management"];
const TAGLINES = [
  "We're not building software. We're building behavior.",
  "Moving fast. Staying human.",
  "The future of work starts here. Your current work ends here.",
  "Powered by AI. Inspired by you. Funded by people who haven't met you yet.",
  "What if your workflow worked?",
  "Enterprise-grade. Human-scale. Investor-ready.",
  "Less friction. More alignment. Significantly more jargon.",
  "The platform that understands your pain points, then charges you to fix them.",
  "Built for builders. Priced for enterprises. Explained to your parents.",
  "Transforming [INDUSTRY] for the modern [PERSONA].",
];
const VALUATIONS = ["1.2B", "400M", "2.8B", "650M", "1.8B", "3.4B", "900M", "500M", "1.1B", "250M"];

type Startup = { name: string; category: string; industry: string; tagline: string; valuation: string };

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function RocketIcon() {
  return (
    <svg viewBox="0 0 60 80" width="55" height="75" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-startup">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-startup)">
        <path d="M30,6 C30,6 44,16 44,38 L30,50 L16,38 C16,16 30,6 30,6 Z" fill="none" stroke="#1a44dd" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="30" cy="28" r="6" fill="none" stroke="#1a44dd" strokeWidth="2" />
        <path d="M16,38 L8,50 L20,44" fill="none" stroke="#1a44dd" strokeWidth="2" strokeLinejoin="round" />
        <path d="M44,38 L52,50 L40,44" fill="none" stroke="#1a44dd" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24,50 C24,56 22,62 18,68" stroke="#1a44dd" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M36,50 C36,56 38,62 42,68" stroke="#1a44dd" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M30,50 L30,72" stroke="#1a44dd" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  );
}

export default function StartupName() {
  const [startup, setStartup] = useState<Startup | null>(null);

  function generate() {
    setStartup({
      name: pick(NAMES),
      category: pick(CATEGORIES),
      industry: pick(INDUSTRIES),
      tagline: pick(TAGLINES),
      valuation: pick(VALUATIONS),
    });
  }

  return (
    <div className="gag-container" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <RocketIcon />
      <span className="gag-label" style={{ color: "#8899bb" }}>Venture-Backed Nomenclature Engine</span>
      <h1 className="gag-heading">Startup Name Generator</h1>

      {startup === null ? (
        <>
          <p className="gag-subtext">
            The world has enough problems.
            <br />Generate a company to pretend to solve one.
          </p>
          <button className="abyss-btn" onClick={generate}>Generate</button>
        </>
      ) : (
        <>
          <div style={{ fontSize: "clamp(2rem, 8vw, 4rem)", fontWeight: "900", color: "#1a44dd", letterSpacing: "-0.02em" }}>
            {startup.name}
          </div>
          <div className="gag-card" style={{ borderColor: "#c4d4ff" }}>
            <p style={{ fontSize: "0.75rem", color: "#8899bb", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {startup.category} · {startup.industry}
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "0.75rem", fontStyle: "italic", color: "#1a2a4a" }}>
              &ldquo;{startup.tagline}&rdquo;
            </p>
            <p style={{ fontSize: "0.8rem", color: "#8899bb" }}>
              Valued at <strong style={{ color: "#1a44dd" }}>${startup.valuation}</strong> pre-revenue.
              Disrupting {startup.industry}. Hiring.
            </p>
          </div>
          <button className="abyss-btn" onClick={generate}>Generate Another</button>
        </>
      )}
    </div>
  );
}
