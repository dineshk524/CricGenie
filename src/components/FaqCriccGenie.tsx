"use client";

import React, { useState } from "react";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "Is CriccGenie free to use?",
    a: "Yes. CriccGenie is free to download and use. You get comprehensive coverage without subscription fees.",
  },
  {
    q: "Which matches does CriccGenie cover?",
    a: "International, domestic, and major T20 leagues across the world — with schedules, squads, and live updates.",
  },
  {
    q: "How do I get match notifications?",
    a: "Enable notifications in the app settings. Choose events like wickets, milestones, results and more.",
  },
  {
    q: "Does the app work offline?",
    a: "You can browse cached pages offline. Live scores and commentary require an active internet connection.",
  },
  {
    q: "How accurate are the live scores?",
    a: "We source from official partners and venues. Scores are near real-time with constant validation.",
  },
];

const FaqCriccGenie: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-transparent px-6 py-20 text-white md:py-28">
      {/* contained ambience (no overflow-x) */}
      <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute left-[14%] bottom-10 -z-10 h-[280px] w-[280px] rounded-full bg-emerald-500/10 blur-3xl animate-orb-slow" />
      <div className="pointer-events-none absolute right-[10%] top-[30%] -z-10 h-[260px] w-[260px] rounded-full bg-fuchsia-500/10 blur-3xl animate-orb" />

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-300/90 md:text-lg">
          Everything you need to know about CriccGenie.
        </p>
      </div>

      {/* list */}
      <div className="mx-auto mt-10 max-w-3xl space-y-4 md:mt-14">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* sheen */}
              <span className="pointer-events-none absolute -inset-px -z-10 rounded-[22px] opacity-0 [background:linear-gradient(120deg,transparent,rgba(255,255,255,.10),transparent)] [background-size:300%_100%] [animation:shine_2.8s_ease-in-out_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running]" />

              <button
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <h3 className="text-base font-semibold md:text-lg">{item.q}</h3>

                {/* plus / minus icon */}
                <span
                  className={`grid size-8 place-items-center rounded-lg border border-white/10 bg-white/10 text-white transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  {/* a simple plus becomes an × when rotated 45deg */}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              {/* answer — animated height + fade */}
              <div
                id={`faq-${i}`}
                className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`px-5 pb-5 text-sm text-gray-300/90 md:px-6 md:pb-6 transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              </div>

              {/* hover glow */}
              <div
                className={`pointer-events-none absolute -inset-6 -z-20 rounded-[28px] bg-gradient-to-tr from-sky-400/20 to-emerald-400/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
              />
            </div>
          );
        })}
      </div>

      {/* contact footer */}
      <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3 text-sm text-gray-300 md:mt-12">
        Still have questions?
        <a
          href="#"
          className="rounded-xl border border-emerald-400/40 bg-emerald-600/80 px-4 py-2 font-medium shadow-lg backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-emerald-500/80"
        >
          Contact Support
        </a>
      </div>

      <style jsx>{`
        @keyframes orb {
          0%,100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(16px,-12px,0); }
        }
        .animate-orb { animation: orb 12s ease-in-out infinite; }
        .animate-orb-slow { animation: orb 18s ease-in-out infinite; }
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </section>
  );
};

export default FaqCriccGenie;
