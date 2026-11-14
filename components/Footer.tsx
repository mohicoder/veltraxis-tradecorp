import Link from 'next/link';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { footer } from '@/content/en';
import { company, email, mailLink, phones, telLink, waLink } from '@/lib/contacts';
import { footerLinks } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-site border-b border-white/10 py-14 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="h-display max-w-3xl text-[2.4rem] sm:text-[3.6rem]">
            Bring us your requirement. <span className="accent">We’ll bring</span> the details.
          </h2>
          <Link href="/contact#enquiry" className="btn-white shrink-0">Request a Quote <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>

      <div className="container-site grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">{footer.text}</p>
        </div>

        <nav aria-label="Footer">
          <div className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Explore</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((l) => <li key={l.href}><Link href={l.href} className="text-white/70 transition-colors hover:text-white">{l.label}</Link></li>)}
          </ul>
        </nav>

        <div>
          <div className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Contact</div>
          <ul className="space-y-4 text-sm">
            <li><a href={mailLink()} className="flex items-center gap-2.5 break-all text-white hover:text-gold-300"><Mail className="h-4 w-4 shrink-0 text-gold-400" />{email}</a></li>
            {Object.values(phones).map((p) => (
              <li key={p.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a href={telLink(p)} className="flex items-center gap-2.5 text-white hover:text-gold-300"><Phone className="h-4 w-4 text-gold-400" />{p.display}</a>
                <span className="text-white/35">{p.label}</span>
                <a href={waLink(p)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VELTRAXIS TRADECORP. All rights reserved.</p>
          <p>{company.legalName} · {company.country} · GST Registered · IEC Holder</p>
        </div>
      </div>
    </footer>
  );
}
