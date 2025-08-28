"use client";

import React from "react";

/**
 * CRICKET BACKGROUND — Simpler
 *
 * - Fixed main background image
 * - Dark overlay with higher opacity so page content stays readable
 * - GIF layer commented out (can be re-enabled later)
 */

export type CricketBackgroundProps = {
  bgSrc?: string;
  dim?: number;
};

const CricketBackground: React.FC<CricketBackgroundProps> = ({
  bgSrc =
    "https://png.pngtree.com/background/20250102/original/pngtree-icc-cricket-world-match-background-picture-image_13431639.jpg",
  dim = 0.7,
}) => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "saturate(1.02) contrast(1.1) brightness(0.8)",
        }}
      />

      {/**
       * GIF overlay (disabled for now)
       *
       * <div
       *   className="absolute inset-0"
       *   style={{
       *     backgroundImage: `url(${gifSrc})`,
       *     backgroundSize: "cover",
       *     backgroundPosition: "center",
       *     backgroundRepeat: "no-repeat",
       *     opacity: 0.2,
       *     mixBlendMode: "screen",
       *   }}
       * />
       */}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${Math.min(Math.max(dim, 0), 1)})` }}
      />
    </div>
  );
};

export default CricketBackground;
