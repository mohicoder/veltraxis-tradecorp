import type { Metadata } from 'next';
import { getDict, type Dict } from '@/content';
import { locales, lp, type Locale } from './i18n';
import { SITE_URL } from './site';

const OG_IMAGE = { url: `${SITE_URL}/brand/og.jpg`, width: 1200, height: 630, alt: 'VELTRAXIS TRADECORP — Export · Import · Global Trade' };

export function pageMeta(lang: Locale, key: keyof Dict['meta'], path: string): Metadata {
  const m = getDict(lang).meta[key];
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = SITE_URL + lp(l, path);
  languages['x-default'] = SITE_URL + lp('en', path);
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: SITE_URL + lp(lang, path), languages },
    openGraph: { title: m.title, description: m.description, url: SITE_URL + lp(lang, path), siteName: 'VELTRAXIS TRADECORP', type: 'website', locale: lang === 'ru' ? 'ru_RU' : 'en_IN', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [OG_IMAGE.url] },
  };
}

export function metaFor(key: keyof Dict['meta'], path: string) {
  return async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { resolveLang } = await import('./i18n');
    return pageMeta(await resolveLang(params), key, path);
  };
}
