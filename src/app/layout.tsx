import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ZCOOL_XiaoWei } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from '@/components/providers/LocaleProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zcoolXiaoWei = ZCOOL_XiaoWei({
  variable: "--font-zcool-xiaowei",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VULE ITS - Bring Your Success",
  description: "Bring Your Success",
  keywords: ["VULE ITS", "software", "services", "technology", "web"],
  authors: [{ name: "VULE ITS" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VULE ITS - Bring Your Success",
    description: "Bring Your Success",
    siteName: "VULE ITS",
    type: 'website',
    url: 'https://vuleits.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VULE ITS - Bring Your Success',
    description: 'Bring Your Success',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0c0c0c" />
        <link rel="canonical" href="https://vuleits.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Organization structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'VULE ITS',
          url: 'https://vuleits.com',
          logo: 'https://vuleits.com/Logos.png',
          sameAs: [
            'https://twitter.com/',
            'https://www.facebook.com/',
          ],
        }) }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zcoolXiaoWei.variable} antialiased`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
