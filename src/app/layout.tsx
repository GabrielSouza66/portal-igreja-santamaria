import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/config';
import { ChurchJsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#0D5131',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} — Igreja em Santa Maria DF`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    'Igreja em Santa Maria DF',
    'Igreja Presbiteriana do Brasil Santa Maria',
    'Culto em Santa Maria DF',
    'Escola Dominical Santa Maria DF',
    'Estudo Bíblico',
    'Pregações',
    'EQ 304 307 Santa Maria Sul',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.shortName} — Igreja em Santa Maria DF`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo_ipb.png',
        width: 800,
        height: 800,
        alt: `Logotipo da ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.shortName} — Igreja em Santa Maria DF`,
    description: siteConfig.description,
    images: ['/logo_ipb.png'],
  },
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
  icons: {
    icon: '/logo_ipb.png',
    apple: '/logo_ipb.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-[#17231C]">
        {/* Acessibilidade WCAG: Pular para Conteúdo Principal */}
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo principal
        </a>

        {/* JSON-LD Global Schema.org Church */}
        <ChurchJsonLd />

        {/* Cabeçalho Fixo com Identidade Visual */}
        <Header />

        {/* Conteúdo Principal Dinâmico */}
        <main id="conteudo-principal" className="flex-1 focus:outline-none">
          {children}
        </main>

        {/* Rodapé Completo */}
        <Footer />
      </body>
    </html>
  );
}
