// app/page.tsx
"use client";
import React from "react";
import GlobalBackground from "@/components/GlobalBackground";
import IntroOverlay from "@/components/IntroOverlay";
import HeroCricGenie from "@/components/HeroCricGenie";
import FeaturesCricGenie from "@/components/Features";
import ShowcaseCricGenie from "@/components/ShowcaseCricGenie";
import WhyChooseCricGenie from "@/components/WhyChooseCricGenie";
import DownloadCTA from "@/components/DownloadCTA";
import FaqCricGenie from "@/components/FaqCricGenie";
import FooterCricGenie from "@/components/FooterCricGenie";
import SlideIn from "@/components/SlideIn";

export default function Page() {
  return (
    <>
      <IntroOverlay />
      <GlobalBackground />
      <HeroCricGenie />

      <SlideIn from="left" delay={0.2}>
        <FeaturesCricGenie />
      </SlideIn>

      <SlideIn from="right" delay={0.2}>
        <ShowcaseCricGenie />
      </SlideIn>

      <SlideIn from="left" delay={0.2} >
        <WhyChooseCricGenie />
      </SlideIn>

      <SlideIn from="right" delay={0.2} >
        <DownloadCTA />
      </SlideIn>

      <SlideIn from="left" delay={0.2} >
        <FaqCricGenie />
      </SlideIn>

      <SlideIn from="right" delay={0.1} >
        <FooterCricGenie />
      </SlideIn>
    </>
  );
}
