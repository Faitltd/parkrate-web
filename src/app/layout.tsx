import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { themeParks } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://parkrate.com").replace(/\/$/, "");
const analyticsDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const baseDescription = "Discover, compare, and review theme parks across North America with ParkRate.";
const defaultOgImage =
  "https://upload.wikimedia.org/wikipedia/commons/6/6c/Steel_Vengeance_at_Cedar_Point_%282018%29.jpg";
const featuredPark = themeParks[0];

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
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: featuredPark?.name ?? "Top theme parks on ParkRate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParkRate | Find the best theme parks",
    description: baseDescription,
    images: [defaultOgImage],
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
        {analyticsDomain && (
          <Script
            defer
            data-domain={analyticsDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
