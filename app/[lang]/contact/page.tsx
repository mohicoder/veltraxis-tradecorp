import { Factory, Handshake, Mail, MessageCircle, Phone } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';
import { PageHero } from '@/components/ui';
import { getDict } from '@/content';
import { en } from '@/content/en';
import { company, email, mailLink, phones, telLink, waLink } from '@/lib/contacts';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';
import { MAX_UPLOAD_MB } from '@/lib/site';

export const generateMetadata = metaFor('contact', '/contact');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { contact, form, ui } = getDict(lang);
  const phoneLabel = (k: string) => (lang === 'ru' ? (k === 'India' ? 'Индия' : 'Россия') : k);
  return (
    <>
      <PageHero eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />
      <section id="enquiry" className="scroll-mt-20 py-14 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <aside className="order-2 space-y-5 lg:order-1">
            <div className="rounded-xl bg-navy-950 p-6 text-white">
              <div className="eyebrow-dark">{ui.contactHeading}</div>
              <div className="mt-4 text-xl font-semibold tracking-[-0.02em]">{company.brand}</div>
              <ul className="mt-5 space-y-3.5 text-sm">
                <li><a href={mailLink()} className="flex items-center gap-2.5 break-all hover:text-gold-300"><Mail className="h-4 w-4 shrink-0 text-gold-400" />{email}</a></li>
                {Object.values(phones).map((p) => (
                  <li key={p.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a href={telLink(p)} className="flex items-center gap-2.5 hover:text-gold-300"><Phone className="h-4 w-4 text-gold-400" />{p.display}</a>
                    <span className="text-white/40">{phoneLabel(p.label)}</span>
                    <a href={waLink(p)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white"><MessageCircle className="h-3.5 w-3.5" />{ui.whatsapp}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <Factory className="h-6 w-6 text-navy-950" strokeWidth={1.5} />
              <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-navy-950">{contact.suppliersTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{contact.suppliers}</p>
            </div>
            <div className="card p-6">
              <Handshake className="h-6 w-6 text-navy-950" strokeWidth={1.5} />
              <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-navy-950">{contact.partnersTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{contact.partners}</p>
            </div>
          </aside>
          <div className="order-1 lg:order-2">
            <h2 className="h-display mb-6 text-[2rem] text-navy-950">{ui.sendHeading}</h2>
            <EnquiryForm maxMb={MAX_UPLOAD_MB} t={form} tEn={en.form} lang={lang} privacyHref={lp(lang, '/privacy')} />
          </div>
        </div>
      </section>
    </>
  );
}
