"use client";
import HeroPage from "@/components/HeroPage";
import { UserIcon } from "lucide-react";
import { TimelineDemo } from "@/components/TimelineAbout";
import { useRef } from "react";
import { motion as m } from "framer-motion";
import Logos07Page from "@/components/ui/logos-07";

export default function AboutPage() {
  const ref = useRef(null);

  return (
    <>
      {/* HEADER COM PARALLAX */}
      <m.header
        ref={ref}
        className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden"
        role="banner"
        aria-label="Cabeçalho principal da página de Blog"
      >
        {/* 🔥 Imagem com filtro */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50 blur-sm"
          style={{
            backgroundImage: "url('/hero-sobre.jpg')",
          }}
        />

        {/* 🔥 Overlay extra para dar contraste */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Conteúdo */}
        <div className="relative mx-auto max-w-7xl">
          <HeroPage
            title="Por trás do Código"
            description="A Esmeralda é o meu laboratório de consciência lógica -  uma linha de pensamento sobre como o mundo pode funcionar melhor."
            Icon={UserIcon}
          />
        </div>
      </m.header>

      <TimelineDemo />

      <div className="bg-cover bg-center">
        <Logos07Page />
     </div>
    </>
  );
}
