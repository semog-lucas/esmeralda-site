import HeroSection from "@/components/HeroSection";
import ParallaxHeader from "@/components/ParallaxHeader";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import { BentoGridSecondDemo } from "@/components/GridHome";
import CardHomeDemo from "@/components/CardHome";

export default async function HomePage() {
  return (
    <>
      {/* HEADER COM PARALLAX */}
      <ParallaxHeader>
        <HeroSection />
      </ParallaxHeader>

      <section className="w-full min-h-screen mt-20">
        <BentoGridSecondDemo />
        <CardHomeDemo />
      </section>

      <main id="main-content" role="main" className="min-h-screen">
        <SpotlightWrapper />
      </main>
    </>
  );
}
