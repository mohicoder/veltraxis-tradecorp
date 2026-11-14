import { Plus } from 'lucide-react';
import { CtaBand, PageHero } from '@/components/ui';
import { faqs } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('faqs', '/faqs');

const ld = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow={faqs.eyebrow} title={faqs.title} />
      <section className="py-16">
        <div className="container-site max-w-4xl">
          <div className="divide-y divide-cream-200 rounded-2xl border border-cream-200 bg-white">
            {faqs.items.map((f, i) => (
              <details key={f.q} className="group p-5 sm:p-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.05rem] font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="mt-0.5 h-5 w-5 shrink-0 text-gold-700 transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 leading-relaxed text-navy-800/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Still have a question?" body="Send it with your requirement — we will answer both." cta="Contact Us" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
