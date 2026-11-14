import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left' }: { eyebrow?: string; title: string; intro?: string; tone?: 'light' | 'dark'; align?: 'left' | 'center' }) {
  const center = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`mb-10 max-w-3xl ${center}`}>
      {eyebrow && <div className={tone === 'dark' ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</div>}
      <h2 className={`h-display mt-3 text-[1.9rem] sm:text-[2.4rem] ${tone === 'dark' ? 'text-cream-50' : 'text-navy-900'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-[1.02rem] leading-relaxed ${tone === 'dark' ? 'text-cream-100/75' : 'text-navy-800/80'}`}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-cream-50">
      <div aria-hidden className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #DCBB4E 1px, transparent 0)', backgroundSize: '22px 22px', maskImage: 'linear-gradient(100deg, transparent 30%, black 95%)', WebkitMaskImage: 'linear-gradient(100deg, transparent 30%, black 95%)' }} />
      <div className="container-site relative py-16 sm:py-20">
        <div className="eyebrow-dark">{eyebrow}</div>
        <h1 className="h-display mt-4 max-w-3xl text-[2.25rem] sm:text-[3.1rem]">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-cream-100/75">{intro}</p>}
        {children}
      </div>
      <div aria-hidden className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
    </section>
  );
}

export function CtaBand({ title, body, cta, href = '/contact#enquiry' }: { title: string; body?: string; cta: string; href?: string }) {
  return (
    <section className="py-16">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-12 text-cream-50 sm:px-12">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold-500/25" />
          <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-gold-500/20" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="h-display text-[1.75rem] sm:text-[2.2rem]">{title}</h2>
              {body && <p className="mt-3 leading-relaxed text-cream-100/75">{body}</p>}
            </div>
            <Link href={href} className="btn-gold shrink-0">{cta} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 underline-offset-4 hover:text-gold-700 hover:underline">{children} <ArrowRight className="h-4 w-4" /></Link>;
}
