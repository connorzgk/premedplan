import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://premedplan.ca'),
  title: {
    template: '%s — premedplan.ca',
    default: 'premedplan.ca — Ontario Pre-Med Information Center',
  },
  description:
    'Admissions requirements for all Ontario MD programs — GPA, MCAT, and course prerequisites for Canadian pre-med students.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
