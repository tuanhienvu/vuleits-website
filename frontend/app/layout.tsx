import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
/** Latin subset only (~one woff2) — full `index.css` pulls 60+ unicode slices. Vietnamese diacritics fall back to Geist. */
import '@fontsource/zcool-xiaowei/latin-400.css';
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
