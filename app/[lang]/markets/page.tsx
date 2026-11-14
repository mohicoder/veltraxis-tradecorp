import { MapPin } from 'lucide-react';
import { RouteMap } from '@/components/RouteMap';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { getDict } from '@/content';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('markets', '/markets');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { markets, ui } = getDict(lang);
  return (
    <>
      <PageHero eyebrow={markets.eyebrow} title={markets.title} intro={markets.intro} />
      <section className="bg-navy-950 pb-14">
        <div className="container-site"><RouteMap className="mx-auto h-auto w-full max-w-5xl" labels={ui.cities} aria={ui.globeAria} /></div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {markets.regions.map((r) => (
            <article key={r.key} id={r.key} className="card scroll-mt-24 p-6">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-navy-950">{r.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {r.countries.map((c) => <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-sm text-navy-800"><MapPin className="h-3.5 w-3.5 text-gold-700" />{c}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100 py-16 sm:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow={ui.supportEyebrow} title={markets.supportTitle} />
          <div>
            {markets.support.map((p) => <p key={p} className="mb-4 text-[1.05rem] leading-relaxed text-navy-700">{p}</p>)}
            <p className="mt-6 border-l-2 border-gold-500 pl-4 text-sm italic text-navy-600">{markets.disclaimer}</p>
          </div>
        </div>
      </section>
      <CtaBand title={ui.marketsCtaTitle} body={ui.marketsCtaBody} cta={markets.cta} href={lp(lang, '/contact#enquiry')} />
    </>
  );
}
