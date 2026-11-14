import { Factory, Handshake, Mail, MessageCircle, Phone } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';
import { PageHero } from '@/components/ui';
import { contact } from '@/content/en';
import { company, email, mailLink, phones, telLink, waLink } from '@/lib/contacts';
import { pageMeta } from '@/lib/meta';
import { MAX_UPLOAD_MB } from '@/lib/site';

export const metadata = pageMeta('contact', '/contact');

export default function Page() {
  return (
    <>
      <PageHero eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />
      <section id="enquiry" className="scroll-mt-20 py-14">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <aside className="order-2 space-y-5 lg:order-1">
            <div className="rounded-2xl bg-navy-900 p-6 text-cream-50">
              <div className="eyebrow-dark">Contact</div>
              <div className="mt-3 font-serif text-xl">{company.brand}</div>
              <div className="text-sm text-cream-100/60">{company.country}</div>
              <ul className="mt-5 space-y-3.5 text-sm">
                <li><a href={mailLink('Trade enquiry')} className="flex items-center gap-2.5 break-all hover:text-gold-300"><Mail className="h-4 w-4 shrink-0 text-gold-400" />{email}</a></li>
                {Object.values(phones).map((p) => (
                  <li key={p.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a href={telLink(p)} className="flex items-center gap-2.5 hover:text-gold-300"><Phone className="h-4 w-4 text-gold-400" />{p.display}</a>
                    <span className="text-cream-100/45">{p.label}</span>
                    <a href={waLink(p)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <Factory className="h-6 w-6 text-gold-600" strokeWidth={1.6} />
              <h2 className="mt-3 font-serif text-lg text-navy-900">{contact.suppliersTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{contact.suppliers}</p>
            </div>
            <div className="card p-6">
              <Handshake className="h-6 w-6 text-gold-600" strokeWidth={1.6} />
              <h2 className="mt-3 font-serif text-lg text-navy-900">{contact.partnersTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{contact.partners}</p>
            </div>
          </aside>
          <div className="order-1 lg:order-2">
            <h2 className="h-display mb-5 text-[1.8rem] text-navy-900">Send your requirement</h2>
            <EnquiryForm maxMb={MAX_UPLOAD_MB} />
          </div>
        </div>
      </section>
    </>
  );
}
