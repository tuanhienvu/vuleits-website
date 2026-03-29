import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
/** Latin subset only (~one woff2) — full `index.css` pulls 60+ unicode slices. Vietnamese diacritics fall back to Geist. */
import '@fontsource/zcool-xiaowei/latin-400.css';
import '@/app/globals.css';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';

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
    <html lang="en">
      {/* ==================== ROOT: FONTS, LOCALE & TOAST PROVIDERS ==================== */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleProvider>
          <ToastProvider>{children}</ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
