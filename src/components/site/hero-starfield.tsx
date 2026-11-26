"use client";

import React from "react";

// Pre-calculated deterministic star positions for clean SSR hydration
const stars = [
  { top: "6%", left: "12%", size: 1.5, opacity: 0.6, delay: "0.2s", duration: "3.2s" },
  { top: "11%", left: "28%", size: 2.5, opacity: 0.9, delay: "1.1s", duration: "4.1s" },
  { top: "15%", left: "45%", size: 1, opacity: 0.4, delay: "2.4s", duration: "2.8s" },
  { top: "8%", left: "62%", size: 2, opacity: 0.8, delay: "0.7s", duration: "3.6s" },
  { top: "14%", left: "78%", size: 1.5, opacity: 0.5, delay: "1.9s", duration: "4.5s" },
  { top: "5%", left: "89%", size: 2.5, opacity: 0.9, delay: "0.4s", duration: "3.1s" },
  { top: "22%", left: "8%", size: 2, opacity: 0.7, delay: "1.6s", duration: "3.9s" },
  { top: "27%", left: "22%", size: 1, opacity: 0.5, delay: "2.8s", duration: "2.7s" },
  { top: "24%", left: "37%", size: 2, opacity: 0.8, delay: "0.9s", duration: "3.5s" },
  { top: "19%", left: "53%", size: 3, opacity: 1.0, delay: "1.3s", duration: "4.2s" },
  { top: "26%", left: "69%", size: 1.5, opacity: 0.6, delay: "2.1s", duration: "3.3s" },
  { top: "21%", left: "84%", size: 2, opacity: 0.7, delay: "0.5s", duration: "4.0s" },
  { top: "33%", left: "16%", size: 1.5, opacity: 0.6, delay: "1.8s", duration: "3.4s" },
  { top: "38%", left: "31%", size: 2.5, opacity: 0.9, delay: "0.3s", duration: "4.4s" },
  { top: "35%", left: "48%", size: 1, opacity: 0.4, delay: "2.6s", duration: "2.9s" },
  { top: "31%", left: "64%", size: 2, opacity: 0.7, delay: "1.4s", duration: "3.7s" },
  { top: "36%", left: "76%", size: 1.5, opacity: 0.5, delay: "2.2s", duration: "3.1s" },
  { top: "39%", left: "92%", size: 2, opacity: 0.8, delay: "0.8s", duration: "4.3s" },
  { top: "44%", left: "10%", size: 2.5, opacity: 0.9, delay: "1.7s", duration: "3.8s" },
  { top: "48%", left: "25%", size: 1.5, opacity: 0.6, delay: "0.6s", duration: "3.2s" },
  { top: "46%", left: "42%", size: 2, opacity: 0.7, delay: "2.3s", duration: "4.0s" },
  { top: "42%", left: "58%", size: 1, opacity: 0.4, delay: "1.1s", duration: "2.8s" },
  { top: "49%", left: "71%", size: 2.5, opacity: 0.9, delay: "0.2s", duration: "3.6s" },
  { top: "45%", left: "86%", size: 1.5, opacity: 0.5, delay: "2.7s", duration: "4.2s" },
  { top: "54%", left: "19%", size: 1.5, opacity: 0.5, delay: "1.5s", duration: "3.5s" },
  { top: "58%", left: "34%", size: 2, opacity: 0.8, delay: "0.4s", duration: "3.9s" },
  { top: "52%", left: "51%", size: 1, opacity: 0.4, delay: "2.0s", duration: "2.6s" },
  { top: "56%", left: "67%", size: 2, opacity: 0.7, delay: "1.2s", duration: "4.1s" },
  { top: "59%", left: "81%", size: 1.5, opacity: 0.6, delay: "2.5s", duration: "3.3s" },
  { top: "63%", left: "14%", size: 2, opacity: 0.7, delay: "0.8s", duration: "3.7s" },
  { top: "67%", left: "29%", size: 1, opacity: 0.4, delay: "1.9s", duration: "2.9s" },
  { top: "64%", left: "44%", size: 2.5, opacity: 0.9, delay: "0.1s", duration: "4.3s" },
  { top: "68%", left: "60%", size: 1.5, opacity: 0.6, delay: "2.3s", duration: "3.4s" },
  { top: "62%", left: "74%", size: 2, opacity: 0.8, delay: "1.0s", duration: "3.8s" },
  { top: "66%", left: "88%", size: 1, opacity: 0.4, delay: "1.7s", duration: "3.0s" },
  { top: "72%", left: "21%", size: 2, opacity: 0.7, delay: "0.9s", duration: "4.0s" },
  { top: "75%", left: "38%", size: 1.5, opacity: 0.5, delay: "2.1s", duration: "3.2s" },
  { top: "71%", left: "55%", size: 1, opacity: 0.4, delay: "1.4s", duration: "2.7s" },
  { top: "74%", left: "70%", size: 2, opacity: 0.7, delay: "0.3s", duration: "3.6s" },
  { top: "77%", left: "83%", size: 1.5, opacity: 0.5, delay: "2.6s", duration: "4.1s" },
];

const sparkles = [
  { top: "12%", left: "35%", size: 16, delay: "0.5s" },
  { top: "18%", left: "72%", size: 20, delay: "2.0s" },
  { top: "32%", left: "24%", size: 14, delay: "1.2s" },
  { top: "45%", left: "82%", size: 18, delay: "3.1s" },
  { top: "55%", left: "41%", size: 15, delay: "2.5s" },
];

export function HeroStarfield() {
  return (
    <div
      className="hero-starfield-mask absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Living Aurora / Nebula Glow layer */}
      <div className="absolute inset-0 hero-cosmic-glow" />

      {/* Twinkling Starfield */}
      {stars.map((star, i) => (
        <span
          key={`star-${i}`}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* 4-point Sparkle Stars */}
      {sparkles.map((sparkle, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute star-sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: sparkle.delay,
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-white/70"
          >
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" fill="currentColor" />
          </svg>
        </div>
      ))}

      {/* Gentle Shooting Star */}
      <div className="absolute top-[8%] right-[10%] w-[140px] h-[1.5px] bg-gradient-to-l from-white via-sky-300 to-transparent shooting-star" />
    </div>
  );
}
