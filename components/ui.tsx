import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

/** Renders a title where text wrapped in *asterisks* becomes the italic serif accent. */
export function Accent({ text, tone = 'dark' }: { text: string; tone?: 'dark' | 'light' }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => (p.startsWith('*') && p.endsWith('*') ? <span key={i} className={tone === 'dark' ? 'accent' : 'accent-ink'}>{p.slice(1, -1)}</span> : p))}
    </>
  );
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left' }: { eyebrow?: string; title: string; intro?: string; tone?: 'light' | 'dark'; align?: 'left' | 'center' }) {
  const center = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`mb-12 max-w-3xl ${center}`}>
      {eyebrow && <div className={tone === 'dark' ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</div>}
      <h2 className={`h-display mt-4 text-[2.1rem] sm:text-[2.9rem] ${tone === 'dark' ? 'text-white' : 'text-navy-950'}`}>
        <Accent text={title} tone={tone === 'dark' ? 'dark' : 'light'} />
      </h2>
      {intro && <p className={`mt-5 text-[1.05rem] leading-relaxed ${tone === 'dark' ? 'text-white/65' : 'text-navy-600'}`}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(120,150,200,0.18),transparent_65%)]" />
      <div aria-hidden className="absolute -right-24 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border border-white/[0.06]" />
      <div aria-hidden className="absolute -right-6 top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div className="container-site relative pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="eyebrow-dark rise">{eyebrow}</div>
        <h1 className="h-display rise mt-5 max-w-4xl text-[2.6rem] sm:text-[4rem]" style={{ animationDelay: '60ms' }}><Accent text={title} /></h1>
        {intro && <p className="rise mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-white/65" style={{ animationDelay: '120ms' }}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title, body, cta, href = '/contact#enquiry' }: { title: string; body?: string; cta: string; href?: string }) {
  return (
    <section className="py-20">
      <div className="container-site">
        <div className="flex flex-col gap-8 border-t border-navy-950/15 pt-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="h-display text-[2rem] text-navy-950 sm:text-[2.7rem]"><Accent text={title} tone="light" /></h2>
            {body && <p className="mt-4 text-[1.05rem] leading-relaxed text-navy-600">{body}</p>}
          </div>
          <Link href={href} className="btn-navy shrink-0">{cta} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}

export function TextLink({ href, children, tone = 'light' }: { href: string; children: ReactNode; tone?: 'light' | 'dark' }) {
  return <Link href={href} className={`group inline-flex items-center gap-1.5 text-[0.92rem] font-semibold ${tone === 'dark' ? 'text-white' : 'text-navy-950'}`}><span className="link-under">{children}</span> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Link>;
}
