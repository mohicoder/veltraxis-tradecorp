import Link from 'next/link';
import { ArrowRight, BadgeCheck, Check, Factory, Handshake, ShoppingCart } from 'lucide-react';
import { RouteMap } from '@/components/RouteMap';
import { LandedCostCalculator } from '@/components/LandedCostCalculator';
import { Icon } from '@/components/Icon';
import { CtaBand, SectionHeading, TextLink } from '@/components/ui';
import { categories, contact, home, markets, quality, trustStrip } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('home', '/');

const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-cream-50">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(59,108,140,0.35),transparent_60%)]" />
        <div className="container-site relative grid items-center gap-8 pb-10 pt-12 sm:pt-16 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:pb-16 lg:pt-20">
          <div>
            <div className="eyebrow-dark">{home.eyebrow}</div>
            <h1 className="h-display mt-4 text-[2.5rem] sm:text-[3.4rem] lg:text-[3.75rem]">{home.headline}</h1>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-cream-100/80">{home.intro[0]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#enquiry" className="btn-gold">{home.primaryCta} <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/products" className="btn-ghost-dark">{home.secondaryCta}</Link>
            </div>
          </div>
          <div className="relative -mx-5 sm:mx-0">
            <RouteMap className="h-auto w-full" />
          </div>
        </div>
        <div className="relative border-t border-cream-50/10 bg-navy-950/60">
          <ul className="container-site grid grid-cols-2 gap-x-4 gap-y-3 py-5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-cream-100/85 md:flex md:justify-between">
            {trustStrip.map((t) => <li key={t} className="flex items-start gap-2"><BadgeCheck className="mt-[1px] h-4 w-4 shrink-0 text-gold-400" />{t}</li>)}
          </ul>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="h-display mt-3 text-[1.9rem] text-navy-900 sm:text-[2.4rem]">{home.detailsTitle}</h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-navy-800/80">{home.details}</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-navy-800/80">{home.introShort}</p>
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="font-serif text-xl text-navy-900">{home.approachTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-800/80">{home.approach}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {home.approachPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-xl bg-cream-100 px-3.5 py-3 text-sm font-semibold text-navy-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="border-y border-cream-200 bg-cream-100/60 py-16 sm:py-20">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Products and Industries" title={home.productsTitle} intro={home.productsIntro} />
            <div className="mb-10 shrink-0"><TextLink href="/products">View all categories</TextLink></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/products#${c.slug}`} className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-gold-500/60">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-gold-300"><Icon name={c.icon} className="h-5 w-5" /></span>
                <h3 className="mt-4 text-[0.98rem] font-bold leading-snug text-navy-900">{c.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy-800/70">{firstSentence(c.body)}</p>
                <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-gold-700 opacity-80 group-hover:opacity-100">Details →</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[0.98rem] leading-relaxed text-navy-800/80">{home.productsOutside} <Link href="/contact#enquiry" className="font-bold text-navy-700 underline underline-offset-4 hover:text-gold-700">Send a custom requirement</Link></p>
        </div>
      </section>

      {/* MARKETS */}
      <section className="bg-navy-900 py-16 text-cream-50 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading tone="dark" eyebrow="Markets" title={home.relationsTitle} intro={home.relations} />
            <Link href="/markets" className="btn-ghost-dark">{markets.cta} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {markets.regions.map((r) => (
              <div key={r.key} className="rounded-2xl border border-cream-50/10 bg-navy-800/70 p-5">
                <h3 className="font-serif text-lg text-gold-300">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{r.countries.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Our process" title={quality.processTitle} />
          <ol className="grid gap-4 md:grid-cols-5">
            {quality.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-cream-200 bg-white p-5">
                <div className="font-serif text-4xl leading-none text-gold-500">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-4 font-bold leading-snug text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/70">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8"><TextLink href="/quality-and-process">Quality, documents and samples</TextLink></div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="border-y border-cream-200 bg-cream-100/60 py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Landed Cost Calculator" title={home.calcTitle} intro={home.calcBody} />
          <LandedCostCalculator compact />
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Work with us" title="One trade partner, three ways to start" align="center" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: ShoppingCart, title: 'Buyers and importers', body: 'Share a product, specification and destination. We assess supply options and prepare a commercial proposal.', href: '/contact?role=buyer#enquiry', cta: 'Request a Quote' },
              { icon: Factory, title: contact.suppliersTitle.replace('For m', 'M'), body: 'Indian manufacturers looking for international buyers: send your profile, catalogue and export documentation.', href: '/contact?role=supplier#enquiry', cta: 'Partner with us' },
              { icon: Handshake, title: contact.partnersTitle.replace('For d', 'D'), body: 'Tell us your markets and categories, and the type of long-term supply partnership you want to develop.', href: '/contact?role=partner#enquiry', cta: 'Start a conversation' },
            ].map((a) => (
              <div key={a.title} className="card flex flex-col p-6">
                <a.icon className="h-7 w-7 text-gold-600" strokeWidth={1.6} />
                <h3 className="mt-4 font-serif text-xl text-navy-900">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-800/75">{a.body}</p>
                <div className="mt-5"><TextLink href={a.href}>{a.cta}</TextLink></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={home.closingTitle} body={home.closing} cta={home.closingCta} />
    </>
  );
}
