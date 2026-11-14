import { Icon } from '@/components/Icon';
import { CtaBand, PageHero } from '@/components/ui';
import { getDict } from '@/content';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('services', '/services');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { services, ui } = getDict(lang);
  return (
    <>
      <PageHero eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 md:grid-cols-2">
          {services.items.map((s, i) => (
            <article key={s.title} className="bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <Icon name={s.icon} className="h-7 w-7 text-navy-950" />
                <span className="text-sm font-medium tabular-nums text-gold-600">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 className="mt-8 text-[1.3rem] font-semibold leading-snug tracking-[-0.025em] text-navy-950">{s.title}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-600">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title={ui.servicesCtaTitle} body={ui.servicesCtaBody} cta={services.cta} href={lp(lang, '/contact#enquiry')} />
    </>
  );
}
