import Link from 'next/link';
import { Info } from 'lucide-react';
import { Icon } from '@/components/Icon';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { categories, products, type Category } from '@/content/en';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('products', '/products');

function CategoryCard({ c }: { c: Category }) {
  return (
    <article id={c.slug} className="card scroll-mt-24 flex flex-col p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-700 text-gold-300"><Icon name={c.icon} className="h-6 w-6" /></span>
        <h3 className="pt-1 font-serif text-[1.3rem] leading-snug text-navy-900">{c.title}</h3>
      </div>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-navy-800/80">{c.body}</p>
      {c.note && <p className="mt-4 flex gap-2.5 rounded-xl bg-cream-100 p-3.5 text-sm leading-relaxed text-navy-800"><Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />{c.note}</p>}
      <div className="mt-auto pt-5">
        <Link href={`/contact?product=${encodeURIComponent(c.title)}#enquiry`} className="btn-ghost !px-4 !py-2 text-[0.82rem]">{products.categoryCta}</Link>
      </div>
    </article>
  );
}

export default function Page() {
  const consumer = categories.filter((c) => c.group === 'consumer');
  const industrial = categories.filter((c) => c.group === 'industrial');
  return (
    <>
      <PageHero eyebrow={products.eyebrow} title={products.title} intro={products.intro}>
        <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-cream-50/20 px-3 py-1.5 text-xs font-semibold text-cream-100/85 hover:border-gold-400 hover:text-gold-300">{c.title.split(',')[0].replace(' and ', ' & ')}</a>)}
        </nav>
      </PageHero>
      <section className="py-16">
        <div className="container-site">
          <SectionHeading title={products.consumerTitle} />
          <div className="grid gap-5 md:grid-cols-2">{consumer.map((c) => <CategoryCard key={c.slug} c={c} />)}</div>
          <div className="mt-16"><SectionHeading title={products.industrialTitle} /></div>
          <div className="grid gap-5 md:grid-cols-2">{industrial.map((c) => <CategoryCard key={c.slug} c={c} />)}</div>
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100/60 py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div id="custom" className="scroll-mt-24">
            <SectionHeading eyebrow="Custom sourcing" title={products.customTitle} intro={products.custom} />
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="font-serif text-xl text-navy-900">{products.howTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-800/80">{products.how}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {products.howList.map((x) => <li key={x} className="rounded-lg bg-cream-100 px-3 py-2 text-sm font-semibold text-navy-800">{x}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand title="Ready to source?" body="Send the specification and destination — we will assess supply options and come back with a practical proposal." cta={products.cta} />
    </>
  );
}
