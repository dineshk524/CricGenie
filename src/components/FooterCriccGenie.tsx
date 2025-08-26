"use client";

import React from "react";
import Image from "next/image";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";

const FooterCriccGenie: React.FC = () => {
  return (
    <footer className="relative overflow-hidden  text-gray-300">
      {/* floating glow orbs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="CriccGenie"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-white">CriccGenie</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-gray-400">
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
                    className="flex size-9 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-all hover:-translate-y-1 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* app links */}
          <div>
            <h4 className="text-lg font-semibold text-white">App</h4>
            <ul className="mt-4 space-y-3 text-sm">
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
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-3 text-sm">
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
        <div className="my-8 h-px bg-white/10" />

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
          <p>© 2025 CriccGenie. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:support@criccgenie.com" className="hover:text-emerald-400">
              support@criccgenie.com
            </a>
            <span>Available on iOS & Android</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCriccGenie;
