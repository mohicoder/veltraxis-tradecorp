import type { MetadataRoute } from 'next';
import { locales, lp } from '@/lib/i18n';
import { routes, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((r) =>
    locales.map((l) => ({
      url: SITE_URL + (lp(l, r) === '/' ? '' : lp(l, r)),
      changeFrequency: 'monthly' as const,
      priority: r === '/' ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, SITE_URL + (lp(x, r) === '/' ? '' : lp(x, r))])) },
    })),
  );
}
