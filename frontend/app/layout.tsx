import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import '@/app/globals.css';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import MarketingManager from '@/components/marketing/MarketingManager';
import ConsentBanner from '@/components/marketing/ConsentBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  /** Mono is only used in admin / `.font-mono` — avoid unused preload warnings on public pages. */
  preload: false,
});

const zcool = localFont({
  src: '../../node_modules/@fontsource/zcool-xiaowei/files/zcool-xiaowei-latin-400-normal.woff2',
  variable: '--font-zcool-family',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'VULE ITS - Bring Your Success',
  description: 'Bring Your Success',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* ==================== ROOT: THEME (before paint), LOCALE & TOAST ==================== */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${zcool.variable} antialiased`}>
        <Script id="vuleits-theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;d.classList.remove('light','dark');d.classList.add('dark');d.style.colorScheme='dark';try{localStorage.setItem('vuleits-theme','dark');}catch(e){} }catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`}
        </Script>
        <ThemeProvider>
          <LocaleProvider>
            <ToastProvider>
              {children}
              <ConsentBanner />
              <MarketingManager />
            </ToastProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
