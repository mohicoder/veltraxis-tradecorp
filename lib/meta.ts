import type { Metadata } from 'next';
import { meta } from '@/content/en';
import { SITE_URL } from './site';

export function pageMeta(key: keyof typeof meta, path: string): Metadata {
  const m = meta[key];
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: path },
    openGraph: { title: m.title, description: m.description, url: `${SITE_URL}${path}`, siteName: 'VELTRAXIS TRADECORP', type: 'website', locale: 'en' },
    twitter: { card: 'summary', title: m.title, description: m.description },
  };
}
