"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  return (
    <motion.section
      className={cn(
        // Container base com Glassmorphism
        "mx-auto w-full relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.2)] transition-transform duration-300 hover:scale-[1.02]",
        containerClassName
      )}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05)",
        }}
      >
        <motion.div
          className={cn(
            "relative h-full px-6 py-16 sm:px-10 flex flex-col items-center justify-center text-center",
            className
          )}
        >
          <Noise />
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] opacity-10 pointer-events-none [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    />
  );
};
