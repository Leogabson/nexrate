import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Strongly typed metadata
export const metadata = {
  metadataBase: new URL("https://nexrate.vercel.app"),
  title: "NexRate – Faster, Smarter, Safer Crypto & Giftcard Exchange",
  description:
    "Join NexRate – the modern platform to swap, buy, and sell crypto & gift cards. With AI-powered arbitrage, smart rate lock, and more. Get early access now!",

  keywords: [
    "crypto exchange",
    "gift card trading",
    "cryptocurrency swap",
    "bitcoin exchange",
    "crypto arbitrage",
    "digital currency",
    "gift card marketplace",
    "crypto trading platform",
    "nexrate",
  ],

  authors: [{ name: "NexRate Team" }],
  creator: "NexRate",
  publisher: "NexRate",

  verification: {
    // google: "your-google-site-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "NexRate – Swap Crypto & Gift Cards Seamlessly",
    description:
      "The smarter way to exchange crypto & gift cards with AI-powered arbitrage and smart rate lock. Join our waitlist today!",
    url: "https://nexrate.vercel.app",
    siteName: "NexRate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexRate - Crypto & Gift Card Exchange Platform",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NexRate – Swap Crypto & Gift Cards Seamlessly",
    description:
      "The smarter way to exchange crypto & gift cards with AI-powered features. Join our waitlist today!",
    images: ["/twitter-image.png"],
    creator: "@Nexrate",
    site: "@Nexrate",
  },

  applicationName: "NexRate",
  referrer: "origin-when-cross-origin",

  manifest: "/site.webmanifest",

  other: {
    "google-site-verification": "pending",
  },
};

export const viewport = {
  colorScheme: "light dark", // supports both light and dark mode
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://nexrate.vercel.app" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full max-w-[100vw]`}
      >
        {children}
      </body>
    </html>
  );
}
