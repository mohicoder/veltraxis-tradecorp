import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/geist';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SITE_URL } from '@/lib/site';
import { company, email, phones } from '@/lib/contacts';
import { meta } from '@/content/en';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.home.title,
  description: meta.home.description,
};

export const viewport: Viewport = { themeColor: '#05070B', width: 'device-width', initialScale: 1 };

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.brand,
  legalName: company.legalName,
  url: SITE_URL,
  email,
  telephone: phones.india.tel,
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  areaServed: ['Russia', 'CIS', 'Eastern Europe', 'Middle East', 'North Africa'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-cream-50">Skip to content</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
