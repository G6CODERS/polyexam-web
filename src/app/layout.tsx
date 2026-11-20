import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

import { MSWProvider } from '@/mocks/provider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PolyExam v2',
  description:
    'PolyExam — épreuves passées, corrections, tutoriels et abonnements pour les étudiants de Polytech Douala.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const mswEnabled =
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {mswEnabled ? <MSWProvider>{children}</MSWProvider> : children}
      </body>
    </html>
  );
}
