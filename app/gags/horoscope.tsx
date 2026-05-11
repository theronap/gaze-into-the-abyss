"use client";

import { useState } from "react";

const SIGNS = [
  "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
  "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius",
];

const PROPHECIES = [
  "You will receive an email that requires no action but will occupy your thoughts for three days.",
  "A stranger will hold the door open from an awkward distance, obligating you to speed-walk.",
  "You will be mildly inconvenienced. Drink water.",
  "The thing you're avoiding will still be there on Monday. And Tuesday.",
  "Someone will say 'per my last email' to you. You will deserve it.",
  "You will start a task, get distracted, and forget what you were doing. The task remains.",
  "A food item in your fridge is older than you think. Don't check.",
  "You will read a notification, decide to respond later, and never respond.",
  "Your biggest obstacle today is a slightly too-full trash bag you keep compressing instead of emptying.",
  "You will Google something obvious and feel ashamed. The universe does not care.",
  "Today brings a moderate sense of almost getting something done.",
  "The universe is indifferent to your productivity. Order the fries.",
  "Mercury is in retrograde, which explains everything and also nothing.",
  "You will have a conversation in your head that is more productive than the real one you keep avoiding.",
  "A song will get stuck in your head. It will be a bad one. It will last three days.",
  "The stars suggest you check your email. The stars also suggest you don't.",
  "You will make a list today. The list will not help.",
  "Someone will describe you as 'a lot.' They mean it affectionately. Mostly.",
  "You will have a great idea at 1am and convince yourself you'll remember it. You won't.",
  "The path forward is clear. You will choose the other path.",
  "An opportunity presents itself. You will wait to see if a better one comes. It won't.",
  "Today's energy is: technically fine.",
  "A decision you delayed will make itself. You will not like how it resolved.",
  "You will spend twelve minutes searching for something that is in your hand.",
  "The universe has consulted your chart and would like you to lower your expectations slightly.",
  "Saturn is in your house. Saturn has not paid rent. Saturn does not acknowledge the lease.",
  "Your aura is the color of a Tuesday.",
  "The celestial bodies confirm you are exactly as tired as you feel.",
  "An old memory will surface at a completely inappropriate moment. You will be in public.",
  "The cosmos have reviewed your situation and responded: 'yeah, that tracks.'",
];

function MoonIcon() {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f-horoscope">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#f-horoscope)">
        <path
          d="M52,10 C30,12 14,28 16,50 C18,70 36,82 56,76 C40,70 26,56 26,40 C26,24 38,12 52,10 Z"
          fill="#c9a84c" stroke="#a07820" strokeWidth="1.5" strokeLinejoin="round"
        />
        <circle cx="64" cy="18" r="3.5" fill="#c9a84c" />
        <circle cx="18" cy="12" r="2" fill="#c9a84c" />
        <circle cx="70" cy="44" r="2.5" fill="#c9a84c" />
        <circle cx="62" cy="60" r="1.5" fill="#c9a84c" opacity="0.7" />
        <path d="M20,52 L23,58 L26,52 L23,46 Z" fill="#c9a84c" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function Horoscope() {
  const [revealed, setRevealed] = useState(false);
  const [sign] = useState(() => SIGNS[Math.floor(Math.random() * SIGNS.length)]);
  const [prophecy, setProphecy] = useState(() => PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)]);

  function reveal() {
    setProphecy(PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)]);
    setRevealed(true);
  }

  return (
    <div className="gag-container">
      <MoonIcon />
      <span className="gag-label" style={{ color: "#c9a84c", letterSpacing: "0.3em" }}>
        ✦ Celestial Guidance ✦
      </span>
      <h1 className="gag-heading">Horoscope for Realists</h1>

      {!revealed ? (
        <>
          <p className="gag-subtext">
            The stars have consulted your chart.
            <br />The news is&hellip; fine.
          </p>
          <button className="abyss-btn" onClick={reveal}>
            Reveal My Fate
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: "0.75rem", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {sign} &mdash; {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <div
            className="gag-card"
            style={{
              textAlign: "center",
              fontSize: "1.1rem",
              fontStyle: "italic",
              borderColor: "#c9a84c",
              borderWidth: "1px",
              color: "var(--fg)",
            }}
          >
            &ldquo;{prophecy}&rdquo;
          </div>
          <p className="gag-subtext">
            Note: Your sign may not be {sign}.
            <br />The stars don&apos;t really care.
          </p>
          <button className="abyss-btn" onClick={reveal}>
            Consult Again
          </button>
        </>
      )}
    </div>
  );
}
