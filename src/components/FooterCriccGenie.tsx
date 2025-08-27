"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";

const FooterCriccGenie: React.FC = () => {
  // show the FAB only after a small scroll
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    try {
      // smooth scroll (supported widely)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="relative overflow-hidden text-gray-300">
      {/* floating glow orbs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="CriccGenie"
                width={78}
                height={68}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-white">CriccGenie</span>
            </div>
            <p className="mt-4 max-w-sm text-base text-gray-400 md:text-lg">
              Your ultimate cricket companion for live scores, match updates,
              and deep coverage. Built by fans, for fans.
            </p>

            {/* socials */}
            <div className="mt-6 flex gap-4">
              {[FaXTwitter, FaInstagram, FaFacebookF, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="flex size-10 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-all hover:-translate-y-1 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    <Icon size={18} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* app links */}
          <div>
            <h4 className="text-xl font-semibold text-white md:text-2xl">
              App
            </h4>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Screenshots
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Download
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* support */}
          <div>
            <h4 className="text-xl font-semibold text-white md:text-2xl">
              Support
            </h4>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400">
                  Bug Report
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row md:text-base">
          <p>© 2025 CriccGenie. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:support@criccgenie.com"
              className="hover:text-emerald-400"
            >
              support@criccgenie.com
            </a>
            <span>Available on iOS & Android</span>
          </div>
        </div>
      </div>

      {/* Scroll-to-top FAB */}
      <button
        type="button"
        onClick={goTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full 
                    border border-white/15 bg-white/10 backdrop-blur-xl text-white 
                    shadow-[0_8px_30px_rgba(0,0,0,.3)] transition-all 
                    hover:-translate-y-1 hover:bg-white/15
                    ${
                      showTop
                        ? "opacity-100 scale-100"
                        : "pointer-events-none opacity-0 scale-95"
                    }`}
      >
        {/* glow ring */}
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-emerald-400/30 via-sky-400/20 to-fuchsia-400/30 blur-xl opacity-60 animate-[pulseGlow_2.2s_ease-in-out_infinite]" />
        {/* arrow icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes pulseGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.9;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterCriccGenie;
