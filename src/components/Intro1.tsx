// src/components/IntroCriccGenie.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type IntroProps = {
  videoSrc?: string;
  lampSrc?: string;
  logoSrc?: string;
  titleText?: string;
  /** how long logo + title stay visible AFTER brandIn finishes */
  holdMs?: number;
  /** show brand this many ms BEFORE video ends (smaller = earlier) */
  leadMs?: number;
  /** OR: show at duration * ratio (e.g., 0.7 = 70% through the video) */
  appearAtRatio?: number;
  /** playback speed of the smoke video (1 = normal, 1.4 = 40% faster) */
  videoRate?: number;
  /** shorten the lamp path time if you want everything sooner */
  lampMs?: number;
  onDone?: () => void;
};

const IntroCriccGenie: React.FC<IntroProps> = ({
  videoSrc = "/smoke.mp4",
  lampSrc = "/smk.png",
  logoSrc = "/your-logo.png",
  titleText = "CricGenie",
  holdMs = 1000,
  // make the brand appear noticeably earlier by default
  leadMs = 900,
  appearAtRatio = 0.7,
  videoRate = 1.35,  // ⬅️ play video ~35% faster
  lampMs = 2600,     // ⬅️ faster lamp move (was 3200–4200)
  onDone,
}) => {
  const [hidden, setHidden] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const moverRef   = useRef<HTMLDivElement>(null);
  const lampImgRef = useRef<HTMLDivElement>(null);
  const brandRef   = useRef<HTMLDivElement>(null);

  // Lamp reverse-V → then fade-in & speed-up video
  useEffect(() => {
    if (!moverRef.current || !lampImgRef.current || !videoRef.current) return;

    const mover = moverRef.current!;
    const lamp  = lampImgRef.current!;
    const video = videoRef.current!;

    // prep video for fastest start
    video.preload = "auto";
    // set rate now; on iOS/Safari we’ll set again after play()
    video.defaultPlaybackRate = videoRate;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const imgW = 220, imgH = 200, leftPadding = 40;

    const midX   = -vw * 0.45;
    const midY   =  vh * 0.40;
    const finalX = -(vw - (leftPadding + imgW));
    const finalY = (vh / 2) - (imgH / 2);

    const pathAnim = mover.animate(
      [
        { transform: "translate(0px, 0px)", offset: 0, easing: "ease-in" },
        { transform: `translate(${midX}px, ${midY}px)`, offset: 0.55, easing: "cubic-bezier(.2,.7,.2,1)" },
        { transform: `translate(${finalX}px, ${finalY}px)`, offset: 1, easing: "cubic-bezier(.2,.6,.2,1)" },
      ],
      { duration: lampMs, fill: "forwards" }
    );

    const tiltAnim = lamp.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(10deg)", offset: 0.35 },
        { transform: "rotate(-8deg)", offset: 0.75 },
        { transform: "rotate(0deg)" },
      ],
      { duration: lampMs, easing: "ease-in-out", fill: "forwards" }
    );

    pathAnim.onfinish = async () => {
      try { await video.play(); } catch {}
      // enforce playback rate after play() for Safari/iOS
      try { video.playbackRate = videoRate; } catch {}
      video.classList.add("videoVisible");
    };

    return () => {
      pathAnim?.cancel();
      tiltAnim?.cancel();
    };
  }, [lampMs, videoRate]);

  // Schedule brand (logo + heading) earlier than video end
  useEffect(() => {
    const video = videoRef.current;
    const brand = brandRef.current;
    const mover = moverRef.current;

    if (!video || !brand || !mover) return;

    let scheduled = false;

    const showBrandTogether = () => {
      if ((brand as any).dataset.shown) return;
      (brand as any).dataset.shown = "1";

      mover.classList.add("moverFade");  // hide lamp
      video.classList.add("videoSoft");  // soften bg
      brand.classList.add("brandShow");  // brand in

      const onBrandIn = (e: AnimationEvent) => {
        if (e.animationName !== "brandIn") return;
        brand.classList.add("brandPulse");

        const t = setTimeout(() => {
          brand.classList.remove("brandPulse");
          brand.classList.add("brandFadeOut");
          overlayRef.current?.classList.add("introFadeOut");
          setHidden(true);
          onDone?.();
        }, holdMs);

        brand.removeEventListener("animationend", onBrandIn);
        return () => clearTimeout(t);
      };

      brand.addEventListener("animationend", onBrandIn as any, { once: true });
    };

    const onLoadedMeta = () => {
      const d = video.duration; // seconds
      if (!isFinite(d) || d <= 0) return;

      // compute earlier trigger between: (duration - leadMs) vs (duration * appearAtRatio)
      const atMsA = d * 1000 - leadMs;
      const atMsB = d * 1000 * appearAtRatio;
      const when  = Math.max(0, Math.min(atMsA, atMsB));

      window.setTimeout(() => !hidden && showBrandTogether(), when);
      scheduled = true;
    };

    video.addEventListener("loadedmetadata", onLoadedMeta);

    // backup near-end watcher
    const onTimeUpdate = () => {
      if (scheduled) return;
      const d = video.duration, t = video.currentTime;
      if (isFinite(d) && d > 0) {
        const leftMs = (d - t) * 1000;
        const threshold = Math.min(leadMs, d * 1000 * (1 - appearAtRatio)) + 50;
        if (leftMs <= threshold) {
          showBrandTogether();
          scheduled = true;
        }
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);

    // hard fallback after 12s
    const hard = window.setTimeout(() => {
      if (!hidden) {
        overlayRef.current?.classList.add("introFadeOut");
        setHidden(true);
        onDone?.();
      }
    }, 12000);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      video.removeEventListener("timeupdate", onTimeUpdate);
      window.clearTimeout(hard);
    };
  }, [holdMs, leadMs, appearAtRatio, onDone, hidden]);

  if (hidden) return null;

  return (
    <div ref={overlayRef} className="introRoot">
      <div className="bgOverlay" />

      <video
        ref={videoRef}
        className="video"
        src={videoSrc}
        muted
        playsInline
        preload="auto"
      />

      <div ref={moverRef} className="mover">
        <div ref={lampImgRef} className="lampWrap">
          <Image src={lampSrc} alt="Lamp" width={220} height={200} className="lamp" priority />
        </div>
      </div>

      <div className="centerStage">
        <div ref={brandRef} className="brand">
          <Image src={logoSrc} alt="Logo" width={280} height={120} className="logo" priority />
          <div className="title">{titleText}</div>
        </div>
      </div>

      <style jsx>{`
        .introRoot { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; background: #000;
          opacity: 1; visibility: visible; transition: opacity 300ms ease, visibility 300ms ease; }
        .introFadeOut { opacity: 0; visibility: hidden; pointer-events: none; }

        .bgOverlay { position: absolute; inset: 0; z-index: -3;
          background: url("https://t3.ftcdn.net/jpg/09/73/36/68/360_F_973366841_yGH8DXoBqqoHYa6otw6qLoplRnskRAl7.jpg") center/cover no-repeat;
          filter: brightness(0.4); opacity: 0.5; }

        .video { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 450ms ease, filter 400ms ease; }
        .videoVisible { opacity: 1; }
        .videoSoft { opacity: 0; filter: blur(6px); }

        .mover { position: absolute; top: 0; right: 0; will-change: transform; z-index: -1; }
        .moverFade { opacity: 0; transition: opacity 250ms ease; }

        .lampWrap { width: 220px; height: 200px; }
        .lamp { width: 220px; height: 200px; mix-blend-mode: screen; user-select: none; filter: drop-shadow(0 0 20px rgba(255,255,255,.2)); }

        .centerStage { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; z-index: 2; }
        .brand { display: flex; flex-direction: column; align-items: center; gap: clamp(10px, 2.5vw, 20px);
          opacity: 0; transform: scale(.9); filter: blur(6px); will-change: transform, opacity, filter; }
        .brandShow { animation: brandIn 700ms ease forwards; }
        @keyframes brandIn {
          0% { opacity: 0; transform: scale(.90); filter: blur(6px); }
          60% { opacity: 1; transform: scale(1.04); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .brandPulse { animation: brandIn 700ms ease forwards, brandPulse 1400ms ease-in-out infinite 700ms; }
        @keyframes brandPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        .brandFadeOut { animation: brandOut 380ms ease forwards; }
        @keyframes brandOut { to { opacity: 0; transform: scale(.98) translateY(-6px); filter: blur(2px); } }

        .logo { width: clamp(140px, 22vw, 280px); height: auto; display: block; }
        .title { color: #f5f5f5; text-align: center; letter-spacing: .12em; text-transform: uppercase; font-weight: 800;
          font-size: clamp(22px, 6vw, 56px); text-shadow: 0 4px 24px rgba(0,0,0,.6); }
      `}</style>
    </div>
  );
};

export default IntroCriccGenie;
