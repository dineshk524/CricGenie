"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* icons */
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.5-18.8-26.6-47.5-41.2-85.2-44.7-35.8-3.3-74.2 21.1-87.8 21.1-14.3 0-48.2-20.4-74.7-20.4C73.6 140.2 0 186.1 0 293.5c0 61.4 22.1 126.9 49.5 169.2 19.5 29.6 42.5 62.8 73.1 61.7 29.3-1.1 40.5-19.4 76-19.4s45.9 19.4 75.1 18.8c30.9-.5 50.3-30.2 69.8-59.9 21.9-32.2 31-63.3 31.3-64.8-1.5-.6-60.4-23.1-60.6-91.5zm-56.6-166.4c27.1-32.8 22.7-62.3 21.9-73.3-21.2 1.3-46.3 14.2-61.3 31.7-13.3 15.4-24.6 40.1-21.5 66 23.2 1.8 46.8-11.3 60.9-24.4z"/>
  </svg>
);
const GooglePlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="30 336.7 1200 1200">
    <path fill="#FFD400" d="M892.8 814.7L775.1 697 92.9 350.6c-9.9-4.9-20.7-7.6-32-7.6-36.6 0-66.4 29.8-66.4 66.4V1362c0 36.6 29.8 66.4 66.4 66.4 11.3 0 22.1-2.7 32-7.6L775.1 1141l117.7-117.7-117.7-117.7z"/>
    <path fill="#FF3333" d="M1096.6 940.9L892.8 814.7l-117.7 117.7 117.7 117.7 203.8-126.2c21.5-13.3 21.5-44.4 0-57.7z"/>
    <path fill="#48FF48" d="M775.1 1141l-682.2 346.4c10.1 5 21.4 7.8 32.8 7.8 36.6 0 66.4-29.8 66.4-66.4V1390l582.9-249z"/>
    <path fill="#3BCCFF" d="M775.1 697l-582.9 249V697c0-36.6 29.8-66.4 66.4-66.4 11.3 0 22.7 2.8 32.8 7.8L775.1 697z"/>
  </svg>
);

/* typewriter */
const typeParent: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } };
const typeChar: Variants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } };

const Typewriter: React.FC<{ parts: Array<{ text: string; className: string }>; onDone?: () => void; }> = ({ parts, onDone }) => (
  <motion.span variants={typeParent} initial="hidden" animate="visible" onAnimationComplete={onDone} style={{ display: "inline-block" }}>
    {parts.flatMap((p, pi) =>
      Array.from(p.text).map((ch, ci) => (
        <motion.span key={`${pi}-${ci}`} variants={typeChar} className={p.className} style={{ display: "inline-block" }}>
          {ch}
        </motion.span>
      ))
    )}
  </motion.span>
);

const statsData = [
  { label: "Downloads", value: "1M+", color: "text-emerald-300" },
  { label: "Rating", value: "4.8★", color: "text-sky-300" },
  { label: "Live Updates", value: "24/7", color: "text-rose-300" },
];

const HeroCriccGenie: React.FC = () => {
  // 0 logo → 1 title → 2 subtitle → 3 ctas → 4 stats
  const [step, setStep] = useState(0);

  // NEW: loop the typewriter without breaking the sequence
  const [typeCycle, setTypeCycle] = useState(0);
  const [firstDone, setFirstDone] = useState(false);

  return (
    <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-transparent px-6 text-white">
      {/* 1) LOGO (slow) */}
      <motion.div
        initial={{ y: -120, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, duration: 1.1 }}
        onAnimationComplete={() => setStep(1)}
      >
        <Image
          src="/Logo/Logo.png"
          alt="CriccGenie"
          width={140}
          height={140}
          className="mx-auto h-40 w-40 rounded-2xl border border-white/15 bg-white/10 p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md"
        />
      </motion.div>

      {/* 2) HEADING (typewriter) */}
      <div className="relative mt-8 text-center">
        {step >= 1 && (
          <h1 className="text-4xl font-extrabold md:text-6xl">
            <span className="relative inline-flex items-baseline">
              {/* keep the caret logic same as your version: only before first completion */}
              {step === 1 && <span className="mr-1 h-[1.05em] w-[2px] animate-[blink_1s_steps(1,end)_infinite] bg-white/80" />}
              {/* key={typeCycle} restarts the animation to loop indefinitely */}
              <span key={typeCycle}>
                <Typewriter
                  parts={[
                    { text: "Cricc", className: "bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent" },
                    { text: "Genie", className: "text-sky-300" },
                    { text: " ", className: "" },
                  ]}
                  onDone={() => {
                    // advance the sequence only once
                    if (!firstDone) {
                      setFirstDone(true);
                      setStep(2);
                    }
                    // restart typing after a short pause
                    setTimeout(() => setTypeCycle((c) => c + 1), 800);
                  }}
                />
              </span>
              <span className="ml-2">🏏</span>
            </span>
          </h1>
        )}
      </div>

      {/* 3) SUBTITLE (after typing) */}
      <motion.p
        initial={{ y: 16, opacity: 0 }}
        animate={step >= 2 ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.55 }}
        onAnimationComplete={() => step === 2 && setStep(3)}
        className="mx-auto mt-10 max-w-2xl text-center text-base text-gray-200/90 md:text-lg"
      >
        Your Cricket Genie for Live Scores ✨ Real-time updates, instant scores, and deep coverage in a modern dark theme.
      </motion.p>

      {/* 4) CTAs (drop + fade) */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
        <motion.a
          href="#"
          initial={{ y: -12, opacity: 0 }}
          animate={step >= 3 ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
          onAnimationComplete={() => step === 3 && setStep(4)}
          className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-medium shadow-lg backdrop-blur-lg transition-all hover:-translate-y-1 hover:bg-white/15 active:scale-95"
        >
          <AppleIcon />
          <span>App Store</span>
        </motion.a>

        <motion.a
          href="#"
          initial={{ y: -12, opacity: 0 }}
          animate={step >= 3 ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
          className="group flex items-center gap-3 rounded-xl border border-emerald-300/30 bg-emerald-600/80 px-5 py-3 font-medium shadow-lg backdrop-blur-lg transition-all hover:-translate-y-1 hover:bg-emerald-500/80 active:scale-95"
        >
          <GooglePlayIcon />
          <span>Google Play</span>
        </motion.a>
      </div>

      {/* 5) STATS (last, rise from bottom) */}
      <div className="mt-15 grid w-full max-w-4xl grid-cols-3 gap-5">
        {statsData.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ y: 26, opacity: 0 }}
            animate={step >= 4 ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.12 * i, duration: 0.55, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-inner backdrop-blur-md transition-transform will-change-transform hover:-translate-y-1"
          >
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="mt-1 text-sm text-gray-300">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>
    </section>
  );
};

export default HeroCriccGenie;
