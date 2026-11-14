/**
 * Temporary VELTRAXIS wordmark. To use the official logo instead, put the file in
 * /public (e.g. /public/logo.png) and replace <Mark /> with an <img>.
 */
export function Mark({ className = 'h-8 w-8', tone = 'light' }: { className?: string; tone?: 'dark' | 'light' }) {
  const ring = tone === 'light' ? 'rgba(255,255,255,0.28)' : 'rgba(5,7,11,0.22)';
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke={ring} strokeWidth="1" />
      <ellipse cx="20" cy="20" rx="8.5" ry="18.5" fill="none" stroke={ring} strokeWidth="1" />
      <path d="M10.5 12 L20 29.5 L29.5 12" fill="none" stroke="#D3B572" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tone = 'light' }: { tone?: 'dark' | 'light' }) {
  const main = tone === 'dark' ? 'text-navy-950' : 'text-white';
  const sub = tone === 'dark' ? 'text-navy-500' : 'text-white/55';
  return (
    <span className="flex items-center gap-2.5">
      <Mark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.02rem] font-semibold tracking-[0.2em] ${main}`}>VELTRAXIS</span>
        <span className={`mt-[5px] text-[0.55rem] font-medium tracking-[0.5em] ${sub}`}>TRADECORP</span>
      </span>
    </span>
  );
}
