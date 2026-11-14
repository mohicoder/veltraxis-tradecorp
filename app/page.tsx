import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Factory, Handshake, ShoppingCart } from 'lucide-react';
import { Globe } from '@/components/Globe';
import { LandedCostCalculator } from '@/components/LandedCostCalculator';
import { Icon } from '@/components/Icon';
import { SectionHeading, TextLink } from '@/components/ui';
import { categories, home, markets, quality, trustStrip } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('home', '/');

const countryCount = new Set(markets.regions.flatMap((r) => r.countries)).size;
const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

export default function Home() {
  return (
    <>
      {/* HERO — dark, with the live globe */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute inset-y-0 right-[-7%] -z-10 hidden w-[62%] lg:block">
          <Globe className="h-full w-full" scale={0.4} />
        </div>
        <div aria-hidden className="absolute inset-y-0 left-0 -z-10 hidden w-[46%] bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent lg:block" />

        <div className="container-site lg:flex lg:min-h-[calc(100svh-4.5rem)] lg:max-h-[880px] lg:items-center">
          <div className="max-w-[40rem] pb-6 pt-14 sm:pt-20 lg:py-24">
            <div className="eyebrow-dark rise">{home.eyebrow}</div>
            <h1 className="h-display rise mt-6 text-[2.85rem] sm:text-[4.4rem] lg:text-[5rem]" style={{ animationDelay: '80ms' }}>
              Your trusted Indian partner for <span className="accent">international trade</span>
            </h1>
            <p className="rise mt-7 max-w-xl text-[1.08rem] leading-relaxed text-white/70 sm:text-[1.15rem]" style={{ animationDelay: '160ms' }}>{home.intro[0]}</p>
            <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ animationDelay: '240ms' }}>
              <Link href="/contact#enquiry" className="btn-white !px-6 !py-3.5">{home.primaryCta}</Link>
              <Link href="/products" className="link-under text-[0.95rem] text-white">{home.secondaryCta}</Link>
            </div>
          </div>
        </div>

        {/* phones & tablets: globe below the text */}
        <div className="relative -mt-2 h-[360px] sm:h-[480px] lg:hidden">
          <Globe className="absolute inset-0 h-full w-full" />
        </div>

        <div className="border-t border-white/10">
          <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-3 py-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/55 md:flex md:justify-between">
            {trustStrip.map((t) => <li key={t} className="flex items-center gap-2.5"><span className="h-1 w-1 rounded-full bg-gold-400" />{t}</li>)}
          </ul>
        </div>
      </section>

      {/* STATEMENT + FACTS */}
      <section className="bg-cream-100 py-20 sm:py-28">
        <div className="container-site">
          <p className="h-display mx-auto max-w-5xl text-center text-[1.9rem] text-navy-950 sm:text-[3rem]">
            One sourcing partner for <span className="accent-ink">healthcare, consumer and industrial</span> supply — from India to Russia, the CIS, Eastern Europe and the Arab world.
          </p>
          <dl className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 md:grid-cols-4">
            {[
              { n: String(categories.length), l: 'Product categories' },
              { n: String(countryCount), l: 'Countries in our market coverage' },
              { n: String(markets.regions.length), l: 'Market regions' },
              { n: 'GST · IEC', l: 'Registered Indian trade business' },
            ].map((f) => (
              <div key={f.l} className="bg-cream-50 p-6 sm:p-8">
                <dt className="sr-only">{f.l}</dt>
                <dd className="text-[2.2rem] font-semibold leading-none tracking-[-0.04em] text-navy-950 sm:text-[2.8rem]">{f.n}</dd>
                <dd className="mt-3 text-sm text-navy-500">{f.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <SectionHeading eyebrow="Products and Industries" title="Products across *industries*" intro={home.productsIntro} />
            <div className="mb-12 shrink-0"><TextLink href="/products">View all categories</TextLink></div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/products#${c.slug}`} className="group relative flex flex-col bg-white p-6 transition-colors hover:bg-navy-950 sm:p-7">
                <div className="flex items-center justify-between">
                  <Icon name={c.icon} className="h-6 w-6 text-navy-950 transition-colors group-hover:text-gold-300" />
                  <span className="text-xs font-medium tabular-nums text-navy-300 group-hover:text-white/40">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950 transition-colors group-hover:text-white">{c.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-500 transition-colors group-hover:text-white/60">{firstSentence(c.body)}</p>
                <ArrowUpRight className="absolute right-6 top-[4.6rem] h-5 w-5 -translate-x-1 translate-y-1 text-gold-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[0.98rem] leading-relaxed text-navy-600">{home.productsOutside} <Link href="/contact#enquiry" className="link-under text-navy-950">Send a custom requirement</Link></p>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-y border-cream-200 bg-white py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="h-display mt-4 text-[2.1rem] text-navy-950 sm:text-[2.9rem]">Successful trade starts with <span className="accent-ink">getting the details right</span></h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-navy-600">{home.details}</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-navy-600">{home.approach}</p>
          </div>
          <ol className="self-end">
            {home.approachPoints.map((p, i) => (
              <li key={p} className="flex items-baseline gap-6 border-t border-cream-200 py-6 last:border-b">
                <span className="w-8 text-sm font-medium tabular-nums text-gold-600">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[1.4rem] font-semibold tracking-[-0.025em] text-navy-950 sm:text-[1.65rem]">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MARKETS */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
        <div aria-hidden className="absolute -left-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(120,150,200,0.14),transparent_65%)]" />
        <div className="container-site relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading tone="dark" eyebrow="Markets" title="Our *international* relationships" intro={home.relations} />
              <Link href="/markets" className="btn-white">{markets.cta} <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul>
              {markets.regions.map((r) => (
                <li key={r.key} className="group border-t border-white/10 py-5 last:border-b">
                  <Link href={`/markets#${r.key}`} className="grid gap-1.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <span className="text-[1.05rem] font-semibold tracking-[-0.015em] text-white transition-colors group-hover:text-gold-300">{r.title}</span>
                    <span className="text-sm leading-relaxed text-white/50">{r.countries.join(', ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Our process" title="From enquiry to *dispatch* in five steps" />
          <ol className="grid gap-x-6 gap-y-10 md:grid-cols-5">
            {quality.steps.map((s, i) => (
              <li key={s.title} className="border-t border-navy-950 pt-5">
                <div className="text-sm font-medium tabular-nums text-gold-600">Step {String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-3 text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12"><TextLink href="/quality-and-process">Quality, documents and samples</TextLink></div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-cream-100 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Landed Cost Calculator" title="See the *full cost* before you commit" intro={home.calcBody} />
          <LandedCostCalculator compact />
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Work with us" title="One trade partner, *three ways* to start" />
          <div className="grid gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 md:grid-cols-3">
            {[
              { icon: ShoppingCart, title: 'Buyers and importers', body: 'Share a product, specification and destination. We assess supply options and prepare a commercial proposal.', href: '/contact?role=buyer#enquiry', cta: 'Request a Quote' },
              { icon: Factory, title: 'Manufacturers and suppliers', body: 'Indian manufacturers looking for international buyers: send your profile, catalogue and export documentation.', href: '/contact?role=supplier#enquiry', cta: 'Partner with us' },
              { icon: Handshake, title: 'Distributors and trade partners', body: 'Tell us your markets and categories, and the type of long-term supply partnership you want to develop.', href: '/contact?role=partner#enquiry', cta: 'Start a conversation' },
            ].map((a) => (
              <div key={a.title} className="flex flex-col bg-white p-7 sm:p-8">
                <a.icon className="h-6 w-6 text-navy-950" strokeWidth={1.5} />
                <h3 className="mt-8 text-[1.35rem] font-semibold tracking-[-0.025em] text-navy-950">{a.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-navy-500">{a.body}</p>
                <div className="mt-8"><TextLink href={a.href}>{a.cta}</TextLink></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
