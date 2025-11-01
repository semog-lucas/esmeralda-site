"use client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-6 overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={value.asset?.url || ""}
          alt={value.alt || "Imagem do projeto"}
          width={800}
          height={500}
          className="h-auto w-full object-cover"
        />
      </div>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-emerald-500 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-medium text-neutral-800 dark:text-neutral-200">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        {children}
      </p>
    ),
  },
};

export const PortableTextCustom = ({ value }: { value: any }) => (
  <PortableText value={value} components={components} />
);
