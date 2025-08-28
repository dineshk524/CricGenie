// src/components/IntroCricGenie.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Stage = "orbit" | "logo" | "zoomOut" | "title" | "done";

/** 🔧 quick knobs */
const GAP_PX = 60;
const LINE_LEN = 70;
const LINE_THICK = 6;
const SPIN_MS = 900;
const SPINS = 2;
const BG = "#071014";

const IntroCricGenie: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const [stage, setStage] = useState<Stage>("orbit");
  const overlayRef = useRef<HTMLDivElement>(null);

  // ✅ responsive ball size
  const [ballSize, setBallSize] = useState(220);
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setBallSize(150); // smaller for mobile
      } else {
        setBallSize(220); // default desktop
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // radius for poles
  const RADIUS = ballSize / 2 + GAP_PX + LINE_LEN / 2;

  useEffect(() => {
    if (stage === "orbit") {
      const t = setTimeout(() => setStage("logo"), SPIN_MS * SPINS);
      return () => clearTimeout(t);
    }
    if (stage === "logo") {
      const t = setTimeout(() => setStage("zoomOut"), 1000);
      return () => clearTimeout(t);
    }
    if (stage === "zoomOut") {
      const t = setTimeout(() => setStage("title"), 800);
      return () => clearTimeout(t);
    }
    if (stage === "title") {
      const t = setTimeout(() => setStage("done"), 1200);
      return () => clearTimeout(t);
    }
    if (stage === "done") {
      const el = overlayRef.current;
      if (el) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      }
      const t = setTimeout(() => onDone?.(), 500);
      return () => clearTimeout(t);
    }
  }, [stage, onDone]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] grid place-items-center text-white"
      style={{ background: BG, transition: "opacity .5s ease" }}
    >
      <div className="relative flex flex-col items-center">
        {/* central container */}
        <div className="relative" style={{ width: ballSize, height: ballSize }}>
          {/* orbiting poles */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
              stage === "orbit" ? "spin" : "opacity-0"
            }`}
            style={{
              width: 0,
              height: 0,
              animationDuration: `${SPIN_MS}ms`,
              animationIterationCount: SPINS,
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
            }}
          >
            {[45, 135, 225, 315].map((deg) => (
              <span
                key={deg}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translate(${RADIUS}px)`,
                  width: LINE_LEN,
                  height: LINE_THICK,
                  borderRadius: LINE_THICK,
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,.95), rgba(125,211,252,.95))",
                  boxShadow:
                    "0 0 14px rgba(16,185,129,.9), 0 0 26px rgba(56,189,248,.6)",
                }}
              />
            ))}
          </div>

          {/* cricket ball */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              stage === "orbit" ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              background:
                "radial-gradient(65% 65% at 40% 30%, #ffb3b3 0%, #ef4444 55%, #991b1b 100%)",
              boxShadow:
                "0 0 90px 28px rgba(239,68,68,.5), 0 30px 70px -16px rgba(0,0,0,.65), inset 0 -20px 40px rgba(0,0,0,.25)",
            }}
          />
          {stage === "orbit" && (
            <>
              <span className="absolute left-1/2 top-1/2 h-[75%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white/70" />
              <span className="absolute left-1/2 top-1/2 h-[2px] w-[66%] -translate-x-1/2 -translate-y-1/2 bg-white/75" />
            </>
          )}

          {/* logo */}
          <div
            className={`absolute inset-0 grid place-items-center transition-all duration-700 ${
              stage !== "orbit" ? "opacity-100" : "opacity-0"
            } ${
              stage === "zoomOut"
                ? "scale-110"
                : stage === "logo"
                ? "scale-100"
                : "scale-95"
            }`}
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-xl backdrop-blur-md">
              <Image
                src="/Logo/Logo.png"
                alt="CricGenie"
                width={Math.round(ballSize * 0.55)}
                height={Math.round(ballSize * 0.55)}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* heading */}
        <div
          className={`mt-7 text-3xl font-extrabold md:text-5xl transition-all duration-700 ${
            stage === "title" || stage === "done"
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            CricGenie
          </span>
        </div>
      </div>

      <style jsx>{`
        .spin {
          animation-name: spinKey;
        }
        @keyframes spinKey {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroCricGenie;
