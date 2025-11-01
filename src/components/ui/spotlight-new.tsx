"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(145, 80%, 75%, .08) 0, hsla(145, 80%, 45%, .02) 50%, hsla(145, 80%, 35%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(145, 85%, 80%, .06) 0, hsla(145, 80%, 50%, .02) 80%, transparent 90%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(145, 90%, 70%, .04) 0, hsla(145, 85%, 40%, .02) 80%, transparent 90%)",
  translateY = -250,
  width = 560,
  height = 9380,
  smallWidth = 240,
  duration = 9,
  xOffset = 100,
}: SpotlightProps = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  // conecta scroll ao container do spotlight
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // cria efeitos parallax suaves
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ y, scale, opacity }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* Lado esquerdo */}
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </motion.div>

      {/* Lado direito */}
      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-screen h-screen z-0 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0"
        />
        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </motion.div>
    </motion.div>
  );
};
