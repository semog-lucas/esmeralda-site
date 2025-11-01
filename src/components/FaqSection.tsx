"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const faq = [
  {
    question: "O que é a Esmeralda Company?",
    answer:
      "A Esmeralda é um estúdio digital que transforma ideias em sistemas inteligentes. Criamos soluções que unem automação, design funcional e Sistemas para tornar processos complexos simples, eficientes e escaláveis.",
  },
  {
    question: "Por que o nome “Esmeralda”?",
    answer:
      "Escolhemos “Esmeralda” porque acreditamos que boas soluções nascem brutas — e precisam ser lapidadas até revelarem clareza, precisão e brilho. É uma metáfora para o processo criativo e técnico de transformar lógica em valor real.",
  },
  {
    question: "Qual é a missão da Esmeralda?",
    answer:
      "A nossa missão é trazer clareza à complexidade. Criamos ferramentas e sistemas que reduzem o ruído, automatizam o que é repetitivo e ampliam o que realmente importa: o pensamento humano e criativo.",
  },
  {
    question: "A Esmeralda é uma agência ou uma startup?",
    answer:
      "A Esmeralda é um laboratório independente, com mentalidade de Laboratório de Ideias. Nosso foco está em criar produtos digitais próprios e também soluções sob medida.",
  },
  {
    question: "Quais tecnologias a Esmeralda utiliza?",
    answer:
      "Trabalhamos com um ecossistema moderno e enxuto: Next.js, React, TypeScript, Go, Node.js, Docker, PostgreSQL, Python e automações em IA. O objetivo é sempre escolher a tecnologia certa para o problema certo.",
  },
  {
    question: "O que diferencia a Esmeralda de outras empresas de tecnologia?",
    answer:
      "Aqui se Pensamos como artistas, A Esmeralda busca o equilíbrio entre lógica e estética, onde cada linha de código carrega propósito — e cada projeto reflete a clareza de uma ideia bem lapidada.",
  },
  {
    question: "Que tipo de projetos a Esmeralda desenvolve?",
    answer:
      "Desde sistemas SaaS e automações empresariais, até plataformas inteligentes e infraestruturas digitais. Nosso foco atual está em automação logística, integração de dados e inteligência aplicada a negócios.",
  },
  {
    question: "A Esmeralda usa inteligência artificial?",
    answer:
      "Sim — a IA é parte essencial do nosso processo. Usamos IA não apenas como ferramenta, mas como mecanismo de amplificação de lógica, para análise, automação e criação de soluções que aprendem com o tempo.",
  },
  {
    question: "A Esmeralda trabalha com empresas de qualquer porte?",
    answer:
      "Principalmente com empresas que valorizam a eficiência e o pensamento sistêmico — de startups em expansão a negócios estabelecidos que querem repensar sua arquitetura digital.",
  },
  {
    question: "Qual é o propósito final da Esmeralda?",
    answer:
      "Criar um futuro onde tecnologia e clareza coexistam. Onde o código não apenas funcione, mas brilhe — iluminando caminhos para ideias, pessoas e negócios prosperarem de forma inteligente e sustentável.",
  },
];

const FaqSection = () => {
  const [value, setValue] = useState<string>();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl leading-[1.15] font-semibold tracking-tighter text-foreground">
          Algumas Respostas Sobre Esmeralda
        </h2>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(0, 5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionTrigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg text-foreground"
                  )}
                >
                  <span className="flex-1 text-left">{question}</span>
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ml-4" />
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index + 5}`}>
                <AccordionTrigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg text-foreground"
                  )}
                >
                  <span className="flex-1 text-left">{question}</span>
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ml-4" />
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;