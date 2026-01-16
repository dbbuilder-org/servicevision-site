import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ServiceVision - AI-Powered Solutions for Service Organizations",
    template: "%s | ServiceVision",
  },
  description:
    "ServiceVision helps service organizations optimize operations and enhance client experiences through AI-powered technology solutions.",
  keywords: ["AI", "service optimization", "technology solutions", "business development", "IT services"],
  authors: [{ name: "ServiceVision" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.servicevision.net",
    siteName: "ServiceVision",
    title: "ServiceVision - AI-Powered Solutions for Service Organizations",
    description:
      "ServiceVision helps service organizations optimize operations and enhance client experiences through AI-powered technology solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiceVision - AI-Powered Solutions for Service Organizations",
    description:
      "ServiceVision helps service organizations optimize operations and enhance client experiences through AI-powered technology solutions.",
  },
};

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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
