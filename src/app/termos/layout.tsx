// app/termos-e-condicoes/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Esmeralda Company",
  description: "Conheça nossa Política de Privacidade. Saiba como a Esmeralda Company protege seus dados, utiliza cookies e garante sua segurança online. Última atualização: 4 de Outubro de 2025.",
  keywords: [
    "política de privacidade",
    "termos de uso",
    "proteção de dados",
    "LGPD",
    "cookies",
    "segurança online",
    "privacidade digital",
    "esmeralda company",
    "termos e condições",
    "proteção de dados pessoais"
  ],
  openGraph: {
    title: "Política de Privacidade | Esmeralda Company",
    description: "Política de Privacidade da Esmeralda Company - Proteção de dados, cookies e segurança online.",
    url: "/termos-e-condicoes",
    siteName: "Esmeralda Company",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-termos.jpg", // 👈 Você vai criar esta imagem
        width: 1200,
        height: 630,
        alt: "Política de Privacidade - Esmeralda Company",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Política de Privacidade | Esmeralda Company",
    description: "Conheça nossa Política de Privacidade e Termos de Uso.",
  },
  alternates: {
    canonical: "/termos-e-condicoes",
  },
  robots: {
    index: true,
    follow: false, // 👈 Páginas legais geralmente não são seguidas
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data para Política de Privacidade */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Política de Privacidade - Esmeralda Company",
            "description": "Política de Privacidade e Termos de Uso da Esmeralda Company",
            "url": "https://esmeraldacompany.com.br/termos-e-condicoes",
            "datePublished": "2025-10-04",
            "dateModified": "2025-10-04",
            "publisher": {
              "@type": "Organization",
              "name": "Esmeralda Company",
              "url": "https://esmeraldacompany.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://esmeraldacompany.com.br/Esmeralda-logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://esmeraldacompany.com.br/termos-e-condicoes"
            },
            "about": {
              "@type": "Thing",
              "name": "Política de Privacidade"
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "Esmeralda Company",
              "url": "https://esmeraldacompany.com.br"
            }
          })
        }}
      />
      {children}
    </>
  );
}