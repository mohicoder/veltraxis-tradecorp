export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Localized path. English lives at the root (/products), Russian is prefixed (/ru/products). */
export function lp(lang: Locale, path: string): string {
  const [base, hash] = path.split('#');
  const clean = base === '/' ? '' : base;
  const out = lang === defaultLocale ? clean || '/' : `/${lang}${clean}`;
  return hash ? `${out}#${hash}` : out;
}

/** Strip the locale prefix from a pathname. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/');
  if (parts[1] && isLocale(parts[1])) {
    const rest = '/' + parts.slice(2).join('/');
    return rest === '/' ? '/' : rest.replace(/\/$/, '');
  }
  return pathname || '/';
}

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: 'EN', name: 'English' },
  ru: { short: 'RU', name: 'Русский' },
};

export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return isLocale(lang) ? lang : defaultLocale;
}
