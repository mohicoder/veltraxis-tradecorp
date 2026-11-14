'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { nav } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setCompanyOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!companyOpen) return;
    const onDown = (e: MouseEvent) => { if (!dropRef.current?.contains(e.target as Node)) setCompanyOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCompanyOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [companyOpen]);

  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const companyActive = nav.company.some((n) => active(n.href));
  const linkCls = (on: boolean) => `rounded-full px-3 py-2 text-[0.88rem] font-semibold transition-colors ${on ? 'text-navy-900 bg-cream-200/70' : 'text-navy-800/80 hover:text-navy-900'}`;

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? 'border-cream-200 bg-cream-50/90 backdrop-blur-md' : 'border-transparent bg-cream-50'}`}>
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" aria-label="VELTRAXIS TRADECORP — home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.main.map((n) => <Link key={n.href} href={n.href} className={linkCls(active(n.href))}>{n.label}</Link>)}
          <div ref={dropRef} className="relative">
            <button type="button" aria-expanded={companyOpen} aria-haspopup="true" onClick={() => setCompanyOpen((v) => !v)} className={`${linkCls(companyActive)} inline-flex items-center gap-1`}>
              Company <ChevronDown className={`h-4 w-4 transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
            </button>
            {companyOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-cream-200 bg-white p-1.5 shadow-xl">
                {nav.company.map((n) => (
                  <Link key={n.href} href={n.href} className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold ${active(n.href) ? 'bg-cream-100 text-navy-900' : 'text-navy-800/85 hover:bg-cream-100'}`}>{n.label}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/contact" className={linkCls(active('/contact'))}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact#enquiry" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">Request a Quote</Link>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy-900 hover:bg-cream-200 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto bg-cream-50 lg:hidden">
          <nav aria-label="Mobile" className="container-site flex flex-col py-4">
            {[{ href: '/', label: 'Home' }, ...nav.main].map((n) => (
              <Link key={n.href} href={n.href} className={`border-b border-cream-200 py-3.5 font-serif text-xl ${active(n.href) ? 'text-gold-700' : 'text-navy-900'}`}>{n.label}</Link>
            ))}
            <div className="pb-1 pt-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-navy-500">Company</div>
            {[...nav.company, { href: '/contact', label: 'Contact Us' }].map((n) => (
              <Link key={n.href} href={n.href} className={`border-b border-cream-200 py-3 text-base font-semibold ${active(n.href) ? 'text-gold-700' : 'text-navy-800'}`}>{n.label}</Link>
            ))}
            <Link href="/contact#enquiry" className="btn-gold mt-6 w-full">Request a Quote</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
