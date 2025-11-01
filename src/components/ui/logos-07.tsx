// components/logos-07.tsx
"use client";

import { useEffect, useState } from "react";
import {
  TechLogo01,
  TechLogo02,
  TechLogo03,
  TechLogo04,
  TechLogo05,
  TechLogo06,
  TechLogo07,
  TechLogo08,
  TechLogo09,
  TechLogo10,
  TechLogo11,
} from "@/components/tech-logos";
import { Marquee } from "@/components/ui/marquee";

const Logos07Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="overflow-hidden">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Habilidades Utilizadas
          </h2>
          <div className="mt-14 max-w-(--breakpoint-xl) space-y-8">
            <div className="flex gap-10 justify-center opacity-50">
              <TechLogo01 />
              <TechLogo02 />
              <TechLogo03 />
              <TechLogo04 />
              <TechLogo05 />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="overflow-hidden">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Habilidades Utilizadas
          </h2>

          <div className="mt-14 max-w-(--breakpoint-xl) space-y-8">
            <Marquee
              pauseOnHover
              className="[--duration:40s] [&_svg]:mr-10"
            >
              <TechLogo01 />
              <TechLogo02 />
              <TechLogo03 />
              <TechLogo04 />
              <TechLogo05 />
              <TechLogo06 />
              <TechLogo07 />
              <TechLogo08 />
              <TechLogo09 />
              <TechLogo10 />
              <TechLogo11 />
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              className="[--duration:40s] [&_svg]:mr-10"
            >
              <TechLogo01 />
              <TechLogo02 />
              <TechLogo03 />
              <TechLogo04 />
              <TechLogo05 />
              <TechLogo06 />
              <TechLogo07 />
              <TechLogo08 />
              <TechLogo09 />
              <TechLogo10 />
              <TechLogo11 />
            </Marquee>
          </div>
        </div>
      </div>
   
      <style jsx global>{`
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-100% - 1rem)); }
  }
  
  @keyframes marquee-reverse {
    0% { transform: translateX(calc(-100% - 1rem)); }
    100% { transform: translateX(0); }
  }
  
  .animate-marquee {
    animation: marquee 40s linear infinite;
  }
  
  .animate-marquee-reverse {
    animation: marquee-reverse 40s linear infinite;
  }
  
  .group:hover .group-hover\:\[animation-play-state\:paused\] {
    animation-play-state: paused;
  }
`}</style>
    </>
  );
};

export default Logos07Page;