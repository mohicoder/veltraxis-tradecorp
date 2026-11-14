import { Plus } from 'lucide-react';
import { CtaBand, PageHero } from '@/components/ui';
import { getDict } from '@/content';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('faqs', '/faqs');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { faqs, ui } = getDict(lang);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <PageHero eyebrow={faqs.eyebrow} title={faqs.title} />
      <section className="py-16 sm:py-20">
        <div className="container-site max-w-4xl">
          <div className="border-b border-navy-950/15">
            {faqs.items.map((f, i) => (
              <details key={f.q} className="group border-t border-navy-950/15 py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.15rem] font-semibold tracking-[-0.015em] text-navy-950 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="mt-1 h-5 w-5 shrink-0 text-gold-600 transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-navy-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={ui.faqCtaTitle} body={ui.faqCtaBody} cta={ui.contactUs} href={lp(lang, '/contact#enquiry')} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
