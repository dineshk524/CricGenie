// src/components/SlideIn.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, type TargetAndTransition } from "framer-motion";

type Dir = "left" | "right" | "top" | "bottom";

export default function SlideIn({
  children,
  from = "left",
  duration = 0.55,       // slightly faster
  delay = 0.10,          // lighter default delay
  enterRatio = 0.30,     // desktop: easier to enter
  exitRatio = 0.04,      // desktop: tiny exit threshold
  rootMargin = "-15% 0px -15% 0px",
  exitDebounceMs = 120,  // prevents jittery resets while scrolling
}: {
  children: React.ReactNode;
  from?: Dir;
  duration?: number;
  delay?: number;
  enterRatio?: number;
  exitRatio?: number;
  rootMargin?: string;
  exitDebounceMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const [ratio, setRatio] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const exitTimer = useRef<number | null>(null);

  // Detect mobile + reduced motion
  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => {
      setIsMobile(mqMobile.matches);
      setReduced(mqReduced.matches);
    };
    upd();
    mqMobile.addEventListener?.("change", upd);
    mqReduced.addEventListener?.("change", upd);
    window.addEventListener("resize", upd);
    return () => {
      mqMobile.removeEventListener?.("change", upd);
      mqReduced.removeEventListener?.("change", upd);
      window.removeEventListener("resize", upd);
    };
  }, []);

  // Directional hidden state (smaller offset on mobile)
  const hidden: TargetAndTransition =
    from === "left"
      ? { opacity: 0, x: isMobile ? -18 : -56 }
      : from === "right"
      ? { opacity: 0, x: isMobile ? 18 : 56 }
      : from === "top"
      ? { opacity: 0, y: isMobile ? -18 : -56 }
      : { opacity: 0, y: isMobile ? 18 : 56 };

  // Show immediately if reduced motion or no IO support
  useEffect(() => {
    if (reduced || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      controls.set({ opacity: 1, x: 0, y: 0 });
    }
  }, [controls, reduced]);

  // Observe visibility (mobile thresholds are friendlier)
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const mobileMargin = "0px 0px 0px 0px"; // no shrink on tiny viewports
    const obs = new IntersectionObserver(
      ([entry]) => setRatio(entry.intersectionRatio),
      {
        root: null,
        rootMargin: isMobile ? mobileMargin : rootMargin,
        threshold: Array.from({ length: 41 }, (_, i) => i / 40), // smooth ratio updates
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile, rootMargin, reduced]);

  // Enter/exit with hysteresis (debounced reset)
  useEffect(() => {
    if (reduced) return;

    const mobileEnter = 0.14;
    const mobileExit = 0.0;

    const shouldEnter = ratio >= (isMobile ? mobileEnter : enterRatio);
    const shouldExit  = ratio <= (isMobile ? mobileExit  : exitRatio);

    if (shouldEnter) {
      if (exitTimer.current) {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
      controls.start({ opacity: 1, x: 0, y: 0 });
    } else if (shouldExit) {
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      exitTimer.current = window.setTimeout(() => {
        controls.set(hidden); // reset so it can replay when re-entering
      }, exitDebounceMs) as unknown as number;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratio, isMobile, enterRatio, exitRatio, hidden, reduced]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={controls}
      transition={{
        duration: reduced ? 0 : (isMobile ? 0.42 : duration),
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
