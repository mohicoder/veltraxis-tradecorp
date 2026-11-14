import { PageHero } from '@/components/ui';
import { email } from '@/lib/contacts';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('privacy', '/privacy');

const sections = [
  { h: 'Who we are', p: 'This website is operated by VELTRAXIS TRADECORP, an Indian import–export and sourcing business. Questions about this notice can be sent to ' + email + '.' },
  { h: 'What we collect', p: 'When you submit the enquiry form we receive the details you enter — such as your name, company, email, phone number, product requirement, destination and any files you attach — together with the page you sent it from. If you contact us by email, phone or WhatsApp, we receive the information you share in that conversation.' },
  { h: 'How we use it', p: 'We use your information only to respond to your enquiry, prepare quotations and proposals, and carry out the trade coordination you ask us to provide. We do not sell your information or use it for unrelated marketing.' },
  { h: 'Sharing', p: 'Where needed to answer your requirement, relevant product and shipment details may be shared with manufacturers, suppliers, inspection agencies, freight forwarders, customs brokers and other service providers involved in your order. We share only what is needed for that purpose.' },
  { h: 'Storage and retention', p: 'Enquiries are delivered to and kept in our business email account for as long as needed to handle your request, maintain business records and meet legal or tax obligations.' },
  { h: 'Your choices', p: 'You can ask to see, correct or delete the information you have sent us by writing to ' + email + '. We will respond within a reasonable time.' },
  { h: 'Cookies', p: 'This website does not use advertising or tracking cookies. Our hosting provider may keep basic technical logs (such as IP address and browser type) to keep the service secure and working.' },
  { h: 'Changes', p: 'We may update this notice from time to time. The latest version is always available on this page.' },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Privacy Policy" title="How we handle your information" intro="Last updated: November 2026" />
      <section className="py-14">
        <div className="container-site prose-site max-w-3xl">
          {sections.map((s) => <div key={s.h}><h2>{s.h}</h2><p>{s.p}</p></div>)}
        </div>
      </section>
    </>
  );
}
