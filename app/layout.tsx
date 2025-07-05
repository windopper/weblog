import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/common/Footer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const seoulAlrimTTFMedium = localFont({
  src: "../public/fonts/SeoulAlrimTTF-Medium.ttf",
  variable: "--font-seoul-alrim-ttf-medium",
});

const seoulAlrimTTFHeavy = localFont({
  src: "../public/fonts/SeoulAlrimTTF-Heavy.ttf",
  variable: "--font-seoul-alrim-ttf-heavy",
});

export const metadata: Metadata = {
  title: "kamilereon",
  applicationName: "kamilereon",
  description: `웹 개발, AI 기술, 소프트웨어 아키텍처 기술 블로그`,
  openGraph: {
    title: "kamilereon",
    description: "웹 개발, AI 기술, 소프트웨어 아키텍처 기술 블로그",
    url: "https://kamilereon.net",
    siteName: "kamilereon",
  },
  authors: [{ name: "kamilereon", url: "https://github.com/windopper" }],
  creator: "kamilereon",
  publisher: "kamilereon",
  keywords: ["web", "ai", "software", "architecture", "blog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        ${seoulAlrimTTFMedium.variable} ${seoulAlrimTTFHeavy.variable} antialiased`}
      >
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
