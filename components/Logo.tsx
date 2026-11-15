/* eslint-disable @next/next/no-img-element */
/**
 * Official VELTRAXIS TRADECORP logo (supplied Nov 2026), cut out of its background.
 * Files: /public/brand/mark.webp (emblem) and /public/brand/logo.webp (emblem + name).
 * Both are light artwork made for dark backgrounds (header and footer).
 */
export function Mark({ className = 'h-10 w-auto' }: { className?: string }) {
  return <img src="/brand/mark.webp" alt="" width={279} height={176} className={className} />;
}

/** Header lockup: emblem + wordmark set in the site font. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className="h-10 w-auto sm:h-11" />
      <span className="flex flex-col leading-none">
        <span className="text-[1rem] font-semibold tracking-[0.22em] text-cream-100">VELTRAXIS</span>
        <span className="mt-[5px] flex items-center gap-1.5 text-[0.55rem] font-medium tracking-[0.48em] text-gold-300">
          TRADECORP
        </span>
      </span>
    </span>
  );
}

/** Full stacked logo as supplied (used in the footer). */
export function FullLogo({ className = 'h-auto w-56' }: { className?: string }) {
  return <img src="/brand/logo.webp" alt="VELTRAXIS TRADECORP" width={720} height={421} className={className} loading="lazy" />;
}
