import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-site py-28 text-center">
      <div className="eyebrow">404</div>
      <h1 className="h-display mt-3 text-4xl text-navy-900">This page could not be found</h1>
      <p className="mx-auto mt-4 max-w-md text-navy-800/80">The page may have moved. You can return to the home page or send us your requirement directly.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-navy">Go to home page</Link>
        <Link href="/contact#enquiry" className="btn-ghost">Request a Quote</Link>
      </div>
    </section>
  );
}
