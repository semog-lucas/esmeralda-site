"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { m } from "framer-motion";
import { useRef } from "react";
import HeroPage from "@/components/HeroPage";
import { CloudAlert } from "lucide-react";

export default function NotFound() {
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
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/not-found-img.jpg')",
          }}
        />

        {/* 🔥 Overlay extra para dar contraste */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Conteúdo */}
        <div className="relative mx-auto max-w-7xl">
          <HeroPage
            title="Página não encontrada"
            description="Oops! A página que você tentou acessar não existe ou foi movida."
            Icon={CloudAlert}
          />
          <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/">
            <Button className="cursor-pointer">Voltar para Home</Button>
          </Link>

          <Link href="/contato">
            <Button
              variant="ghost"
              className="flex cursor-pointer items-center gap-1"
            >
              <span>Contato</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
        </div>
      </m.header>
    </>
  );
}
