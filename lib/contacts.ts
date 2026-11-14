/**
 * Single source of truth for company identity, phones and email.
 * Change a number or address here and the whole site (and the email router) updates.
 */
export type Phone = { display: string; tel: string; wa?: string; label: string };

export const company = {
  brand: 'VELTRAXIS TRADECORP',
  legalName: 'Veltraxis Tradecorp Private Limited',
  country: 'India',
  /** Leave empty to show "shared on request". Fill with the exact numbers to display them. */
  gstin: '',
  iec: '',
  /** Public correspondence address. Leave empty to hide. */
  address: '',
};

export const phones = {
  india: { label: 'India', display: '+91 96492 70837', tel: '+919649270837', wa: '919649270837' },
  russia: { label: 'Russia', display: '+7 977 113-35-51', tel: '+79771133551', wa: '79771133551' },
} satisfies Record<string, Phone>;

export const email = 'veltraxistradecorp@gmail.com';

/** Where the enquiry form is delivered. Chosen on the server, never by the browser. */
export const enquiryInbox = email;

export const waLink = (p: Phone, text?: string) => `https://wa.me/${p.wa}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const telLink = (p: Phone) => `tel:${p.tel}`;
export const mailLink = (subject?: string) => `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
