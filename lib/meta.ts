import type { Metadata } from 'next';
import { getDict, type Dict } from '@/content';
import { locales, lp, type Locale } from './i18n';
import { SITE_URL } from './site';

export function pageMeta(lang: Locale, key: keyof Dict['meta'], path: string): Metadata {
  const m = getDict(lang).meta[key];
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = SITE_URL + lp(l, path);
  languages['x-default'] = SITE_URL + lp('en', path);
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: SITE_URL + lp(lang, path), languages },
    openGraph: { title: m.title, description: m.description, url: SITE_URL + lp(lang, path), siteName: 'VELTRAXIS TRADECORP', type: 'website', locale: lang === 'ru' ? 'ru_RU' : 'en_IN' },
    twitter: { card: 'summary', title: m.title, description: m.description },
  };
}

export function metaFor(key: keyof Dict['meta'], path: string) {
  return async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { resolveLang } = await import('./i18n');
    return pageMeta(await resolveLang(params), key, path);
  };
}
