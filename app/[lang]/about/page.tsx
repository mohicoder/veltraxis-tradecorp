import { Quote } from 'lucide-react';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { getDict } from '@/content';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('about', '/about');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { about, home, ui } = getDict(lang);
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} intro={about.intro[0]} />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="text-[1.05rem] leading-relaxed text-navy-700">
            {about.intro.slice(1).map((p) => <p key={p} className="mb-5">{p}</p>)}
            <h2 className="h-display mb-4 mt-12 text-[2rem] text-navy-950">{about.drivesTitle}</h2>
            <p>{about.drives}</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-navy-950 p-7 text-white">
              <div className="eyebrow-dark">{ui.vision}</div>
              <p className="mt-4 text-[1.2rem] font-medium leading-snug tracking-[-0.015em]">{about.vision}</p>
            </div>
            <div className="card p-7">
              <div className="eyebrow">{ui.mission}</div>
              <p className="mt-4 text-[1.2rem] font-medium leading-snug tracking-[-0.015em] text-navy-950">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100 py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow={ui.valuesEyebrow} title={ui.valuesTitle} />
          <div className="grid gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div key={v.title} className="bg-white p-7">
                <div className="text-sm font-medium tabular-nums text-gold-600">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-navy-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="container-site">
          <figure className="mx-auto max-w-4xl">
            <Quote className="h-9 w-9 text-gold-500" strokeWidth={1.4} />
            <div className="eyebrow mt-5">{about.founderTitle}</div>
            <blockquote className="mt-5 text-[1.45rem] font-medium leading-snug tracking-[-0.02em] text-navy-950 sm:text-[1.85rem]">“{about.founder}”</blockquote>
            <figcaption className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-navy-500">— {about.founderSign}</figcaption>
          </figure>
        </div>
      </section>
      <CtaBand title={ui.closingTitle} body={home.closing} cta={home.closingCta} href={lp(lang, '/contact#enquiry')} />
    </>
  );
}
