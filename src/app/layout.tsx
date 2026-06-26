import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Icebreaker Lab | Websites & SEO that break the ice",
  description:
    "Premium digital agency specialized in high-converting landing pages and websites fully optimized for SEO and Google. We break the communication barriers between great businesses and their audience.",
  keywords: [
    "web agency",
    "landing pages",
    "SEO",
    "web design",
    "optimized websites",
    "Google ranking",
    "Icebreaker Lab",
    "digital strategy",
  ],
  authors: [{ name: "Icebreaker Lab" }],
  creator: "Icebreaker Lab",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://icebreakerlab.com",
    siteName: "Icebreaker Lab",
    title: "Icebreaker Lab | Websites & SEO that break the ice",
    description:
      "We build websites that rank on Google and convert visitors into clients.",
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
      "Premium agency specialized in landing pages and websites optimized for Google.",
    images: ["/images/hero/hero-aurora.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Icebreaker Lab",
  "description": "Web design agency specialized in SEO-optimized websites built to rank on Google and convert visitors into clients.",
  "url": "https://icebreakerlab.com",
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "Panama" }
  ],
  "serviceType": ["Web Design", "SEO", "E-commerce Development", "Landing Pages"],
  "priceRange": "$$",
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
