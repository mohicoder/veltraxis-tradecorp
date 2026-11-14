import type { Dict } from '@/content';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.veltraxistradecorp.com').replace(/\/$/, '');
export const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 4);

type NavKey = keyof Dict['nav'];
export type NavItem = { href: string; key: NavKey };

export const nav: { main: NavItem[]; company: NavItem[] } = {
  main: [
    { href: '/products', key: 'products' },
    { href: '/services', key: 'services' },
    { href: '/markets', key: 'markets' },
    { href: '/landed-cost-calculator', key: 'calculator' },
  ],
  company: [
    { href: '/about', key: 'about' },
    { href: '/why-veltraxis', key: 'why' },
    { href: '/quality-and-process', key: 'quality' },
    { href: '/faqs', key: 'faqs' },
  ],
};

export const footerLinks: NavItem[] = [
  { href: '/about', key: 'about' },
  { href: '/products', key: 'products' },
  { href: '/services', key: 'services' },
  { href: '/markets', key: 'markets' },
  { href: '/why-veltraxis', key: 'why' },
  { href: '/quality-and-process', key: 'quality' },
  { href: '/landed-cost-calculator', key: 'calculatorLong' },
  { href: '/faqs', key: 'faqs' },
  { href: '/contact', key: 'contactUs' },
  { href: '/privacy', key: 'privacy' },
  { href: '/terms', key: 'terms' },
];

/** Every public route (without language prefix) — used for the sitemap. */
export const routes = ['/', '/about', '/products', '/services', '/markets', '/why-veltraxis', '/quality-and-process', '/faqs', '/landed-cost-calculator', '/contact', '/privacy', '/terms'];
