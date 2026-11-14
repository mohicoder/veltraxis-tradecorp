import { PageHero } from '@/components/ui';
import { email } from '@/lib/contacts';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('terms', '/terms');

const sections = [
  { h: 'About this website', p: 'This website provides general information about VELTRAXIS TRADECORP and the sourcing and import–export services we offer. By using it you agree to these terms.' },
  { h: 'No offer or contract', p: 'Product categories, descriptions and examples on this website show the areas in which we accept enquiries. They are not an offer to sell. Products, specifications, prices, quantities, delivery terms and responsibilities are confirmed only in a written quotation or agreement for the specific order.' },
  { h: 'Regulated and restricted products', p: 'Supply of medical, food, chemical and other regulated products depends on the applicable licences, registrations, manufacturer documentation and destination rules. We only proceed with trades that are lawful for the product, origin and destination concerned.' },
  { h: 'Calculator and estimates', p: 'The landed cost calculator gives an indicative estimate based on the figures you enter. It is not a quotation and is not tax or customs advice. Actual duties, taxes and charges depend on the product classification and the rules in force at the time of import.' },
  { h: 'Accuracy', p: 'We aim to keep the information on this website accurate and current, but it may contain errors or become out of date. Please confirm any detail that matters to your decision with us directly.' },
  { h: 'Intellectual property', p: 'The VELTRAXIS TRADECORP name, logo, text and design of this website belong to us. Manufacturer names and trademarks mentioned belong to their owners.' },
  { h: 'Liability', p: 'To the extent permitted by law, we are not liable for any loss arising from the use of this website or reliance on its content. Our responsibilities for an order are those set out in the agreed quotation or contract.' },
  { h: 'Governing law', p: 'These terms are governed by the laws of India. Questions about them can be sent to ' + email + '.' },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Website Terms" title="Terms of use" intro="Last updated: November 2026" />
      <section className="py-14">
        <div className="container-site prose-site max-w-3xl">
          {sections.map((s) => <div key={s.h}><h2>{s.h}</h2><p>{s.p}</p></div>)}
        </div>
      </section>
    </>
  );
}
