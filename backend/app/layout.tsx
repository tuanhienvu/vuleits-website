import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VULE ITS Backend',
  description: 'API server',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
