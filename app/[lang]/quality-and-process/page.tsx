import { ShieldCheck } from 'lucide-react';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { getDict } from '@/content';
import { company } from '@/lib/contacts';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('quality', '/quality-and-process');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { quality, ui } = getDict(lang);
  return (
    <>
      <PageHero eyebrow={quality.eyebrow} title={ui.qualityHeroTitle} intro={ui.qualityHeroIntro} />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {quality.blocks.map((b, i) => (
            <article key={b.title} className={i === 0 ? 'rounded-xl bg-navy-950 p-7 text-white sm:p-8' : 'card p-7 sm:p-8'}>
              {i === 0 && <ShieldCheck className="mb-5 h-8 w-8 text-gold-400" strokeWidth={1.5} />}
              <h2 className={`text-[1.3rem] font-semibold tracking-[-0.02em] ${i === 0 ? 'text-white' : 'text-navy-950'}`}>{b.title}</h2>
              <p className={`mt-3 leading-relaxed ${i === 0 ? 'text-white/70' : 'text-navy-600'}`}>{b.body}</p>
              {i === 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-white/10 p-3.5"><dt className="text-white/50">GSTIN</dt><dd className="mt-1 font-semibold text-gold-300">{company.gstin || ui.sharedOnRequest}</dd></div>
                  <div className="rounded-lg border border-white/10 p-3.5"><dt className="text-white/50">IEC</dt><dd className="mt-1 font-semibold text-gold-300">{company.iec || ui.sharedOnRequest}</dd></div>
                </dl>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100 py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow={ui.processEyebrow} title={quality.processTitle} />
          <ol>
            {quality.steps.map((s, i) => (
              <li key={s.title} className="grid gap-2 border-t border-navy-950/15 py-7 last:border-b sm:grid-cols-[8rem_16rem_1fr] sm:gap-8">
                <span className="text-sm font-medium tabular-nums text-gold-600">{ui.step} {String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950">{s.title}</h3>
                <p className="leading-relaxed text-navy-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand title={ui.qualityCtaTitle} body={quality.steps[0].body} cta={quality.cta} href={lp(lang, '/contact#enquiry')} />
    </>
  );
}
