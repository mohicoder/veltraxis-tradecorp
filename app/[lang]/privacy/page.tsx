import { PageHero } from '@/components/ui';
import { getDict } from '@/content';
import { resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('privacy', '/privacy');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { legal } = getDict(lang);
  const page = legal.privacy;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={legal.updated} />
      <section className="py-14 sm:py-20">
        <div className="container-site prose-site max-w-3xl">
          {page.sections.map((s) => <div key={s.h}><h2>{s.h}</h2><p>{s.p}</p></div>)}
        </div>
      </section>
    </>
  );
}
