/**
 * All website copy (English master). Taken from the VELTRAXIS TRADECORP website script.
 * Edit text here; pages read from this file.
 */

export const meta = {
  home: { title: 'VELTRAXIS TRADECORP | Import Export and Global Sourcing', description: 'Indian sourcing and import–export support across industries, with a focus on Russia, CIS markets, Eastern Europe and Arab countries.' },
  about: { title: 'About VELTRAXIS TRADECORP | International Trade', description: 'Learn about our GST-registered, IEC-holding Indian business, established market relationships and approach to global sourcing.' },
  products: { title: 'Products and Industries | VELTRAXIS TRADECORP', description: 'Explore sourcing for healthcare, consumer goods, food, pet care, textiles, machinery, electronics and wider commercial requirements.' },
  services: { title: 'Sourcing and Trade Services | VELTRAXIS TRADECORP', description: 'Discuss manufacturer sourcing, bulk procurement, import–export coordination, private label options and shipment requirements.' },
  markets: { title: 'Our International Markets | VELTRAXIS TRADECORP', description: 'Explore our focus on Russia, CIS markets, Eastern Europe and the Arab world. Discuss supply requirements for your destination.' },
  why: { title: 'Why Choose VELTRAXIS TRADECORP', description: 'Established international relationships, broad sourcing across industries, direct manufacturer engagement and attention to the complete cost of every order.' },
  quality: { title: 'Quality, Registrations and Process | VELTRAXIS TRADECORP', description: 'GST registered and IEC holding. How we agree specifications, review documents, coordinate samples and move an order from enquiry to dispatch.' },
  faqs: { title: 'Frequently Asked Questions | VELTRAXIS TRADECORP', description: 'Answers on products, registrations, markets, manufacturer sourcing, medical products, private label, MOQ, samples and quotations.' },
  calculator: { title: 'Landed Cost Calculator | VELTRAXIS TRADECORP', description: 'Estimate FOB, CIF, duty, taxes and landed cost per unit for an import or export shipment.' },
  contact: { title: 'Request a Trade Quote | VELTRAXIS TRADECORP', description: 'Send your product specification, quantity and destination to discuss sourcing, imports, exports or a supplier partnership.' },
  privacy: { title: 'Privacy Policy | VELTRAXIS TRADECORP', description: 'How VELTRAXIS TRADECORP handles information submitted through this website.' },
  terms: { title: 'Website Terms | VELTRAXIS TRADECORP', description: 'Terms of use for the VELTRAXIS TRADECORP website.' },
};

export const trustStrip = ['GST Registered', 'IEC Holder', 'Multi-Sector Sourcing', 'Established International Relationships'];

export const home = {
  eyebrow: 'Import · Export · Global Sourcing',
  headline: 'Your trusted Indian partner for international trade',
  intro: [
    'VELTRAXIS TRADECORP connects businesses with products, manufacturers and commercial opportunities across global markets. We bring together Indian sourcing, import–export coordination and established international relationships to help buyers build dependable supply.',
  ],
  introShort: 'From medical supplies and everyday consumer goods to machinery, industrial inputs and custom requirements, we welcome enquiries across legally tradable product categories.',
  primaryCta: 'Request a Quote',
  secondaryCta: 'Explore Our Product Range',
  detailsTitle: 'Successful trade starts with getting the details right',
  details: 'We examine product specifications, identify suitable supply sources, compare commercial terms and coordinate the steps needed to move an order forward. Our work is driven by the buyer’s intended market and the economics of the complete shipment.',
  productsTitle: 'Products across industries',
  productsIntro: 'Healthcare, consumer, food, industrial and commercial categories — sourced around your specification and your market.',
  productsOutside: 'Have a requirement outside these categories? Send us your product specification or reference catalogue for a custom sourcing assessment.',
  relationsTitle: 'Our international relationships',
  relations: 'We have an established presence in Russia and Eastern Europe, with client relationships across the markets in which we operate. Our market coverage extends across CIS and neighbouring Eurasian markets, Eastern Europe and the Arab world. We approach every market through the requirements of the buyer, the product and the trade route.',
  approachTitle: 'A commercial approach built around your order',
  approach: 'Our sourcing priorities include direct manufacturer engagement, clear specifications, suitable packaging and careful attention to the factory-to-port cost. We work toward repeat business by giving buyers a clear basis for each purchasing decision.',
  approachPoints: ['Direct manufacturer engagement', 'Clear, agreed specifications', 'Suitable export packaging', 'Factory-to-port cost in view'],
  calcTitle: 'See the full cost before you commit',
  calcBody: 'Factory price is only one part of the purchasing decision. Use our calculator for a quick estimate of CIF value, duty, taxes and landed cost per unit — then send us the requirement for a real quotation.',
  closingTitle: 'Tell us what you need',
  closing: 'Tell us what you need, where it needs to go and the quantity you have in mind. We will assess the requirement and take the next commercial steps with you.',
  closingCta: 'Send Your Requirement',
};

export type Category = { slug: string; icon: string; title: string; body: string; note?: string; group: 'consumer' | 'industrial' };

export const categories: Category[] = [
  {
    slug: 'healthcare', icon: 'stethoscope', group: 'consumer', title: 'Healthcare and medical products',
    body: 'Medical consumables, hospital supplies, wound care products, cotton gauze, dressings, bandages, examination and surgical gloves, masks, protective clothing, syringes, cannulas, catheters and patient care accessories. Enquiries may also cover diagnostic accessories, rehabilitation aids and other healthcare requirements.',
    note: 'Medical products are assessed against the relevant intended use, manufacturer documentation and destination approvals. Supply is arranged after the applicable requirements and responsibilities are confirmed.',
  },
  {
    slug: 'orthopaedic', icon: 'accessibility', group: 'consumer', title: 'Orthopaedic and rehabilitation products',
    body: 'Lumbar supports, braces, compression garments, elastic supports, kinesiology tape, slings, mobility aids, walkers, commode chairs and rehabilitation accessories. Selection depends on the required construction, sizing, performance and intended use.',
  },
  {
    slug: 'hygiene', icon: 'sparkles', group: 'consumer', title: 'Hygiene and personal care',
    body: 'Baby diapers, adult diapers, disposable underpads, sanitary pads, period panties, wet wipes, underarm sweat pads, non-medicated soaps, dental floss and floss picks, oral care products and personal care accessories. Enquiries can include air-activated heating patches and other wellness products, with claims and specifications reviewed for the destination market.',
  },
  {
    slug: 'household', icon: 'spray', group: 'consumer', title: 'Household and cleaning products',
    body: 'Laundry detergents, dishwashing products and tablets, floor and surface cleaners, household gloves, cleaning accessories, kitchen products, household plastics, storage items and other everyday essentials. We assess retail packs, institutional packs and private label options where available.',
  },
  {
    slug: 'food', icon: 'wheat', group: 'consumer', title: 'Food, beverages and agro commodities',
    body: 'Whole bean and instant coffee, tea, shelf-stable beverages, packaged foods, groceries, grains, pulses, rice, spices, edible oils and other agricultural commodities. Coffee enquiries can specify Arabica or Robusta, origin, blend, roast, packaging and intended sales channel.',
  },
  {
    slug: 'pet-care', icon: 'paw', group: 'consumer', title: 'Pet care and animal nutrition',
    body: 'Cat and dog food, dry and wet formats, treats, animal nutrition products, pet hygiene supplies and accessories. Feed composition, pack size, shelf life and applicable veterinary or import documentation are considered during product assessment.',
  },
  {
    slug: 'textiles', icon: 'shirt', group: 'industrial', title: 'Textiles, apparel and footwear',
    body: 'Fabrics, garments, workwear, home textiles, towels, bedding, footwear and related accessories. Buyers can specify materials, construction, sizes, finishes and retail or bulk packaging.',
  },
  {
    slug: 'machinery', icon: 'cog', group: 'industrial', title: 'Machinery, tools and engineering goods',
    body: 'Industrial machinery, processing and packaging equipment, workshop tools, pumps, engineering components, spare parts and equipment accessories. Technical specifications, drawings, intended application and commissioning requirements guide supplier selection.',
  },
  {
    slug: 'electrical', icon: 'plug', group: 'industrial', title: 'Electrical, electronics and appliances',
    body: 'Electrical fittings, lighting, cables, consumer electronics, domestic appliances, commercial equipment and accessories. We assess model specifications, electrical compatibility, warranty arrangements and destination requirements for the proposed supply.',
  },
  {
    slug: 'automotive', icon: 'car', group: 'industrial', title: 'Automotive and transport supplies',
    body: 'Automotive components, maintenance supplies, workshop accessories, tyres and related products. Part numbers, vehicle compatibility, manufacturer identity and the buyer’s required supply channel are confirmed for each enquiry.',
  },
  {
    slug: 'building', icon: 'brick', group: 'industrial', title: 'Building materials, hardware and furniture',
    body: 'Construction materials, hardware, sanitaryware, fittings, tiles, furniture and commercial furnishings. Product selection considers dimensions, grade, finish, packing protection and the economics of international transport.',
  },
  {
    slug: 'packaging', icon: 'package', group: 'industrial', title: 'Packaging, paper, plastics and industrial inputs',
    body: 'Packaging materials, paper products, cartons, plastic products, raw materials and selected industrial chemicals. Technical data, composition, handling needs and trade eligibility determine the sourcing and shipping approach.',
  },
];

export const products = {
  eyebrow: 'Products and Industries',
  title: 'Sourcing across healthcare, consumer and industrial categories',
  intro: 'Our product coverage follows the requirements of our buyers. The categories below show key sourcing areas within a wider multi-sector portfolio. Individual models, brands, grades, quantities and destination eligibility are confirmed during quotation.',
  consumerTitle: 'Healthcare and consumer products',
  industrialTitle: 'Industrial and wider product coverage',
  customTitle: 'Other products and custom requirements',
  custom: 'We welcome enquiries across all legally tradable product categories. If your requirement does not fit a listed category, send us a specification, reference image, catalogue or bill of materials. We will assess suitable supply options and the commercial and regulatory feasibility of the trade.',
  howTitle: 'How to request a product',
  how: 'Share the product name, technical specification, required grade, order quantity, destination, packaging and desired delivery schedule. Include any required certifications or manufacturer qualifications. For an existing item, a clear photograph, model number or sample reference helps us identify the right match.',
  howList: ['Product name & specification', 'Required grade', 'Order quantity', 'Destination', 'Packaging', 'Delivery schedule', 'Required certifications', 'Photo, model no. or sample reference'],
  categoryCta: 'Request Specifications and a Quote',
  cta: 'Source a Product for My Business',
};

export const services = {
  eyebrow: 'Services',
  title: 'Sourcing, import–export coordination and supplier development',
  intro: 'We support businesses through sourcing, import–export coordination and supplier development. The scope of each assignment is agreed around the product, origin, destination, quantity and commercial terms.',
  items: [
    { icon: 'search', title: 'Product sourcing and supplier identification', body: 'Send us a product description, specification sheet, photograph or reference sample requirement. We identify suitable supply options, prioritise direct manufacturers where feasible and compare suppliers against the order’s actual needs.' },
    { icon: 'export', title: 'Exports from India', body: 'We help international buyers source Indian products and coordinate the agreed export process. This can include supplier discussions, specification confirmation, samples, packaging requirements, commercial documentation and freight arrangements through relevant service providers.' },
    { icon: 'import', title: 'Import sourcing and procurement', body: 'We welcome import enquiries from Indian businesses and assess overseas supply options against the intended use, landed cost and applicable import requirements. Each proposal identifies the supply scope and the responsibilities of the parties involved.' },
    { icon: 'boxes', title: 'Bulk supply and repeat procurement', body: 'We work with wholesalers, distributors, retailers, institutions and industrial buyers seeking bulk supply or recurring procurement. Product availability, minimum order quantities and production schedules are confirmed during quotation.' },
    { icon: 'tag', title: 'Private label and OEM coordination', body: 'For suitable products, we explore manufacturer-supported private label, OEM and packaging options. Brand artwork, pack format, order quantities, tooling requirements and production lead times are agreed before manufacture.' },
    { icon: 'layers', title: 'Multi-product procurement and consolidation', body: 'For buyers sourcing several products, we assess opportunities to coordinate procurement and consolidate compatible cargo. Consolidation depends on supplier readiness, cargo compatibility, storage needs and the shipment plan.' },
    { icon: 'file', title: 'Export packaging and document coordination', body: 'We coordinate agreed carton specifications, labels, packing information and shipment documents. Product-specific certificates and destination requirements are assessed for the actual item and market.' },
    { icon: 'ship', title: 'Logistics coordination and supplier partnerships', body: 'We compare practical dispatch points and port options, including Mundra where commercially suitable. We also welcome manufacturers seeking a trade partner for international business development and buyer enquiries.' },
  ],
  cta: 'Discuss Your Trade Requirement',
};

export type Region = { key: string; title: string; countries: string[] };

export const markets = {
  eyebrow: 'Markets and International Presence',
  title: 'Russia, CIS, Eastern Europe and the Arab world',
  intro: 'VELTRAXIS TRADECORP operates across international markets with established business relationships and clients in the countries we serve. Russia and Eastern Europe are central to our international presence. Our wider coverage includes CIS and neighbouring Eurasian markets, the Arab world and other destinations according to buyer requirements.',
  regions: [
    { key: 'cis', title: 'Russia and CIS region', countries: ['Russia', 'Armenia', 'Azerbaijan', 'Belarus', 'Kazakhstan', 'Kyrgyzstan', 'Moldova', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'] },
    { key: 'eastern-europe', title: 'Eastern Europe', countries: ['Belarus', 'Bulgaria', 'Czechia', 'Hungary', 'Poland', 'Moldova', 'Romania', 'Russia', 'Slovakia', 'Ukraine'] },
    { key: 'wider-europe', title: 'Wider European and neighbouring markets', countries: ['Estonia', 'Latvia', 'Lithuania', 'Albania', 'Bosnia and Herzegovina', 'Croatia', 'Montenegro', 'North Macedonia', 'Serbia', 'Slovenia', 'Georgia'] },
    { key: 'gulf', title: 'Arab Gulf markets', countries: ['Bahrain', 'Kuwait', 'Oman', 'Qatar', 'Saudi Arabia', 'United Arab Emirates'] },
    { key: 'west-asia', title: 'Other Arab markets in Western Asia', countries: ['Iraq', 'Jordan', 'Lebanon', 'Palestine', 'Syria', 'Yemen'] },
    { key: 'africa', title: 'Arab markets in Africa', countries: ['Algeria', 'Comoros', 'Djibouti', 'Egypt', 'Libya', 'Mauritania', 'Morocco', 'Somalia', 'Sudan', 'Tunisia'] },
  ] as Region[],
  supportTitle: 'Trade support for each market',
  support: [
    'Every destination has its own purchasing patterns, product expectations and shipment requirements. We assess the specification, packaging, documentation and logistics needed for the proposed order, working with the buyer and relevant service providers.',
    'Our focus is to turn a market relationship into a workable supply arrangement. This includes understanding the sales channel, identifying suitable products and establishing clear commercial terms for repeat business.',
  ],
  disclaimer: 'Product availability and shipment acceptance are subject to destination requirements, applicable trade rules and the agreed logistics plan.',
  cta: 'Discuss Supply to Your Market',
};

export const about = {
  eyebrow: 'About Us',
  title: 'An Indian trade house built on hands-on commitment',
  intro: [
    'VELTRAXIS TRADECORP is an Indian import–export and sourcing company built around a hands-on commitment to international business. We work across industries, helping buyers explore supply options and helping manufacturers reach commercial opportunities beyond their domestic market.',
    'We are GST registered and hold an Importer Exporter Code (IEC). Our established presence in Russia and Eastern Europe, together with client relationships in our operating markets, gives our business a practical international foundation.',
    'Our approach begins with research. We examine the product, identify suitable manufacturers, study the intended market and compare the factors that affect commercial viability. Buyers receive attention to the details that shape an order: specifications, pack sizes, quantities, documentation, production timing and freight arrangements.',
  ],
  vision: 'To make VELTRAXIS TRADECORP a preferred international trade partner for businesses seeking dependable sourcing, commercially sound procurement and lasting access to global markets.',
  mission: 'To connect buyers and suppliers across borders through careful product research, manufacturer engagement and clear execution. We aim to make each trade relationship easier to manage and strong enough to support repeat business.',
  drivesTitle: 'What drives us',
  drives: 'We put sustained effort into finding the right supply opportunity. That means looking beyond a product name, asking precise questions, comparing alternatives and following through on the commercial details. Our ambition is to earn a place in our clients’ long-term purchasing plans.',
  values: [
    { title: 'Clarity', body: 'Specifications, quotations and responsibilities should be understandable before an order proceeds.' },
    { title: 'Accountability', body: 'We take ownership of the coordination we agree to provide and communicate material changes promptly.' },
    { title: 'Commercial discipline', body: 'A supply proposal must make sense across product quality, documentation, logistics and total cost.' },
    { title: 'Relationships', body: 'We value the confidence built through consistent work with clients and suppliers.' },
  ],
  founderTitle: 'Founder’s message',
  founder: 'I believe a strong trade business is built through the work behind every order: researching products, understanding buyers, finding capable manufacturers and asking the questions that protect the commercial outcome. That is the effort I bring to VELTRAXIS TRADECORP. My goal is to build a company that clients can rely on for their next requirement and for the opportunities that follow.',
  founderSign: 'Founder, VELTRAXIS TRADECORP',
};

export const why = {
  eyebrow: 'Why VELTRAXIS',
  title: 'Choose a trade partner that puts effort into your requirement',
  intro: 'We combine broad sourcing scope with careful attention to the practical details of procurement and export execution.',
  items: [
    { icon: 'globe', title: 'Established international relationships', body: 'Our established presence in Russia and Eastern Europe, together with clients in our operating markets, supports a business approach grounded in real buyer relationships.' },
    { icon: 'grid', title: 'Broad sourcing across industries', body: 'Buyers can bring us requirements across consumer, healthcare, industrial and commercial categories. We develop the supply approach around the actual product and market.' },
    { icon: 'factory', title: 'Direct manufacturer sourcing', body: 'We prioritise manufacturer engagement wherever feasible. This helps clarify product specifications, production capability, packaging options and the basis of the quotation.' },
    { icon: 'ruler', title: 'Detailed product comparison', body: 'We examine dimensions, materials, grade, pack quantities and intended use when comparing offers. A useful comparison begins with products that meet the same requirement.' },
    { icon: 'calculator', title: 'Attention to the complete cost', body: 'Factory price is one part of the purchasing decision. We also consider inland transport, port access, packaging, shipment structure and other costs within the agreed scope.' },
    { icon: 'clipboard', title: 'A practical approach to product requirements', body: 'Medical, food, personal care and industrial products need different kinds of assessment. We identify the relevant questions early so that commercial decisions reflect the actual item and destination.' },
    { icon: 'user', title: 'Personal attention and sustained research', body: 'We take the time to understand the requirement, ask follow-up questions and compare workable alternatives. Our founder-led approach brings personal commitment to the work behind an order.' },
    { icon: 'repeat', title: 'A commitment to repeat business', body: 'We want to become a reliable part of our clients’ procurement plans. That means communicating clearly, keeping agreed specifications in view and building relationships that remain useful beyond a single transaction.' },
  ],
  closing: 'Bring us your requirement. We will bring it focused commercial attention.',
};

export const quality = {
  eyebrow: 'Quality, Registrations and Process',
  title: 'Quality begins with an agreed specification',
  blocks: [
    { title: 'Registered for international business', body: 'VELTRAXIS TRADECORP is a GST-registered Indian business holding an Importer Exporter Code (IEC). Registration details can be shared for buyer verification and trade onboarding.' },
    { title: 'Quality begins with an agreed specification', body: 'The product description should define what the buyer will receive. We work to clarify the relevant material, size, grade, performance, pack count, labelling and acceptable variations before the order is finalised.' },
    { title: 'Product documents and approvals', body: 'We review the documentation required for the proposed product and destination. Regulated products are assessed individually, including the applicable licences, registrations, test reports or manufacturer documents. GST registration and IEC identify the trading business; product approvals remain specific to the item and market.' },
    { title: 'Samples and inspection arrangements', body: 'Where available, samples can be coordinated before bulk procurement. Inspection scope, acceptance criteria, testing and any third-party inspection are agreed as part of the order. Buyers can discuss these requirements during quotation.' },
  ],
  processTitle: 'From enquiry to dispatch in five steps',
  steps: [
    { title: 'Share your requirement', body: 'Tell us the product specification, quantity, destination, packaging and intended purchase schedule.' },
    { title: 'Assess suitable supply options', body: 'We discuss manufacturer options, availability, product eligibility, minimum quantities and the practical sourcing approach.' },
    { title: 'Agree the commercial proposal', body: 'The quotation sets out the product, quantity, price basis, delivery terms, payment terms, validity and agreed responsibilities.' },
    { title: 'Confirm product and order details', body: 'Samples, artwork, packaging, documentation and any agreed inspection are addressed before production or dispatch, as relevant.' },
    { title: 'Coordinate dispatch and follow up', body: 'We coordinate the agreed shipment activities and provide the relevant updates and documents. Feedback from the order helps guide future supply.' },
  ],
  cta: 'Start a Sourcing Enquiry',
};

export const faqs = {
  eyebrow: 'FAQs',
  title: 'Frequently asked questions',
  items: [
    { q: 'What products do you import and export?', a: 'We welcome enquiries across legally tradable product categories, including medical, consumer, agricultural, industrial and commercial goods. We assess each requirement for suitable sourcing and commercial feasibility.' },
    { q: 'Are you GST registered and do you hold an IEC?', a: 'Yes. VELTRAXIS TRADECORP is GST registered and holds an Importer Exporter Code (IEC). Relevant business registration details can be shared during buyer onboarding.' },
    { q: 'Which countries do you work with?', a: 'Our market coverage includes Russia, CIS and neighbouring Eurasian markets, Eastern Europe and the Arab world. Share your destination so we can assess the product and shipment requirements.' },
    { q: 'Do you source directly from manufacturers?', a: 'We prioritise direct manufacturer sourcing where feasible. For each enquiry, we assess the supplier’s product capability, commercial terms and ability to meet the required specification.' },
    { q: 'Can you arrange products outside your catalogue?', a: 'Yes. Send the product name, technical specification, model number, image or reference catalogue. We will assess supply options and the feasibility of the proposed trade.' },
    { q: 'Can you supply medical grade products?', a: 'We accept medical product enquiries. Supply depends on the exact product, intended use, manufacturer documentation and applicable destination approvals. Requirements are confirmed before an order proceeds.' },
    { q: 'Do you offer private label or OEM products?', a: 'For suitable products and manufacturers, we explore private label, OEM and customised packaging. Availability, minimum quantities, artwork and lead times are confirmed during quotation.' },
    { q: 'What are your minimum order quantity and lead time?', a: 'These vary by product, manufacturer and packaging. The proposal will confirm the minimum quantity, expected production schedule and the relevant dispatch or delivery terms.' },
    { q: 'Can you arrange samples or mixed product shipments?', a: 'Samples and cargo consolidation can be explored where feasible. Availability, costs, cargo compatibility and timing are agreed for the specific requirement.' },
    { q: 'How do I receive a quotation?', a: 'Email your product specification, quantity, destination and packaging needs to veltraxistradecorp@gmail.com, or submit the enquiry form. Add any required certifications and your preferred delivery terms.' },
  ],
};

export const contact = {
  eyebrow: 'Contact and Partnership Enquiries',
  title: 'Let us work on your next trade requirement',
  intro: 'Whether you are sourcing a single product, planning a broader procurement basket or exploring a distribution opportunity, VELTRAXIS TRADECORP welcomes your enquiry. Share the details that matter to your business and we will assess the next steps.',
  suppliersTitle: 'For manufacturers and suppliers',
  suppliers: 'Partner with us to explore international supply opportunities. Send your company profile, manufacturing location, product catalogue, specifications, minimum order quantities and available export documentation. Please identify products manufactured in your own facilities and any private label capabilities.',
  partnersTitle: 'For distributors and trade partners',
  partners: 'Tell us the markets and categories you serve, your purchasing requirements and the type of partnership you want to develop. We welcome discussions focused on practical supply opportunities and lasting commercial relationships.',
};

export const footer = {
  text: 'VELTRAXIS TRADECORP connects businesses with sourcing and trade opportunities across industries. GST registered and holding an IEC, we support international procurement through product research, supplier engagement and coordinated execution.',
};

export const form = {
  title: 'Send your requirement',
  roleLabel: 'I am a',
  roles: { buyer: 'Buyer / Importer', supplier: 'Manufacturer / Supplier', partner: 'Distributor / Trade partner' },
  sections: { contact: 'Contact', product: 'Product', shipment: 'Quantity & destination', commercial: 'Commercial needs', company: 'Your company', partnership: 'Partnership' },
  name: 'Full name',
  company: 'Company name',
  email: 'Business email',
  phone: 'Phone / WhatsApp (with country code)',
  direction: 'Trade direction',
  directions: ['Export from India', 'Import into India', 'Other international sourcing'],
  product: 'Product name',
  spec: 'Specification',
  specPh: 'Material, size, grade, model number, pack count…',
  qty: 'Required quantity',
  unit: 'Unit',
  units: ['Pieces', 'Cartons', 'Kg', 'Metric tonnes', 'Containers (20ft)', 'Containers (40ft)', 'Litres', 'Pairs', 'Sets'],
  repeat: 'This is a repeat / recurring requirement',
  country: 'Destination country',
  port: 'Preferred port or delivery location',
  packaging: 'Packaging',
  packagingPh: 'Retail pack, bulk, carton size, labels…',
  privateLabel: 'Private label / own brand needed',
  certs: 'Required certificates',
  certsPh: 'e.g. CE, ISO 13485, EAC, Halal, FDA…',
  date: 'Intended purchase date',
  price: 'Target price (optional)',
  incoterm: 'Preferred delivery terms',
  incoterms: ['Not sure yet', 'EXW', 'FOB', 'CFR', 'CIF', 'DAP', 'DDP'],
  location: 'Manufacturing location',
  categoriesSupplied: 'Products you manufacture',
  moq: 'Minimum order quantities',
  exportDocs: 'Available export documentation',
  ownFacility: 'Products are made in our own facilities',
  marketsServed: 'Markets you serve',
  categoriesServed: 'Categories you buy / distribute',
  partnershipType: 'Type of partnership you want',
  message: 'Additional information',
  messagePh: 'Anything else that will help us prepare a proposal',
  files: 'Attach catalogue, specification sheet or photos',
  filesHint: (mb: number) => `PDF, Word, Excel or images · up to ${mb} MB in total`,
  consent: 'I agree that VELTRAXIS TRADECORP may use these details to respond to my enquiry in accordance with its Privacy Policy.',
  submit: 'Submit My Requirement',
  sending: 'Sending…',
  successTitle: 'Thank you.',
  success: 'Your requirement has been received. Our team will review the details and contact you about the next steps.',
  another: 'Send another requirement',
  errors: {
    required: 'Please fill in your name, an email or phone number, and tick the consent box.',
    size: (mb: number) => `Attachments are larger than ${mb} MB. Please send fewer or smaller files, or email them to us.`,
    type: 'One of the files is not an accepted type (PDF, Word, Excel, CSV, JPG or PNG).',
    rate: 'Too many submissions from this connection. Please wait a few minutes and try again.',
    server: 'We could not send your enquiry just now. Please email veltraxistradecorp@gmail.com or message us on WhatsApp.',
  },
};
