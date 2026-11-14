import { ShieldCheck } from 'lucide-react';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { quality } from '@/content/en';
import { company } from '@/lib/contacts';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('quality', '/quality-and-process');

export default function Page() {
  return (
    <>
      <PageHero eyebrow={quality.eyebrow} title="Registered, documented and agreed before an order proceeds" intro="GST registration and an Importer Exporter Code identify our business. Specifications, product documents, samples and inspection are settled for each order before production or dispatch." />
      <section className="py-16">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {quality.blocks.map((b, i) => (
            <article key={b.title} className={i === 0 ? 'rounded-2xl bg-navy-900 p-7 text-cream-50' : 'card p-7'}>
              {i === 0 && <ShieldCheck className="mb-4 h-8 w-8 text-gold-400" strokeWidth={1.5} />}
              <h2 className={`font-serif text-[1.35rem] ${i === 0 ? 'text-cream-50' : 'text-navy-900'}`}>{b.title}</h2>
              <p className={`mt-3 leading-relaxed ${i === 0 ? 'text-cream-100/80' : 'text-navy-800/80'}`}>{b.body}</p>
              {i === 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-navy-800 p-3.5"><dt className="text-cream-100/60">GSTIN</dt><dd className="mt-1 font-bold text-gold-300">{company.gstin || 'Shared on request'}</dd></div>
                  <div className="rounded-xl bg-navy-800 p-3.5"><dt className="text-cream-100/60">IEC</dt><dd className="mt-1 font-bold text-gold-300">{company.iec || 'Shared on request'}</dd></div>
                </dl>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100/60 py-16">
        <div className="container-site">
          <SectionHeading eyebrow="Our process" title={quality.processTitle} />
          <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[1.45rem] before:top-6 before:w-px before:bg-gold-500/40">
            {quality.steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-800 font-serif text-lg text-gold-300 ring-4 ring-cream-100">{i + 1}</span>
                <div className="card flex-1 p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-700">Step {i + 1}</div>
                  <h3 className="mt-1 text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-navy-800/80">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand title="Begin with step one" body={quality.steps[0].body} cta={quality.cta} />
    </>
  );
}
