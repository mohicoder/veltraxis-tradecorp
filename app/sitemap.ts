import type { MetadataRoute } from 'next';
import { routes, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${SITE_URL}${r === '/' ? '' : r}`, changeFrequency: 'monthly', priority: r === '/' ? 1 : 0.7 }));
}
