import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    default: "Esmeralda - Um Novo Brilho, Um Novo Conceito",
    template: "%s | Esmeralda"
  },
  
  // Descrição otimizada para SEO
  description: "A Esmeralda é o meu laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor. Desenvolvimento, design e inovação em tecnologia.",
  
  // Palavras-chaves estratégicas
  keywords: [
    "desenvolvimento web", 
    "tecnologia", 
    "inovação", 
    "design system", 
    "next.js", 
    "sanity.io",
    "portfolio",
    "projetos digitais",
    "laboratório tecnológico",
    "consciência lógica"
  ],
  
  // Informações do autor/empresa
  authors: [{ 
    name: "Lucas C. Gomes", 
    url: "https://seusite.com" 
  }],
  creator: "Lucas C. Gomes",
  publisher: "Esmeralda Company",
  
  // Configurações de formatação
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // URL base para links absolutos
  metadataBase: new URL('https://esmeraldacompany.com.br'),
  
  // Link canônico padrão
  alternates: {
    canonical: '/',
  },
  
  // Open Graph para redes sociais
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://esmeraldacompany.com.br',
    siteName: 'Esmeralda Company',
    title: 'Esmeralda - Um Novo Brilho, Um Novo Conceito',
    description: 'A Esmeralda é o meu laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor.',
    images: [
      {
        url: '/og-image.jpg', // 👈 Crie uma imagem OG 1200x630
        width: 1200,
        height: 630,
        alt: 'Esmeralda - Laboratório de Consciência Lógica',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Esmeralda - Laboratório de Consciência Lógica',
    description: 'A Esmeralda é o meu laboratório de consciência lógica.',
    creator: '@seuusuario', // 👈 Adicione seu @ do Twitter
    images: ['/og-image.jpg'],
  },
  
  // Configurações de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verificação para Google Search Console (opcional)
  // verification: {
  //   google: 'seu-codigo-verificacao-google',
  // },
  
  // Outras metatags importantes
  manifest: '/manifest.json', 
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },
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