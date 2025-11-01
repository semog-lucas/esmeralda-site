import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  SITE_TITLE_DEFAULT,
  SITE_TITLE_TEMPLATE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_AUTHOR,
  SITE_PUBLISHER,
  SITE_URL,
  FORMAT_DETECTION,
  OPEN_GRAPH,
  TWITTER,
  ROBOTS_CONFIG,
  FAVICON_CONFIG
} from "./constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Título estratégico com template
  title: {
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE
  },
  
  // Descrição otimizada para SEO
  description: SITE_DESCRIPTION,
  
  // Palavras-chaves estratégicas
  keywords: SITE_KEYWORDS,
  
  // Informações do autor/empresa
  authors: [{ 
    name: SITE_AUTHOR, 
    url: SITE_URL 
  }],
  creator: SITE_AUTHOR,
  publisher: SITE_PUBLISHER,
  
  // Configurações de formatação
  formatDetection: FORMAT_DETECTION,
  
  // URL base para links absolutos
  metadataBase: new URL(SITE_URL),
  
  // Link canônico padrão
  alternates: {
    canonical: '/',
  },
  
  // Open Graph para redes sociais
  openGraph: OPEN_GRAPH,
  
  // Twitter Cards
  twitter: TWITTER,
  
  // Configurações de robots
  robots: ROBOTS_CONFIG,
  
  // Verificação para Google Search Console 
  // verification: {
  //   google: 'seu-codigo-verificacao-google',
  // },
  
  // Outras metatags importantes
  manifest: '/manifest.json', 
  icons: FAVICON_CONFIG,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} 
      >
        <NavbarDemo />
        {children}
        <Footer />
      </body>
    </html>
  );
}