import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#ff003d',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Luminous Digital Studio — Full-Service Digital Media Agency',
  description:
    'Full-service digital media production studio partnering with ambitious brands across Web Development, Web/App Development, Video Editing, and Digital Analytics.',
  keywords: [
    'Digital Media Agency',
    'Web Development',
    'Web/App Development',
    'Video Editing',
    'Digital Analytics',
    'Luminous Digital Studio',
    'Creative Production',
  ],
  authors: [{ name: 'Luminous Digital Studio' }],
  openGraph: {
    title: 'Luminous Digital Studio — Full-Service Digital Media Agency',
    description:
      'We create digital work people remember. High-performance websites, mobile applications, cinematic video, and analytics telemetry.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Luminous Digital Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luminous Digital Studio — Full-Service Digital Media Agency',
    description:
      'We create digital work people remember. Web Development, Web/App Development, Video Editing, and Digital Analytics.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
        {children}
      </body>
    </html>
  );
}
