"use client";

import VistaprintHeader from "@/components/Header/VistaprintHeader";
import VistaprintFooter from "@/components/Footer/VistaprintFooter";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton/whatsAppBotton";
import CallButton from "@/components/CallButton/callButton";
import SEOHead from "@/components/SEO/SEOHead";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563EB" />
      </head>
      <body className={`overflow-x-hidden bg-theme-bg text-theme-text transition-colors duration-200 ${inter.className}`}>
        <Providers>
          <SEOHead />
          <VistaprintHeader />
          {children}
          <VistaprintFooter />
          <ScrollToTop />
          <WhatsAppButton />
          <CallButton />
        </Providers>
      </body>
    </html>
  );
}
