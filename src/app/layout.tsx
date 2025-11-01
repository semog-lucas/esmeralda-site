import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
  title: {
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ 
    name: SITE_AUTHOR, 
    url: SITE_URL 
  }],
  creator: SITE_AUTHOR,
  publisher: SITE_PUBLISHER,
  formatDetection: FORMAT_DETECTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: OPEN_GRAPH,
  twitter: TWITTER,
  robots: ROBOTS_CONFIG,
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
        {/* Error Boundary envolvendo toda a aplicação */}
        <ErrorBoundary 
          onReset={() => {
            // Callback opcional para ações adicionais no reset
            console.log('Error boundary foi resetado');
          }}
        >
          <NavbarDemo />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}