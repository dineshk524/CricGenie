// src/components/WhyChooseCriccGenie.tsx
"use client";

import React from "react";

type Pillar = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  glowFrom: string;
  glowTo: string;
};

const Bolt = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

const Shield = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3 19 7v5a9 9 0 1 1-14 0V7l7-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const PILLARS: Pillar[] = [
  {
    title: "Lightning Fast",
    desc: "Blazing live scores with buttery-smooth updates.",
    icon: <Bolt />,
    glowFrom: "from-emerald-400/30",
    glowTo: "to-teal-400/30",
  },
  {
    title: "100% Reliable",
    desc: "Official sources. Consistent, trustworthy coverage.",
    icon: <Shield />,
    glowFrom: "from-sky-400/30",
    glowTo: "to-indigo-400/30",
  },
  {
    title: "Fan-First",
    desc: "Built by cricket fans, designed for cricket fans.",
    icon: <Heart />,
    glowFrom: "from-fuchsia-400/30",
    glowTo: "to-violet-400/30",
  },
];

const WhyChooseCriccGenie: React.FC = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-transparent px-6 py-20 text-white md:py-28">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute left-[20%] bottom-[-40px] -z-10 h-[300px] w-[300px] rounded-full bg-sky-500/12 blur-3xl animate-orb-slow" />
      <div className="pointer-events-none absolute right-[12%] bottom-[10%] -z-10 h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-3xl animate-orb" />

      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl -mt-20">
            Why fans pick{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              CricGenie
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300/90 md:text-lg">
            One sleek, dark-glass experience — fast, focused, fan-first.
          </p>
        </div>

        {/* pillars */}
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-cardFloat"
              style={{
                // slight offset so each card floats out of sync
                animationDelay: `${i * 0.35}s`,
              }}
            >
              {/* soft, always-on glow */}
              <div className="card-glow" />

              {/* inner gradient stroke (no overflow) */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [padding:1px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* color glow on hover */}
              <div
                className={`pointer-events-none absolute -inset-8 -z-20 rounded-[28px] bg-gradient-to-tr ${p.glowFrom} ${p.glowTo} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
              />

              {/* sheen on hover */}
              <span className="pointer-events-none absolute -inset-px -z-10 rounded-[22px] opacity-0 [background:linear-gradient(120deg,transparent,rgba(255,255,255,.10),transparent)] [background-size:300%_100%] [animation:shine_3s_ease-in-out_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running]" />

              {/* icon + title */}
              <div className="mb-4 flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                  <span className="absolute inset-0 -z-10 rounded-xl bg-white/10 blur-md" />
                  <span className="animate-pulse-slow">{p.icon}</span>
                </span>
                <h3 className="text-lg font-semibold">{p.title}</h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-300/90">{p.desc}</p>
            </article>
          ))}
        </div>

        {/* CTA ribbon */}
        <div className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-center shadow-xl backdrop-blur-xl md:p-9">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_50%_-10%,rgba(56,189,248,0.10),transparent),radial-gradient(60%_120%_at_80%_120%,rgba(168,85,247,0.10),transparent),radial-gradient(60%_120%_at_10%_110%,rgba(16,185,129,0.10),transparent)]" />
            <h3 className="text-2xl font-bold md:text-3xl">Always on the crease with you ✨</h3>
            <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-300 md:text-base">
              Join thousands of fans who trust CricGenie daily.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {[
                { label: "4.8+ Rating", emoji: "⭐" },
                { label: "50K+ Downloads", emoji: "⬇️" },
                { label: "Growing Community", emoji: "👥" },
              ].map((chip, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-100 shadow-sm backdrop-blur-sm md:px-4 md:py-2 md:text-sm"
                >
                  <span className="mr-1">{chip.emoji}</span>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* local keyframes */}
      <style jsx>{`
        /* stronger, visible motion */
        @keyframes cardFloat {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            box-shadow: 0 10px 24px -12px rgba(0,0,0,.35);
          }
          25% {
            transform: translateY(-14px) rotate(-1.2deg) scale(1.03);
            box-shadow: 0 20px 36px -12px rgba(0,0,0,.45);
          }
          50% {
            transform: translateY(0) rotate(0.6deg) scale(1);
            box-shadow: 0 14px 28px -10px rgba(0,0,0,.40);
          }
          75% {
            transform: translateY(-10px) rotate(1.2deg) scale(1.02);
            box-shadow: 0 22px 36px -14px rgba(0,0,0,.50);
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            box-shadow: 0 10px 24px -12px rgba(0,0,0,.35);
          }
        }
        .animate-cardFloat {
          animation: cardFloat 4.5s ease-in-out infinite;
        }

        /* soft glow pulse behind each card */
        .card-glow {
          position: absolute;
          inset: -12px;
          border-radius: 28px;
          background:
            radial-gradient(40% 50% at 30% 30%, rgba(56,189,248,.18), transparent 70%),
            radial-gradient(40% 60% at 70% 70%, rgba(168,85,247,.16), transparent 70%);
          filter: blur(28px);
          opacity: .25;
          animation: glowPulse 6s ease-in-out infinite alternate;
          z-index: -1;
        }
        @keyframes glowPulse {
          from { opacity: .15; transform: scale(0.95); }
          to   { opacity: .35; transform: scale(1.05); }
        }

        /* sheen */
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }

        /* ambient blobs */
        .animate-orb { animation: orb 12s ease-in-out infinite; }
        .animate-orb-slow { animation: orb 18s ease-in-out infinite; }
        @keyframes orb {
          0%,100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(18px,-12px,0); }
        }

        /* gentle icon pulse */
        .animate-pulse-slow { animation: pulse 2.4s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.06); opacity: 0.92; }
        }

        /* respect reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-cardFloat,
          .card-glow,
          .animate-orb,
          .animate-orb-slow,
          .animate-pulse-slow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseCriccGenie;
