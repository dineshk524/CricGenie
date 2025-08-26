"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  /** number of particles on desktop */
  count?: number;
  /** fraction that are red cricket-balls, e.g. 0.25 = 25% red */
  redRatio?: number;
  /** pixels per second drift speed base */
  speed?: number;
  /** min/max size in px */
  sizeRange?: [number, number];
  /** global opacity multiplier (0–1) */
  opacity?: number;
};

const BackgroundBalls: React.FC<Props> = ({
  count = 180,
  redRatio = 0.22,
  speed = 8,                // very gentle drift
  sizeRange = [2, 3],
  opacity = 0.9,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<
    Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; baseAlpha: number; t: number; tSpeed: number; color: "white" | "red";
    }>
  >([]);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pickColor = () => (Math.random() < redRatio ? "red" : "white");

    const initParticles = (w: number, h: number, n: number) => {
      const arr: typeof particlesRef.current = [];
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = rand(speed * 0.5, speed * 1.2) / 60; // px per frame
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: rand(sizeRange[0], sizeRange[1]),
          baseAlpha: rand(0.35, 0.9),
          t: Math.random() * Math.PI * 2,
          tSpeed: rand(0.01, 0.025), // twinkle speed
          color: pickColor(),
        });
      }
      particlesRef.current = arr;
    };

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // scale particle count for small screens
      const responsiveCount = Math.round(
        count * Math.min(1, Math.max(0.6, w / 1440))
      );
      initParticles(w, h, responsiveCount);
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const arr = particlesRef.current;
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];

        // advance
        p.t += p.tSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges to stay infinite without scroll issues
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        // twinkle factor: 0.75..1.0
        const tw = 0.75 + Math.abs(Math.sin(p.t)) * 0.25;

        // color + alpha
        const a = p.baseAlpha * tw * opacity;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color === "red" ? "rgb(239,68,68)" : "rgb(255,255,255)"; // tailwind rose-500 like & white

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // pause when tab not visible
    const onVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, redRatio, speed, sizeRange, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default BackgroundBalls;
