import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '@fontsource-variable/geist';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/cormorant-garamond/cyrillic-500-italic.css';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getDict } from '@/content';
import { isLocale, locales } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import { company, email, phones } from '@/lib/contacts';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), applicationName: 'VELTRAXIS TRADECORP' };

export const viewport: Viewport = { themeColor: '#05070B', width: 'device-width', initialScale: 1 };

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.brand,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.webp`,
  email,
  telephone: phones.india.tel,
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  areaServed: ['Russia', 'CIS', 'Eastern Europe', 'Middle East', 'North Africa'],
};

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-950">{d.nav.skip}</a>
        <Header lang={lang} t={d.nav} />
        <main id="main" className="flex-1">{children}</main>
        <Footer lang={lang} d={d} />
        <WhatsAppButton text={d.ui.whatsappText} aria={d.ui.whatsappAria} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
