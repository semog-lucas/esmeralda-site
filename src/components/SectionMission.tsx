"use client";
import React, { useRef } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { CardHoverEffectDemo } from "@/components/CardEffect";
import { motion, useScroll, useTransform } from "framer-motion";

export function MissaoHome() {
  const ref = useRef(null);

  // conecta scroll ao container principal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // cria transformações para o parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <section
      ref={ref}
      className="relative z-10 min-h-screen py-20 w-full flex flex-col items-center justify-center gap-12 bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden"
    >
      {/* 🔥 Spotlight com efeito parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 -z-10"
      >
        <Spotlight />
      </motion.div>

      <div className="text-center space-y-4 px-4 relative z-20">
        <h2 className="max-w-4xl mx-auto text-3xl md:text-6xl font-bold text-neutral-800 dark:text-neutral-200 font-sans tracking-tight">
          Qual a Missão da <span className="text-emerald-500">Esmeralda</span>?
        </h2>
        <p className="max-w-2xl mx-auto text-neutral-500 text-sm md:text-lg">
          Nossa essência é transformar complexidade em elegância através de
          código e design.
        </p>
      </div>

      {/* 🔽 Cards embaixo */}
      <div className="relative z-20 w-full">
        <CardHoverEffectDemo />
      </div>
    </section>
  );
}
