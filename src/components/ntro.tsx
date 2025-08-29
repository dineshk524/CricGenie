// src/components/IntroCriccGenie.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type IntroProps = {
  videoSrc?: string;
  lampSrc?: string;
  logoSrc?: string;
  titleText?: string;
  appearAtRatio?: number; // when to begin revealing title relative to video progress
  leadMs?: number;         // or this many ms before video ends (whichever is earlier)
  holdMs?: number;         // how long to hold title fully visible before fading out
  lampMs?: number;          // lamp travel time
  videoRate?: number;       // video speed
  titleDelayRatio?: number; // when to begin revealing title relative to video progress
  onDone?: () => void;
};

const IntroCriccGenie: React.FC<IntroProps> = ({
  videoSrc = "/smoke.mp4",
  lampSrc = "/smk.png",
  titleText = "CricGenie",
  lampMs = 2600,
  videoRate = 1.35,
  titleDelayRatio = 0.35,
  onDone,
}) => {
  const [hidden, setHidden] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [titleProgress, setTitleProgress] = useState(0); // 0..1
  const [isMobile, setIsMobile] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const lampImgRef = useRef<HTMLDivElement>(null);

  // responsive flag
  useEffect(() => {
    const mm = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsMobile(mm.matches);
    handler();
    mm.addEventListener?.("change", handler);
    return () => mm.removeEventListener?.("change", handler);
  }, []);

  // Lamp reverse-V → then start video (speeded up)
  useEffect(() => {
    if (!moverRef.current || !lampImgRef.current || !videoRef.current) return;

    const mover = moverRef.current!;
    const lamp  = lampImgRef.current!;
    const video = videoRef.current!;

    video.preload = "auto";
    video.defaultPlaybackRate = videoRate;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // mobile tweaks
    const imgW = isMobile ? 150 : 220;
    const imgH = isMobile ? 136 : 200;
    const leftPadding = isMobile ? 0 : 40;

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
      try { video.playbackRate = videoRate; } catch {}
      video.classList.add("videoVisible");
    };

    return () => {
      pathAnim?.cancel();
      tiltAnim?.cancel();
    };
  }, [lampMs, videoRate, isMobile]);

  // Title reveal tied to video playback; lamp stays visible until BOTH fade at the end
  useEffect(() => {
    const video = videoRef.current;
    const mover = moverRef.current;
    if (!video) return;

    const onPlaying = () => {
      setVideoStarted(true);
      // NOTE: do NOT fade lamp here anymore — we keep it until the end.
    };

    const onTimeUpdate = () => {
      const d = video.duration, t = video.currentTime;
      if (isFinite(d) && d > 0) {
        const ratio = Math.min(1, Math.max(0, t / d));
        if (ratio < titleDelayRatio) {
          setTitleProgress(0);
        } else {
          const span = Math.max(0.001, 1 - titleDelayRatio);
          setTitleProgress(Math.min(1, (ratio - titleDelayRatio) / span));
        }
      }
    };

    const fadeBothAndEnd = () => {
      // ⬅️ fade lamp + smoke TOGETHER
      mover?.classList.add("moverOut");
      video.classList.add("videoOut");
      // after their transitions, hide overlay
      setTimeout(() => {
        overlayRef.current?.classList.add("introFadeOut");
        setHidden(true);
        onDone?.();
      }, 380);
    };

    const onEnded = fadeBothAndEnd;

    video.addEventListener("playing", onPlaying, { once: true });
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded, { once: true });

    // hard fallback
    const hard = window.setTimeout(fadeBothAndEnd, 12000);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      window.clearTimeout(hard);
    };
  }, [titleDelayRatio, onDone]);

  if (hidden) return null;

  const mobileTitleShift = isMobile ? -12 : 0;

  return (
    <div ref={overlayRef} className="introRoot">
      {/* BG image */}
      <div className="bgOverlay" />

      {/* Smoke video (below title) */}
      <video ref={videoRef} className="video" src={videoSrc} muted playsInline preload="auto" />

      {/* Title ABOVE the video, only after video begins */}
      {videoStarted && (
        <div
          className="titleOver"
          style={{
            opacity: titleProgress,
            transform: `translateY(${mobileTitleShift + (1 - titleProgress) * 12}px) scale(${0.98 + 0.02 * titleProgress})`,
          }}
        >
          {titleText}
        </div>
      )}

      {/* Lamp layer (stays until the end) */}
      <div ref={moverRef} className="mover">
        <div
          ref={lampImgRef}
          className="lampWrap"
          style={{ width: isMobile ? 150 : 220, height: isMobile ? 136 : 200 }}
        >
          <Image
            src={lampSrc}
            alt="Lamp"
            width={isMobile ? 150 : 220}
            height={isMobile ? 136 : 200}
            className="lamp"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .introRoot {
          position: fixed; inset: 0; z-index: 9999;
          display: grid; place-items: center;
          background: #000;
          opacity: 1; visibility: visible;
          transition: opacity 300ms ease, visibility 300ms ease;
        }
        .introFadeOut { opacity: 0; visibility: hidden; pointer-events: none; }

        .bgOverlay {
          position: absolute; inset: 0; z-index: -3;
          background: url("https://t3.ftcdn.net/jpg/09/73/36/68/360_F_973366841_yGH8DXoBqqoHYa6otw6qLoplRnskRAl7.jpg") center/cover no-repeat;
          filter: brightness(0.4); opacity: 0.5;
        }

        .video {
          position: absolute; inset: 0; z-index: -2;
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 450ms ease, filter 380ms ease;
        }
        .videoVisible { opacity: 1; }
        .videoOut { opacity: 0; filter: blur(6px); } /* fades at same time as lamp */

        .titleOver {
          position: absolute; inset: 0; z-index: -1; /* above video (-2), below lamp (0) */
          display: grid; place-items: center;
          color: #ffffff;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: clamp(26px, 7vw, 86px);
          text-align: center;
          text-shadow: 0 6px 28px rgba(0,0,0,.65);
          mix-blend-mode: screen;
          pointer-events: none;
          will-change: opacity, transform;
        }

        .mover { position: absolute; top: 0; right: 0; will-change: transform; z-index: 0; }
        .moverOut { opacity: 0; transition: opacity 380ms ease; } /* ⬅️ matches .videoOut timing */

        .lamp {
          width: 100%; height: 100%;
          mix-blend-mode: screen; user-select: none;
          filter: drop-shadow(0 0 18px rgba(255,255,255,.2));
        }

        @media (max-width: 640px) {
          .titleOver {
            letter-spacing: 0.10em;
            text-shadow: 0 4px 18px rgba(0,0,0,.7);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroCriccGenie;
