import Link from 'next/link';
import { headers } from 'next/headers';
import { getDict } from '@/content';
import { lp } from '@/lib/i18n';

export default async function NotFound() {
  // not-found pages don't receive params; middleware passes the language as a header
  const lang = (await headers()).get('x-site-lang') === 'ru' ? 'ru' : 'en';
  const d = getDict(lang);
  return (
    <section className="container-site py-28 text-center">
      <div className="eyebrow">404</div>
      <h1 className="h-display mt-4 text-4xl text-navy-950">{d.notFound.title}</h1>
      <p className="mx-auto mt-4 max-w-md text-navy-600">{d.notFound.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={lp(lang, '/')} className="btn-navy">{d.notFound.home}</Link>
        <Link href={lp(lang, '/contact#enquiry')} className="btn-ghost">{d.nav.quote}</Link>
      </div>
    </section>
  );
}
