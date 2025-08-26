import GlobalBackground from "@/components/GlobalBackground";
import HeroCriccGenie from "@/components/HeroCriccGenie";
import FeaturesCriccGenie from "@/components/Features";
import ShowcaseCriccGenie from "@/components/ShowcaseCriccGenie";
import WhyChooseCriccGenie from "@/components/WhyChooseCriccGenie";
import DownloadCTA from "@/components/DownloadCTA";
import FaqCriccGenie from "@/components/FaqCriccGenie";
import FooterCriccGenie from "@/components/FooterCriccGenie";
export default function Page() {
  return (
    <>
      <GlobalBackground />
      <HeroCriccGenie />
      <FeaturesCriccGenie />
      <ShowcaseCriccGenie />
      <WhyChooseCriccGenie />
      <DownloadCTA/>
      <FaqCriccGenie />
      <FooterCriccGenie />
    </>
  );
}
