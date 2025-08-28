"use client";

import React from "react";

const AppleIcon = () => (
  <svg viewBox="0 0 384 512" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.5-18.8-26.6-47.5-41.2-85.2-44.7-35.8-3.3-74.2 21.1-87.8 21.1-14.3 0-48.2-20.4-74.7-20.4C73.6 140.2 0 186.1 0 293.5c0 61.4 22.1 126.9 49.5 169.2 19.5 29.6 42.5 62.8 73.1 61.7 29.3-1.1 40.5-19.4 76-19.4s45.9 19.4 75.1 18.8c30.9-.5 50.3-30.2 69.8-59.9 21.9-32.2 31-63.3 31.3-64.8-1.5-.6-60.4-23.1-60.6-91.5zm-56.6-166.4c27.1-32.8 22.7-62.3 21.9-73.3-21.2 1.3-46.3 14.2-61.3 31.7-13.3 15.4-24.6 40.1-21.5 66 23.2 1.8 46.8-11.3 60.9-24.4z"/>
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 512 512" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M71 47c-10-5-22-5-31 1-9 6-15 16-15 27v362c0 11 6 21 15 27 9 6 21 7 31 1l331-181c10-6 16-16 16-28s-6-22-16-28L71 47z"/>
  </svg>
);

const ChipIcon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={path} />
  </svg>
);

const DownloadCTA: React.FC = () => {
  return (
    <section className="relative -mt-6 sm:-mt-8 overflow-hidden px-6 py-16 text-white md:py-20 bg-transparent">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Ready to Experience Cricket{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            Like Never Before?
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
          Download CriccGenie now and join the ultimate cricket community!
        </p>

        {/* store buttons (no animations) */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {/* App Store */}
          <a
            href="#"
            aria-label="Get on App Store"
            className="inline-flex items-center gap-3 rounded-2xl px-7 py-4 text-base font-medium bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
          >
            <AppleIcon />
            <span className="font-semibold">Download on the app store</span>
          </a>

          {/* Play Store */}
          <a
            href="#"
            aria-label="Get on Play Store"
            className="inline-flex items-center gap-3 rounded-2xl px-7 py-4 text-base font-medium bg-emerald-600/80 border border-emerald-300/40 backdrop-blur-md hover:bg-emerald-500/80 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 transition-colors"
          >
            <PlayIcon />
            <span className="font-semibold">Get it on Play Store</span>
          </a>
        </div>

        {/* chips row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-200">
          {[
            { label: "iOS & Android", path: "M5 12h14M12 5v14" },
            { label: "Free Download", path: "M12 5v14m0 0l-4-4m4 4l4-4" },
            { label: "Secure & Safe", path: "M6 10V8a6 6 0 0112 0v2M5 10h14v8H5z" },
            { label: "Instant Updates", path: "M21 12a9 9 0 10.8 3.6M21 12h-6" },
          ].map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-sm backdrop-blur-md"
            >
              <ChipIcon path={c.path} />
              {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* stripped all button animations from the stylesheet */}
      <style jsx>{``}</style>
    </section>
  );
};

export default DownloadCTA;
