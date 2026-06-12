import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Icebreaker Lab | Websites & SEO que rompen el hielo",
  description:
    "Agencia especializada en landing pages y websites totalmente optimizados para SEO y Google. Rompemos las barreras de comunicación de tu negocio en internet.",
  keywords: [
    "agencia web",
    "landing pages",
    "SEO",
    "diseño web",
    "websites optimizados",
    "posicionamiento Google",
    "Icebreaker Lab",
  ],
  authors: [{ name: "Icebreaker Lab" }],
  creator: "Icebreaker Lab",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://icebreakerlab.com",
    siteName: "Icebreaker Lab",
    title: "Icebreaker Lab | Websites & SEO que rompen el hielo",
    description:
      "Construimos websites que conquistan Google y convierten visitantes en clientes.",
    images: [
      {
        url: "/images/hero/hero-aurora.png",
        width: 1200,
        height: 630,
        alt: "Icebreaker Lab — Websites & SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Icebreaker Lab | Websites & SEO",
    description:
      "Agencia especializada en landing pages y websites optimizados para Google.",
    images: ["/images/hero/hero-aurora.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
