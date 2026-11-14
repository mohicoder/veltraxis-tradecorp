import { Icon } from '@/components/Icon';
import { CtaBand, PageHero } from '@/components/ui';
import { why } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('why', '/why-veltraxis');

export default function Page() {
  return (
    <>
      <PageHero eyebrow={why.eyebrow} title={why.title} intro={why.intro} />
      <section className="py-16">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((w) => (
            <article key={w.title} className="card flex flex-col p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-gold-300"><Icon name={w.icon} className="h-5 w-5" /></span>
              <h2 className="mt-4 text-[1.02rem] font-bold leading-snug text-navy-900">{w.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{w.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title={why.closing} cta="Send Your Requirement" />
    </>
  );
}
