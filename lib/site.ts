export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.veltraxistradecorp.com').replace(/\/$/, '');
export const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 4);

export type NavItem = { href: string; label: string };

export const nav: { main: NavItem[]; company: NavItem[] } = {
  main: [
    { href: '/products', label: 'Products' },
    { href: '/services', label: 'Services' },
    { href: '/markets', label: 'Markets' },
    { href: '/landed-cost-calculator', label: 'Cost Calculator' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/why-veltraxis', label: 'Why VELTRAXIS' },
    { href: '/quality-and-process', label: 'Quality & Process' },
    { href: '/faqs', label: 'FAQs' },
  ],
};

export const footerLinks: NavItem[] = [
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/markets', label: 'Markets' },
  { href: '/why-veltraxis', label: 'Why VELTRAXIS' },
  { href: '/quality-and-process', label: 'Quality & Process' },
  { href: '/landed-cost-calculator', label: 'Landed Cost Calculator' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Website Terms' },
];

/** Every public route — used for the sitemap. */
export const routes = [
  '/',
  '/about',
  '/products',
  '/services',
  '/markets',
  '/why-veltraxis',
  '/quality-and-process',
  '/faqs',
  '/landed-cost-calculator',
  '/contact',
  '/privacy',
  '/terms',
];
