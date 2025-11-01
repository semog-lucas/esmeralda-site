"use client";
import HeroPage from "@/components/HeroPage";
import { PhoneIcon } from "lucide-react";
import SectionContact from "@/components/SectionContact";
import { useRef } from "react";
import { motion as m } from "framer-motion";

export default function ContactPage() {
    const ref = useRef(null);
    return (
        <>
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
                title="Contato"
                description="Entre em contato conosco para mais informações ou para agendar uma conversa."
                Icon={PhoneIcon}
            />
            </div>
            </m.header>
            <div className="bg-cover bg-center">
                <SectionContact />
            </div>
        </>
    );
}


