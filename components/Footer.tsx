import Link from 'next/link';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { footer, trustStrip } from '@/content/en';
import { company, email, mailLink, phones, telLink, waLink } from '@/lib/contacts';
import { footerLinks } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-100">
      <div className="container-site grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-100/70">{footer.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {trustStrip.slice(0, 2).map((t) => (
              <li key={t} className="rounded-full border border-gold-500/40 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-gold-300">{t}</li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <div className="eyebrow-dark mb-4">Explore</div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
            {footerLinks.map((l) => <li key={l.href}><Link href={l.href} className="text-cream-100/75 hover:text-gold-300">{l.label}</Link></li>)}
          </ul>
        </nav>

        <div>
          <div className="eyebrow-dark mb-4">Contact</div>
          <ul className="space-y-3.5 text-sm">
            <li><a href={mailLink()} className="flex items-center gap-2.5 break-all text-cream-50 hover:text-gold-300"><Mail className="h-4 w-4 shrink-0 text-gold-400" />{email}</a></li>
            {Object.values(phones).map((p) => (
              <li key={p.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a href={telLink(p)} className="flex items-center gap-2.5 text-cream-50 hover:text-gold-300"><Phone className="h-4 w-4 text-gold-400" />{p.display}</a>
                <span className="text-cream-100/45">{p.label}</span>
                <a href={waLink(p)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-200"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
              </li>
            ))}
            <li className="text-cream-100/60">{company.country}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VELTRAXIS TRADECORP. All rights reserved.</p>
          <p>{company.legalName} · GST Registered · IEC Holder</p>
        </div>
      </div>
    </footer>
  );
}
