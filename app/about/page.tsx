import { Quote } from 'lucide-react';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { about, home } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('about', '/about');

export default function Page() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} intro={about.intro[0]} />
      <section className="py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="text-[1.04rem] leading-relaxed text-navy-800/85">
            {about.intro.slice(1).map((p) => <p key={p} className="mb-5">{p}</p>)}
            <h2 className="h-display mb-3 mt-10 text-[1.8rem] text-navy-900">{about.drivesTitle}</h2>
            <p>{about.drives}</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-navy-900 p-6 text-cream-50 sm:p-7">
              <div className="eyebrow-dark">Our vision</div>
              <p className="mt-3 font-serif text-[1.2rem] leading-snug">{about.vision}</p>
            </div>
            <div className="card p-6 sm:p-7">
              <div className="eyebrow">Our mission</div>
              <p className="mt-3 font-serif text-[1.2rem] leading-snug text-navy-900">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100/60 py-16">
        <div className="container-site">
          <SectionHeading eyebrow="Our values" title="What we hold ourselves to" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div key={v.title} className="card p-6">
                <div className="font-serif text-3xl text-gold-500">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-site">
          <figure className="relative mx-auto max-w-4xl rounded-3xl border border-cream-200 bg-white p-8 sm:p-12">
            <Quote className="h-10 w-10 text-gold-500" strokeWidth={1.4} />
            <div className="eyebrow mt-4">{about.founderTitle}</div>
            <blockquote className="mt-4 font-serif text-[1.35rem] leading-relaxed text-navy-900 sm:text-[1.6rem]">“{about.founder}”</blockquote>
            <figcaption className="mt-6 text-sm font-bold uppercase tracking-wider text-navy-600">— {about.founderSign}</figcaption>
          </figure>
        </div>
      </section>
      <CtaBand title={home.closingTitle} body={home.closing} cta={home.closingCta} />
    </>
  );
}
