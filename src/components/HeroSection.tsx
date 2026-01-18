"use client";
import { useScroll, useTransform, motion as m } from "framer-motion";
import { FlipWords } from "./ui/flip-words";
import Image from "next/image";
import Logo from "../../public/Esmeralda-logo.webp";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
// 1. Importar o hook do Lenis
import { useLenis } from "@studio-freight/react-lenis";

export default function HeroSection() {
  const ref = useRef(null);

  // 2. Acessar a instância do Lenis
  const lenis = useLenis();

  // 3. Função de scroll atualizada para usar a física do Lenis
  const handleScrollToContent = () => {
    // Verifica se o lenis está ativo antes de chamar
    if (lenis) {
      lenis.scrollTo("#destaque", {
        // Usa as mesmas configurações do seu global para consistência
        duration: 1.5,
        // Adiciona um offset se você tiver navbar fixa (ex: -80px)
        // offset: -80,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave padrão
      });
    }
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden min-h-[80vh] flex flex-col justify-center"
    >
      <div className="mx-auto max-w-7xl w-full">
        <m.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="relative overflow-hidden rounded-3xl 
              bg-white/10 backdrop-blur-md 
              text-white ring-1 ring-white/10 
              shadow-[0_0_24px_RGBA(0,0,0,0.25),_0_20px_60px_RGBA(0,0,0,0.35)]
              mx-auto w-[90%] md:w-[70%]"
        >
          {/* texto animado com parallax */}
          <m.div
            style={{ y: yText }}
            className="relative z-10 grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-3 md:p-12"
          >
            <div className="flex flex-col gap-5 md:pr-6">
              <p className="text-sm font-medium text-neutral-300">
                Esmeralda Company
              </p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Bem-vindo
                <br />
                <span className="text-neutral-200">Um Novo </span>
                <span className="inline-block text-amber-300">
                  <FlipWords words={["Brilho", "Conceito"]} />
                </span>
              </h2>
              <p className="max-w-prose text-neutral-300">
                Agora com espaço e desempenho para tudo que importa. Segurança,
                controle e simplicidade em um só lugar.
              </p>
            </div>
          </m.div>

          {/* imagem com efeito parallax oposto */}
          <m.div
            style={{ y: yImage }}
            className="pointer-events-none absolute inset-y-0 right-0 hidden md:flex items-center"
          >
            <Image src={Logo} alt="logo" width={250} height={250} />
          </m.div>
        </m.div>
      </div>

      {/* Botão de Scroll */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
      >
        <button
          onClick={handleScrollToContent}
          className="group flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Rolar para conteúdo"
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            Explore
          </span>
          <div className="p-2 rounded-full border border-white/20 group-hover:border-white/50 transition-colors animate-bounce">
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </m.div>
    </section>
  );
}
