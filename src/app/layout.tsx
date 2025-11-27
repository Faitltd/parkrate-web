import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://parkrate.com").replace(/\/$/, "");
const baseDescription = "Discover, compare, and review theme parks across North America with ParkRate.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ParkRate | Find the best theme parks",
  description: baseDescription,
  openGraph: {
    title: "ParkRate | Find the best theme parks",
    description: baseDescription,
    url: siteUrl,
    siteName: "ParkRate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParkRate | Find the best theme parks",
    description: baseDescription,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
