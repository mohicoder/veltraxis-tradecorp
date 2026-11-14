import { LandedCostCalculator } from '@/components/LandedCostCalculator';
import { PageHero } from '@/components/ui';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('calculator', '/landed-cost-calculator');

const terms = [
  { k: 'FOB', v: 'Free On Board — the goods plus inland transport and loading at the port of export.' },
  { k: 'CIF', v: 'Cost, Insurance and Freight — FOB plus international freight and cargo insurance. Most countries charge import duty on this value.' },
  { k: 'Landed cost', v: 'Everything paid until the goods reach the buyer: CIF, import duty, taxes and local clearance or delivery charges.' },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Landed Cost Calculator" title="Estimate the *complete cost* of a shipment" intro="Factory price is one part of the purchasing decision. Enter your figures to see FOB, CIF, duty, taxes and the landed cost per unit." />
      <section className="py-14">
        <div className="container-site">
          <LandedCostCalculator />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {terms.map((t) => (
              <div key={t.k} className="rounded-2xl border border-cream-200 bg-cream-100/60 p-5">
                <div className="font-serif text-xl text-navy-900">{t.k}</div>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{t.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
