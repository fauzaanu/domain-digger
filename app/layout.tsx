import { SpeedInsights } from '@vercel/speed-insights/next';
import type { FC, ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import './globals.css';
import Providers from './providers';

export const metadata = {
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : null,
  title: 'Domain Digger: DNS, WHOIS lookup & more',
  description:
    'Domain Digger is the full open-source toolkit for next-level domain analysis, providing detailed DNS, IP, WHOIS data, and SSL/TLS history in a user-friendly, no-install interface.',
  openGraph: {
    type: 'website',
    title: 'Domain Digger: DNS, WHOIS lookup & more',
    description:
      'Domain Digger is the full open-source toolkit for next-level domain analysis, providing detailed DNS, IP, WHOIS data, and SSL/TLS history in a user-friendly, no-install interface.',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
  robots: 'index, follow',
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Header />

            <main className="w-full flex-1">{children}</main>

            <Footer />
          </div>
        </Providers>

        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
