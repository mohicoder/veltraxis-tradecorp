import { LandedCostCalculator } from '@/components/LandedCostCalculator';
import { PageHero } from '@/components/ui';
import { getDict } from '@/content';
import { lp, resolveLang } from '@/lib/i18n';
import { metaFor } from '@/lib/meta';

export const generateMetadata = metaFor('calculator', '/landed-cost-calculator');

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const { calc, ui } = getDict(lang);
  return (
    <>
      <PageHero eyebrow={ui.calcEyebrow} title={ui.calcHeroTitle} intro={ui.calcHeroIntro} />
      <section className="py-14 sm:py-20">
        <div className="container-site">
          <LandedCostCalculator t={calc} ctaHref={lp(lang, '/contact#enquiry')} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-cream-200 bg-cream-200 md:grid-cols-3">
            {ui.calcTerms.map((t) => (
              <div key={t.k} className="bg-cream-50 p-6">
                <div className="text-xl font-semibold tracking-[-0.02em] text-navy-950">{t.k}</div>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{t.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
