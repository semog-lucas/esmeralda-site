"use client";
import { motion as m } from "framer-motion";

type SimplePageProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function SimplePage({ title, subtitle, children }: SimplePageProps) {
  return (
    <section className="relative min-h-screen w-full px-6 py-20 bg-black/[0.96] text-white mt-20">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl mt-10">
        {/* Cabeçalho com animação */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-100">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-neutral-400 max-w-2xl mx-auto text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </m.div>

        {/* Corpo do texto */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_24px_rgba(0,0,0,0.25),_0_20px_60px_rgba(0,0,0,0.35)] p-8 md:p-12 leading-relaxed text-neutral-200 space-y-6"
        >
          {children}
        </m.div>
      </div>
    </section>
  );
}
