import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import { PortableTextComponents } from "@portabletext/react";

export const CustomPortableTextComponents: PortableTextComponents = {
  // 1. Blocos de Texto (Parágrafos, Títulos)
  block: {
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-neutral-800 dark:text-neutral-300">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-foreground tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground tracking-tight border-b border-border pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg bg-secondary/30 rounded-r-lg text-muted-foreground">
        {children}
      </blockquote>
    ),
  },

  // 2. Listas (Bullets e Números)
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-800 dark:text-neutral-300 marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-800 dark:text-neutral-300 marker:font-bold">
        {children}
      </ol>
    ),
  },

  // Itens de lista
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  // 3. Marcas (Negrito, Itálico, Links, Código)
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <Link
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="text-primary font-medium hover:underline decoration-primary underline-offset-4 transition-colors"
        >
          {children}
        </Link>
      );
    },
  },

  // 4. Tipos Personalizados (Imagens, Code Blocks, etc)
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      const imageUrl = urlFor(value)
        ?.width(800)
        .fit("max")
        .auto("format")
        .url();

      if (!imageUrl) return null;

      return (
        <figure className="my-10 space-y-3">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted shadow-md">
            <Image
              src={imageUrl}
              alt={value.alt || "Imagem do artigo"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    // Se você tiver um bloco de código no Sanity:
    code: ({ value }) => (
      <div className="my-8 rounded-lg overflow-hidden bg-[#1e1e1e] shadow-lg border border-white/10">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
          <span className="text-xs text-muted-foreground font-mono">
            {value.language || "text"}
          </span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
};
