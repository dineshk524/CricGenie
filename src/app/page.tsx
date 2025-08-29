// app/page.tsx
"use client";
import React , { useState } from "react";
import GlobalBackground from "@/components/GlobalBackground";
// import IntroOverlay from "@/components/IntroOverlay";
import HeroCriccGenie from "@/components/HeroCriccGenie";
import FeaturesCriccGenie from "@/components/Features";
import ShowcaseCriccGenie from "@/components/ShowcaseCriccGenie";
import WhyChooseCriccGenie from "@/components/WhyChooseCriccGenie";
import DownloadCTA from "@/components/DownloadCTA";
import FaqCriccGenie from "@/components/FaqCriccGenie";
import FooterCriccGenie from "@/components/FooterCriccGenie";
import SlideIn from "@/components/SlideIn";
import IntroCriccGenie from "@/components/ntro";
export default function Page() {
   const [showIntro, setShowIntro] = useState(true);
  return (
    <>
      {/* <IntroOverlay /> */}
       {showIntro && (
      <IntroCriccGenie
  videoSrc="/Smoke/smoke.mp4"
  lampSrc="/Smoke/smk.png"
  logoSrc="/Logo/Logo.png"
  titleText="CricGenie"
  lampMs={2200}       // even faster lamp path
  videoRate={1.5}     // 50% faster smoke
  appearAtRatio={0.65} // show brand at ~65% of video
  leadMs={1200}       // or 1.2s before video ends (whichever is earlier)
  holdMs={900}        // keep brand for just under a second
  onDone={() => setShowIntro(false)}
/>

      )}

      <GlobalBackground />
      <HeroCriccGenie />

      <SlideIn from="left" delay={0.2}>
        <FeaturesCriccGenie />
      </SlideIn>

      <SlideIn from="right" delay={0.2}>
        <ShowcaseCriccGenie />
      </SlideIn>

      <SlideIn from="left" delay={0.2} >
        <WhyChooseCriccGenie />
      </SlideIn>

      <SlideIn from="right" delay={0.2} >
        <DownloadCTA />
      </SlideIn>

      <SlideIn from="left" delay={0.2} >
        <FaqCriccGenie />
      </SlideIn>

      <SlideIn from="right" delay={0.1} >
        <FooterCriccGenie />
      </SlideIn>
    </>
  );
}
