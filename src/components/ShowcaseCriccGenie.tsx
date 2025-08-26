"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Screen = {
  title: string;
  desc: string;
  front: string;
  back: string;
};

const SCREENS: Screen[] = [
  {
    title: "Live Scores",
    desc: "Instant match updates at a glance.",
    front: "/Android/ANDROID_01.png",
    back: "/iOS/iOS_1.png",
  },
  {
    title: "Player Stats",
    desc: "Form, trends & deep analytics.",
    front: "/Android/ANDROID_02.png",
    back: "/iOS/iOS_2.png",
  },
  {
    title: "Match Schedule",
    desc: "Fixtures across every series.",
    front: "/Android/ANDROID_03.png",
    back: "/iOS/iOS_3.png",
  },
  {
    title: "Smart Notifications",
    desc: "Only the alerts you care about.",
    front: "/Android/ANDROID_04.png",
    back: "/iOS/iOS_4.png",
  },
];

const ShowcaseCriccGenie: React.FC = () => {
  // flipped state per card (false = show front/Android, true = show back/iOS)
  const [flipped, setFlipped] = useState<boolean[]>(
    () => new Array(SCREENS.length).fill(false)
  );
  // which card the mouse is hovering (forces flip visually)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  // which card auto-animation will toggle next
  const [autoIndex, setAutoIndex] = useState(0);

  // Auto: one-by-one flip every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setFlipped(prev => {
        const next = [...prev];
        next[autoIndex] = !next[autoIndex]; // toggle this card
        return next;
      });
      setAutoIndex(prev => (prev + 1) % SCREENS.length);
    },1000); // 2s
    return () => clearInterval(id);
  }, [autoIndex]);

  return (
    <section className="relative z-10 bg-transparent px-6 py-16 text-white md:py-20 -mt-px">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="animate-fade-up text-3xl font-extrabold tracking-tight md:text-5xl">
            See CriccGenie in Action
          </h2>
          <p className="mx-auto mt-3 max-w-2xl animate-fade-up text-base text-gray-300/90 md:text-lg">
            Hover any card to flip it. They also flip one-by-one automatically every 2s.
          </p>
        </div>

        {/* grid of 4 */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {SCREENS.map((s, idx) => {
            const isFlipped = flipped[idx] || hoverIndex === idx; // hover forces flip
            return (
              <div
                key={idx}
                className="group perspective"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className={`relative h-[460px] w-full transform-style-preserve-3d transition-transform duration-700 ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* front (Android) */}
                  <div className="absolute inset-0 backface-hidden flex items-center justify-center p-6">
                    <Image
                      src={s.front}
                      alt={`${s.title} Android`}
                      width={260}
                      height={420}
                      className="object-contain"
                    />
                  </div>

                  {/* back (iOS) */}
                  <div className="absolute inset-0 rotate-y-180 backface-hidden flex items-center justify-center p-6">
                    <Image
                      src={s.back}
                      alt={`${s.title} iOS`}
                      width={260}
                      height={420}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* caption */}
                <div className="mt-6 text-center">
                  <h3 className="text-base font-semibold md:text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .perspective { perspective: 1200px; }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
};

export default ShowcaseCriccGenie;
