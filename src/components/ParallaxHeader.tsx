"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface ParallaxHeaderProps {
  children: React.ReactNode;
}

export default function ParallaxHeader({ children }: ParallaxHeaderProps) {
  const ref = useRef(null);

  // progresso do scroll do header
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], 
  });

  // parallax background (move no eixo Y)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.header
      ref={ref}
      className="w-full px-9 py-8 sm:py-12 md:py-16 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero-home.jpg')",
        backgroundPositionY: bgY,
      }}
      role="banner"
      aria-label="Cabeçalho principal da página inicial"
    >
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </motion.header>
  );
}