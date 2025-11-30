import React from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { Newspaper, BriefcaseIcon, UserIcon, FolderCode } from "lucide-react";

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          // Note que removi o prop 'icon' daqui, pois ele já está dentro do header (BentoImage)
          // Mas adicionei o href para o link funcionar
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}

const BentoImage = ({
  src,
  alt,
  icon,
}: {
  src: string;
  alt: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black group/image">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover/bento:scale-105" // Adicionei um zoom suave ao passar o mouse
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />

    {/* Área do Ícone Sobreposto (Badge) */}
    {icon && (
      <div className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-sm">
        {icon}
      </div>
    )}
  </div>
);

// --------------------------------------------------------
// Lista de Itens com Links e Ícones Integrados na Imagem
// --------------------------------------------------------
const items = [
  {
    title: "Explore os Projetos",
    description: "Projetos que buscam ideias Integradas.",
    header: (
      <BentoImage
        src="/hero-portfolio.jpg"
        alt="Projetos"
        icon={<BriefcaseIcon className="h-5 w-5 text-white" />}
      />
    ),
    className: "md:col-span-2",
    href: "/projetos",
  },
  {
    title: "Quem Desenvolve",
    description: "Conheça os ideais que nos guiam.",
    header: (
      <BentoImage
        src="/hero-sobre.jpg"
        alt="Equipe"
        icon={<UserIcon className="h-5 w-5 text-white" />}
      />
    ),
    className: "md:col-span-1",
    href: "/sobre",
  },
  {
    title: "Vejam Alguns Recursos",
    description: "Explore Alguns App Favoritos.",
    header: (
      <BentoImage
        src="/hero-recursos.jpg"
        alt="Recursos"
        icon={<FolderCode className="h-5 w-5 text-white" />}
      />
    ),
    className: "md:col-span-1",
    href: "/recursos",
  },
  {
    title: "Conheça os Labs",
    description: "De onde vem as ideias.",
    header: (
      <BentoImage
        src="/hero-blog.jpg"
        alt="Laboratório"
        icon={<Newspaper className="h-5 w-5 text-white" />}
      />
    ),
    className: "md:col-span-2",
    href: "/blog",
  },
];
