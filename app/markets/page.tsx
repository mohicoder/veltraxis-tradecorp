import { MapPin } from 'lucide-react';
import { RouteMap } from '@/components/RouteMap';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { markets } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('markets', '/markets');

export default function Page() {
  return (
    <>
      <PageHero eyebrow={markets.eyebrow} title={markets.title} intro={markets.intro} />
      <section className="bg-navy-900 pb-12">
        <div className="container-site"><RouteMap className="mx-auto h-auto w-full max-w-5xl" /></div>
      </section>
      <section className="py-16">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {markets.regions.map((r) => (
            <article key={r.key} id={r.key} className="card scroll-mt-24 p-6">
              <h2 className="font-serif text-xl text-navy-900">{r.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {r.countries.map((c) => <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-sm font-medium text-navy-800"><MapPin className="h-3.5 w-3.5 text-gold-700" />{c}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100/60 py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Trade support" title={markets.supportTitle} />
          <div>
            {markets.support.map((p) => <p key={p} className="mb-4 text-[1.02rem] leading-relaxed text-navy-800/85">{p}</p>)}
            <p className="mt-6 border-l-2 border-gold-500 pl-4 text-sm italic text-navy-700">{markets.disclaimer}</p>
          </div>
        </div>
      </section>
      <CtaBand title="Supplying a market we haven’t listed?" body="We also work with other destinations according to buyer requirements." cta={markets.cta} />
    </>
  );
}
