/**
 * Temporary VELTRAXIS wordmark. To use the official logo instead, put the file in
 * /public (e.g. /public/logo.png) and replace <Mark /> with an <img>.
 */
export function Mark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#1C3D53" />
      <path d="M9.5 11 L20 30 L30.5 11" fill="none" stroke="#D4AF37" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 22.5 Q20 13 33.5 22.5" fill="none" stroke="#F6F1E4" strokeWidth="1.4" strokeDasharray="2 2.2" strokeLinecap="round" />
      <circle cx="33.5" cy="22.5" r="1.9" fill="#F6F1E4" />
    </svg>
  );
}

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const main = tone === 'dark' ? 'text-navy-900' : 'text-cream-50';
  const sub = tone === 'dark' ? 'text-gold-700' : 'text-gold-400';
  return (
    <span className="flex items-center gap-2.5">
      <Mark />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.15rem] font-semibold tracking-[0.12em] ${main}`}>VELTRAXIS</span>
        <span className={`mt-1 text-[0.58rem] font-bold tracking-[0.42em] ${sub}`}>TRADECORP</span>
      </span>
    </span>
  );
}
