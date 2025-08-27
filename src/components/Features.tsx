// src/components/FeaturesCriccGenie.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

// 🔧 ANIMATION KNOBS
const DROP_PX = -34;       // how high cards start from (negative = from top)
const DURATION_MS = 250;   // how long each card's drop takes
const GAP_MS = 80;         // delay between card reveals (tweak to taste)

type Feature = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  glowFrom: string;
  glowTo: string;
};

const FEATURES: Feature[] = [
  { title: "Live Scores",        desc: "Ball-by-ball commentary & instant updates.", icon: <span className="text-xl">📺</span>, glowFrom: "from-sky-400/30",    glowTo: "to-emerald-400/30" },
  { title: "Smart Notifications",desc: "Auto alerts for wickets, milestones & results.", icon: <span className="text-xl">🔔</span>, glowFrom: "from-fuchsia-400/30", glowTo: "to-sky-400/30" },
  { title: "Player Stats",       desc: "Form, trends & deep performance analytics.", icon: <span className="text-xl">📊</span>, glowFrom: "from-emerald-400/30", glowTo: "to-teal-400/30" },
  { title: "Match Schedule",     desc: "Fixtures across series & tournaments.", icon: <span className="text-xl">📅</span>, glowFrom: "from-sky-400/30",     glowTo: "to-indigo-400/30" },
  { title: "Team Analysis",      desc: "Head-to-head & advanced team insights.", icon: <span className="text-xl">👥</span>, glowFrom: "from-purple-400/30",  glowTo: "to-fuchsia-400/30" },
];

const FeaturesCriccGenie: React.FC = () => {
  const [headVisible, setHeadVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [show, setShow] = useState<boolean[]>(() => new Array(FEATURES.length).fill(false));

  // animate on mount
  useEffect(() => {
    const timers: number[] = [];

    timers.push(window.setTimeout(() => setHeadVisible(true), 50));
    timers.push(window.setTimeout(() => setSubVisible(true), 200));

    FEATURES.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setShow((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 400 + i * (DURATION_MS + GAP_MS));
      timers.push(t);
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // shared transition
  const transition = useMemo<React.CSSProperties>(
    () => ({
      transitionProperty: "transform, opacity",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDuration: `${DURATION_MS}ms`,
      willChange: "transform, opacity",
    }),
    []
  );

  return (
    <section className="relative z-10 bg-transparent px-6 py-16 text-white md:py-20 -mt-5">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <h2
            className="text-3xl font-extrabold tracking-tight md:text-5xl md:whitespace-nowrap"
            style={{
              ...transition,
              transform: headVisible ? "none" : `translateY(${DROP_PX}px)`,
              opacity: headVisible ? 1 : 0,
            }}
          >
            Everything{" "}
            <span className="bg-gradient-to-r from-sky-400 via-fuchsia-500 to-emerald-400 bg-clip-text text-transparent">
              Cricket
            </span>{" "}
            in One App
          </h2>

          <p
            className="mx-auto mt-7 max-w-2xl text-base text-gray-300/90 md:text-lg"
            style={{
              ...transition,
              transitionDuration: "560ms",
              transform: subVisible ? "none" : `translateY(${DROP_PX}px)`,
              opacity: subVisible ? 1 : 0,
            }}
          >
            Seamless with the hero’s look — glass, glow, and speed.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map((f, i) => {
            const visible = show[i];
            return (
              <article
                key={f.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]/70 p-5 backdrop-blur-xl transition-transform duration-300 will-change-transform hover:-translate-y-1.5 hover:scale-[1.01]
                ${visible ? "animate-float" : ""}`}
                style={{
                  ...transition,
                  transform: visible ? "none" : `translateY(${DROP_PX}px)`,
                  opacity: visible ? 1 : 0,
                }}
              >
                {/* hover glow */}
                <div className={`pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-r ${f.glowFrom} ${f.glowTo} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40`} />
                {/* sheen */}
                <span className="pointer-events-none absolute -inset-[1px] -z-10 rounded-[22px] opacity-0 [background:linear-gradient(120deg,transparent,rgba(255,255,255,.08),transparent)] [background-size:300%_100%] [animation:cardSheen_2.8s_ease-in-out_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running]" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#222]/80 text-white shadow-inner ring-1 ring-white/10">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold md:text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{f.desc}</p>

                <div className="pointer-events-none absolute inset-0 rounded-2xl" />
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes cardSheen {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 2s ease-in infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesCriccGenie;
