import { Icon } from '@/components/Icon';
import { CtaBand, PageHero } from '@/components/ui';
import { getDict } from '@/content';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('why', '/why-veltraxis');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { why, ui } = getDict(lang);
  return (
    <>
      <PageHero eyebrow={why.eyebrow} title={why.title} intro={why.intro} />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((w) => (
            <article key={w.title} className="flex flex-col bg-white p-7">
              <Icon name={w.icon} className="h-6 w-6 text-navy-950" />
              <h2 className="mt-8 text-[1.08rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950">{w.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{w.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title={why.closing} cta={ui.sendRequirement} href={lp(lang, '/contact#enquiry')} />
    </>
  );
}
