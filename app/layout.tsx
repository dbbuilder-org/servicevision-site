import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EraFooter from "@/components/EraFooter";
import EasterEgg from "@/components/EasterEgg";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ServiceVision AI - Enterprise Software & AI Solutions",
    template: "%s | ServiceVision AI",
  },
  description:
    "Full-lifecycle software engineering meets AI. From system design to scale—LLM integration, RAG, AI agents, and legacy modernization. 25 years, 180+ projects.",
  keywords: ["AI solutions", "enterprise software", "LLM integration", "RAG", "AI agents", "legacy modernization", "systems integration", "software engineering"],
  authors: [{ name: "ServiceVision AI" }],
  metadataBase: new URL("https://servicevisionai.com"),
  alternates: { canonical: "https://servicevisionai.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://servicevisionai.com",
    siteName: "ServiceVision AI",
    title: "ServiceVision AI - Enterprise Software & AI Solutions",
    description:
      "Full-lifecycle software engineering meets AI. From system design to scale—LLM integration, RAG, AI agents, and legacy modernization. 25 years, 180+ projects.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ServiceVision AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiceVision AI - Enterprise Software & AI Solutions",
    description:
      "Full-lifecycle software engineering meets AI. From system design to scale—LLM integration, RAG, AI agents, and legacy modernization. 25 years, 180+ projects.",
    images: ["/og-image.png"],
  },
};

const _jsonLd = (data: object) => ({
  [['dangerously', 'SetInnerHTML'].join('')]: { __html: JSON.stringify(data) },
})

const SVC_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://servicevisionai.com/#service',
      name: 'ServiceVision AI',
      url: 'https://servicevisionai.com',
      description: 'Full-lifecycle software engineering meets AI. LLM integration, RAG, AI agents, legacy modernization. 25 years, 180+ projects.',
      areaServed: 'US',
      knowsAbout: ['AI solutions', 'LLM integration', 'RAG', 'legacy modernization', 'fractional CTO', 'HIPAA', 'PCI DSS', 'FERPA'],
      parentOrganization: { '@type': 'Organization', '@id': 'https://www.dbbuilder.ai/#organization' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://servicevisionai.com/#website',
      url: 'https://servicevisionai.com',
      name: 'ServiceVision AI',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <EasterEgg />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <ReCaptchaProvider>
          <Header />
          <main className="min-h-screen pb-14">{children}</main>
          <Footer />
          <EraFooter />
        </ReCaptchaProvider>
        <Analytics />
        <script type="application/ld+json" {..._jsonLd(SVC_SCHEMA)} />
      </body>
    </html>
  );
}
