"use client";

import React, { useState } from "react";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  { q: "Is CricGenie free to use?", a: "Yes. CricGenie is free to download and use. You get comprehensive coverage without subscription fees." },
  { q: "Which matches does CricGenie cover?", a: "International, domestic, and major T20 leagues across the world — with schedules, squads, and live updates." },
  { q: "How do I get match notifications?", a: "Enable notifications in the app settings. Choose events like wickets, milestones, results and more." },
  { q: "Does the app work offline?", a: "You can browse cached pages offline. Live scores and commentary require an active internet connection." },
  { q: "How accurate are the live scores?", a: "We source from official partners and venues. Scores are near real-time with constant validation." },
];

const FaqCricGenie: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-transparent px-6 py-20 text-white md:py-28 -mt-6 sm:-mt-8">
      {/* contained ambience */}
      <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[14%] bottom-10 -z-10 h-[280px] w-[280px] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[30%] -z-10 h-[260px] w-[260px] rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-300/90 md:text-lg">
          Everything you need to know about CricGenie.
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
              {/* sheen on hover */}
              <span className="pointer-events-none absolute -inset-px -z-10 rounded-[22px] opacity-0 [background:linear-gradient(120deg,transparent,rgba(255,255,255,.10),transparent)] [background-size:300%_100%] [animation:shine_2.8s_ease-in-out_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running]" />

              <button
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left md:px-6 md:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-2xl"
              >
                <h3 className="text-base font-semibold md:text-lg">{item.q}</h3>

                {/* PLUS / CLOSE with live animation when closed */}
                <span
                  className={[
                    "faq-toggle grid size-9 place-items-center rounded-lg border border-white/10 bg-white/10 text-white transition-transform duration-300",
                    isOpen ? "rotate-45" : "rotate-0",
                    // wiggle on hover/focus for extra affordance
                    "group-hover:animate-faq-wiggle group-focus-within:animate-faq-wiggle",
                    // stop glow when open
                    isOpen ? "" : "animate-faq-glow",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              {/* answer — height + fade */}
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
              <div className="pointer-events-none absolute -inset-6 -z-20 rounded-[28px] bg-gradient-to-tr from-sky-400/20 to-emerald-400/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />
            </div>
          );
        })}
      </div>

      {/* contact footer */}
      <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-10 text-lg text-gray-200 md:mt-12">
        Still have questions?
        <a
          href="#"
          className="rounded-xl border border-emerald-400/40 bg-emerald-600/80 px-4 py-2 font-medium shadow-lg backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-emerald-500/80"
        >
          Contact Support
        </a>
      </div>

      {/* local keyframes: glow + wiggle (reduced-motion safe) */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes faqGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(16,185,129,0), 0 0 0 rgba(56,189,248,0); transform: scale(1); }
          50% { box-shadow: 0 0 18px rgba(16,185,129,0.35), 0 0 30px rgba(56,189,248,0.25); transform: scale(1.06); }
        }
        @keyframes faqWiggle {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-1px) rotate(-2deg); }
          50% { transform: translateY(0) rotate(0); }
          75% { transform: translateY(1px) rotate(2deg); }
        }
        /* default animations */
        .animate-faq-glow { animation: faqGlow 2.2s ease-in-out infinite; }
        .animate-faq-wiggle { animation: faqWiggle 600ms ease-in-out; }
        /* reduced motion: disable loops */
        @media (prefers-reduced-motion: reduce) {
          .animate-faq-glow, .animate-faq-wiggle { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default FaqCricGenie;
