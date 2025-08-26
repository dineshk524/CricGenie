"use client";

import React from "react";

type Feature = { title: string; desc: string; icon: React.ReactNode; glowFrom: string; glowTo: string; };

const FEATURES: Feature[] = [
  { title: "Live Scores",        desc: "Ball-by-ball commentary & instant updates.", icon: <span className="text-xl">📺</span>, glowFrom: "from-sky-400/30",    glowTo: "to-emerald-400/30" },
  { title: "Smart Notifications",desc: "Auto alerts for wickets, milestones & results.", icon: <span className="text-xl">🔔</span>, glowFrom: "from-fuchsia-400/30", glowTo: "to-sky-400/30" },
  { title: "Player Stats",       desc: "Form, trends & deep performance analytics.", icon: <span className="text-xl">📊</span>, glowFrom: "from-emerald-400/30", glowTo: "to-teal-400/30" },
  { title: "Match Schedule",     desc: "Fixtures across series & tournaments.", icon: <span className="text-xl">📅</span>, glowFrom: "from-sky-400/30",     glowTo: "to-indigo-400/30" },
  { title: "Team Analysis",      desc: "Head-to-head & advanced team insights.", icon: <span className="text-xl">👥</span>, glowFrom: "from-purple-400/30",  glowTo: "to-fuchsia-400/30" },
];

const FeaturesCriccGenie: React.FC = () => {
  return (
    // transparent so it rides on GlobalBackground (no section barrier)
    <section className="relative z-10 bg-transparent px-6 py-16 text-white md:py-20 -mt-px">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <h2 className="animate-fade-up text-3xl font-extrabold tracking-tight md:whitespace-nowrap md:text-5xl [animation-delay:.05s]">
            Everything Cricket in One App
          </h2>
          <p className="mx-auto mt-3 max-w-2xl animate-fade-up text-base text-gray-300/90 md:text-lg [animation-delay:.12s]">
            Seamless with the hero’s look — glass, glow, and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map((f, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]/70 p-5 opacity-0 backdrop-blur-xl will-change-transform [animation:fadeUp_.6s_ease-out_forwards] [animation-delay:calc(.08s_*_var(--i))]"
              style={{ ["--i" as any]: i + 1 }}
            >
              {/* hover glow */}
              <div className={`pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-r ${f.glowFrom} ${f.glowTo} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40`} />
              {/* sheen */}
              <span className="pointer-events-none absolute -inset-[1px] -z-10 rounded-[22px] opacity-0 [background:linear-gradient(120deg,transparent,rgba(255,255,255,.08),transparent)] [background-size:300%_100%] [animation:cardSheen_2.8s_ease-in-out_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running]" />

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#222]/80 text-white shadow-inner ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold md:text-lg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{f.desc}</p>

              {/* slight tilt on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl transition-transform duration-300 group-hover:rotate-[.35deg]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCriccGenie;
