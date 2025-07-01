import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/common/Footer";

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
  description: "kamilereon's blog",
  openGraph: {
    title: "kamilereon",
    description: "kamilereon's blog",
    url: "https://kamilereon.net",
    siteName: "kamilereon",
  },
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
      </body>
    </html>
  );
}
