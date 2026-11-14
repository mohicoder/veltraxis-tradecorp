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
  const linkCls = (on: boolean) => `relative px-3 py-2 text-[0.9rem] font-medium transition-colors ${on ? 'text-white after:absolute after:inset-x-3 after:-bottom-[1px] after:h-px after:bg-gold-400' : 'text-white/70 hover:text-white'}`;

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? 'border-white/10 bg-navy-950/85 backdrop-blur-xl' : 'border-transparent bg-navy-950'}`}>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="VELTRAXIS TRADECORP — home" className="shrink-0">
          <Logo tone="light" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.main.map((n) => <Link key={n.href} href={n.href} className={linkCls(active(n.href))}>{n.label}</Link>)}
          <div ref={dropRef} className="relative">
            <button type="button" aria-expanded={companyOpen} aria-haspopup="true" onClick={() => setCompanyOpen((v) => !v)} className={`${linkCls(companyActive)} inline-flex items-center gap-1`}>
              Company <ChevronDown className={`h-4 w-4 transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
            </button>
            {companyOpen && (
              <div className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-white/10 bg-navy-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
                {nav.company.map((n) => (
                  <Link key={n.href} href={n.href} className={`block rounded-lg px-3.5 py-2.5 text-sm font-medium ${active(n.href) ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'}`}>{n.label}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/contact" className={linkCls(active('/contact'))}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact#enquiry" className="btn-white hidden !px-4 !py-2.5 sm:inline-flex">Request a Quote</Link>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-navy-950 lg:hidden">
          <nav aria-label="Mobile" className="container-site flex flex-col py-4">
            {[{ href: '/', label: 'Home' }, ...nav.main].map((n) => (
              <Link key={n.href} href={n.href} className={`border-b border-white/10 py-4 text-2xl font-semibold tracking-[-0.03em] ${active(n.href) ? 'text-gold-300' : 'text-white'}`}>{n.label}</Link>
            ))}
            <div className="pb-1 pt-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Company</div>
            {[...nav.company, { href: '/contact', label: 'Contact Us' }].map((n) => (
              <Link key={n.href} href={n.href} className={`border-b border-white/10 py-3 text-base font-medium ${active(n.href) ? 'text-gold-300' : 'text-white/80'}`}>{n.label}</Link>
            ))}
            <Link href="/contact#enquiry" className="btn-white mt-8 w-full">Request a Quote</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
