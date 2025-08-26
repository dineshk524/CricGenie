"use client";

import React from "react";

/** Fixed, shared background for the whole page */
const GLOW = [
  { size: 360, hue: 180, x: "6%",  y: "12%", path: "xy", dur: 42 },
  { size: 260, hue: 280, x: "78%", y: "18%", path: "x",  dur: 48 },
  { size: 220, hue:  40, x: "16%", y: "72%", path: "y",  dur: 38 },
  { size: 300, hue: 200, x: "60%", y: "75%", path: "xy", dur: 55 },
  { size: 260, hue: 160, x: "22%", y: "86%", path: "x",  dur: 45 },
  { size: 280, hue: 100, x: "90%", y: "42%", path: "y",  dur: 52 },
];

const GlobalBackground: React.FC = () => {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0b0c10]">
        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />
        {/* drifting glows */}
        {GLOW.map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-55 blur-2xl animate-drift-${b.path}`}
            style={{
              width: b.size,
              height: b.size,
              left: b.x as string,
              top: b.y as string,
              background: `radial-gradient(circle at 35% 35%,
                hsl(${b.hue} 80% 60% / 0.9) 0%,
                hsl(${b.hue} 80% 60% / 0.35) 45%,
                transparent 70%)`,
              animationDuration: `${b.dur}s`,
            }}
          />
        ))}
        {/* faint grain to avoid banding */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><rect width=%2240%22 height=%2240%22 fill=%22%23000%22/><circle cx=%221%22 cy=%221%22 r=%221%22 fill=%22white%22 opacity=%220.12%22/></svg>')] [background-size:40px_40px]" />
      </div>

      {/* Global keyframes used by all sections */}
      <style jsx global>{`
        .animate-drift-x { animation: drift-x 36s ease-in-out infinite; }
        .animate-drift-y { animation: drift-y 44s ease-in-out infinite; }
        .animate-drift-xy { animation: drift-xy 52s ease-in-out infinite; }
        @keyframes drift-x { 0%,100%{transform:translateX(0)} 50%{transform:translateX(160px)} }
        @keyframes drift-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(140px)} }
        @keyframes drift-xy{
          0%{transform:translate(0,0)}
          33%{transform:translate(120px,60px)}
          66%{transform:translate(-70px,140px)}
          100%{transform:translate(0,0)}
        }
        .animate-magic-spin { animation: magic-spin 60s linear infinite; }
        @keyframes magic-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .animate-fade-up { animation: fadeUp .7s ease-out both; }
        @keyframes fadeUp { from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:translateY(0)} }
        @keyframes cardSheen { 0%{background-position:200% 0} 100%{background-position:-100% 0} }
        @keyframes fadeUp_ { from{opacity:0; transform:translateY(18px)} to{opacity:1; transform:translateY(0)} }
      `}</style>
    </>
  );
};

export default GlobalBackground;
