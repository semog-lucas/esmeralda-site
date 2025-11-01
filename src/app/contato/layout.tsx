// app/contato/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Vamos Conversar",
  description: "Entre em contato com o laboratório Esmeralda. Estamos prontos para transformar suas ideias em soluções tecnológicas inovadoras.",
  keywords: [
    "contato",
    "orçamento",
    "desenvolvimento web",
    "consultoria",
    "projetos",
    "colaboração",
    "tecnologia",
    "inovação",
    "esmeralda contato",
    "orçamento projeto"
  ],
  openGraph: {
    title: "Contato | Vamos Conversar",
    description: "Entre em contato com o laboratório Esmeralda para desenvolver soluções tecnológicas inovadoras.",
    url: "/contato",
    siteName: "Esmeralda",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-contato.jpg", 
        width: 1200,
        height: 630,
        alt: "Contato Esmeralda - Vamos Conversar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | Esmeralda - Vamos Conversar",
    description: "Entre em contato com o laboratório Esmeralda para desenvolver soluções tecnológicas.",
    images: ["/og-contato.jpg"],
  },
  alternates: {
    canonical: "/contato",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Página de Contato - Esmeralda",
            "description": "Entre em contato com o laboratório Esmeralda para projetos de desenvolvimento web e soluções tecnológicas.",
            "url": "https://esmeraldacompany.com.br/contato", 
            "publisher": {
              "@type": "Organization",
              "name": "Esmeralda",
              "description": "Laboratório de consciência lógica e desenvolvimento tecnológico",
              "logo": {
                "@type": "ImageObject",
                "url": "https://esmeraldacompany.com.br/Esmeralda-logo.png" 
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://esmeraldacompany.com.br/contato"
            },
            "potentialAction": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Portuguese"
            }
          })
        }}
      />
      {children}
    </>
  );
}