import { Icon } from '@/components/Icon';
import { CtaBand, PageHero } from '@/components/ui';
import { services } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('services', '/services');

export default function Page() {
  return (
    <>
      <PageHero eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
      <section className="py-16">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {services.items.map((s, i) => (
            <article key={s.title} className="card p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-100 text-navy-700 ring-1 ring-cream-200"><Icon name={s.icon} className="h-6 w-6" /></span>
                <span className="font-serif text-2xl text-gold-500">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 className="mt-5 font-serif text-[1.3rem] leading-snug text-navy-900">{s.title}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-800/80">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Every assignment is scoped around your order" body="Product, origin, destination, quantity and commercial terms decide what we coordinate. Tell us yours." cta={services.cta} />
    </>
  );
}
