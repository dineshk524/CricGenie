"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";

type Props = {
  children: React.ReactNode;
  /** px offset before reveal (positive = down/right) */
  y?: number;
  x?: number;
  /** ms delay for the reveal */
  delay?: number;
  /** duration in ms */
  duration?: number;
  /** reveal only once (true) or every time it enters (false) */
  once?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  y = 16,
  x = 0,
  delay = 0,
  duration = 600,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, amount: 0.35, margin: "-10% 0px -10% 0px" });

  const style: React.CSSProperties = {
    transform: inView ? "none" : `translate(${x}px, ${y}px)`,
    opacity: inView ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    willChange: "transform, opacity",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
