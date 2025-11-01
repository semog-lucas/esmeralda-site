// components/tech-logos.tsx
"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNodeJs,
  faPython,
  faPhp,
  faDocker,
  faWordpress,
  faLaravel,
} from "@fortawesome/free-brands-svg-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";

// Next.js (preto oficial)
export const TechLogo01 = () => <SiNextdotjs size={46} color="#fff" />;

// React Native (usa o React azul)
export const TechLogo02 = () => (
  <FontAwesomeIcon icon={faReact} style={{ fontSize: 46, color: "#61DAFB" }} />
);

// TypeScript (azul oficial)
export const TechLogo03 = () => <SiTypescript size={46} color="#3178C6" />;

// Node.js (verde oficial)
export const TechLogo04 = () => (
  <FontAwesomeIcon icon={faNodeJs} style={{ fontSize: 46, color: "#68A063" }} />
);

// Python (azul/amarelo – aqui usamos azul oficial)
export const TechLogo05 = () => (
  <FontAwesomeIcon icon={faPython} style={{ fontSize: 46, color: "#3776AB" }} />
);

// PHP (roxo oficial)
export const TechLogo06 = () => (
  <FontAwesomeIcon icon={faPhp} style={{ fontSize: 46, color: "#777BB4" }} />
);

// Docker (azul oficial)
export const TechLogo07 = () => (
  <FontAwesomeIcon icon={faDocker} style={{ fontSize: 46, color: "#2496ED" }} />
);

// MongoDB (verde oficial)
export const TechLogo08 = () => <SiMongodb size={46} color="#47A248" />;

// PostgreSQL (azul oficial)
export const TechLogo09 = () => <SiPostgresql size={46} color="#336791" />;

// Laravel (Vermelho Sangue oficial) 
export const TechLogo10 = () => (
  <FontAwesomeIcon icon={faLaravel} style={{ fontSize: 46, color: "#e40707" }} />
);

// WordPress (azul oficial)
export const TechLogo11 = () => (
  <FontAwesomeIcon
    icon={faWordpress}
    style={{ fontSize: 46, color: "#21759B" }}
  />
);