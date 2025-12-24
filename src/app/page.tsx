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
        <div className="flex flex-col items-center justify-Center pl-4 mx-auto max-w-7xl mb-8">
          <h2 className="text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Em Destaque
          </h2>
        </div>
        <BentoGridSecondDemo />
        <CardHomeDemo />
      </section>

      <main id="main-content" role="main" className="min-h-screen">
        <SpotlightWrapper />
      </main>
    </>
  );
}
