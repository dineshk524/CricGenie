// app/page.tsx
"use client";
import React from "react";
import GlobalBackground from "@/components/GlobalBackground";
import IntroOverlay from "@/components/IntroOverlay";
import HeroCriccGenie from "@/components/HeroCriccGenie";
import FeaturesCriccGenie from "@/components/Features";
import ShowcaseCriccGenie from "@/components/ShowcaseCriccGenie";
import WhyChooseCriccGenie from "@/components/WhyChooseCriccGenie";
import DownloadCTA from "@/components/DownloadCTA";
import FaqCriccGenie from "@/components/FaqCriccGenie";
import FooterCriccGenie from "@/components/FooterCriccGenie";
import SlideIn from "@/components/SlideIn";

export default function Page() {
  return (
    <>
      <IntroOverlay />
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
