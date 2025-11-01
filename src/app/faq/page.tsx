"use client";
import HeroPage from "@/components/HeroPage";
import { MessageCircleQuestionMark } from "lucide-react";
import { useRef } from "react";
import { motion as m } from "framer-motion";
import FaqSection from "@/components/FaqSection";

export default function FaqPage() {
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
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-faq.jpg')",
          }}
        />

        {/* 🔥 Overlay extra para dar contraste */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Conteúdo */}
        <div className="relative mx-auto max-w-7xl">
          <HeroPage
            title="Dúvidas Frequentes"  
            description=""
            Icon={MessageCircleQuestionMark}
          />
        </div>
      </m.header>   
      <FaqSection />
      </>
    );
}