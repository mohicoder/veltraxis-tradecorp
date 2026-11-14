import Link from 'next/link';
import { Info } from 'lucide-react';
import { Icon } from '@/components/Icon';
import { CtaBand, PageHero, SectionHeading } from '@/components/ui';
import { getDict } from '@/content';
import type { Category } from '@/content/en';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('products', '/products');

function CategoryCard({ c, cta, href }: { c: Category; cta: string; href: string }) {
  return (
    <article id={c.slug} className="card flex scroll-mt-24 flex-col p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-300"><Icon name={c.icon} className="h-6 w-6" /></span>
        <h3 className="pt-1 text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-navy-950">{c.title}</h3>
      </div>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-navy-600">{c.body}</p>
      {c.note && <p className="mt-4 flex gap-2.5 rounded-lg bg-cream-100 p-3.5 text-sm leading-relaxed text-navy-700"><Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />{c.note}</p>}
      <div className="mt-auto pt-5">
        <Link href={href} className="btn-ghost !px-4 !py-2 text-[0.82rem]">{cta}</Link>
      </div>
    </article>
  );
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { products, categories, ui } = getDict(lang);
  const L = (p: string) => lp(lang, p);
  const card = (c: Category) => <CategoryCard key={c.slug} c={c} cta={products.categoryCta} href={L(`/contact?product=${encodeURIComponent(c.title)}#enquiry`)} />;
  return (
    <>
      <PageHero eyebrow={products.eyebrow} title={products.title} intro={products.intro}>
        <nav aria-label={ui.categoriesNav} className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/75 hover:border-gold-400 hover:text-gold-300">{c.title.split(',')[0]}</a>)}
        </nav>
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading title={products.consumerTitle} />
          <div className="grid gap-5 md:grid-cols-2">{categories.filter((c) => c.group === 'consumer').map(card)}</div>
          <div className="mt-20"><SectionHeading title={products.industrialTitle} /></div>
          <div className="grid gap-5 md:grid-cols-2">{categories.filter((c) => c.group === 'industrial').map(card)}</div>
        </div>
      </section>
      <section className="border-y border-cream-200 bg-cream-100 py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div id="custom" className="scroll-mt-24">
            <SectionHeading eyebrow={ui.customEyebrow} title={products.customTitle} intro={products.custom} />
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-navy-950">{products.howTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-600">{products.how}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {products.howList.map((x) => <li key={x} className="rounded-lg bg-cream-100 px-3 py-2 text-sm font-medium text-navy-800">{x}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand title={ui.productsCtaTitle} body={ui.productsCtaBody} cta={products.cta} href={L('/contact#enquiry')} />
    </>
  );
}
