'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

type Field = { key: keyof State; label: string; suffix?: string; step?: string; hint?: string };
type State = { qty: string; unitPrice: string; inland: string; freight: string; insurance: string; duty: string; tax: string; other: string };

const CURRENCIES = ['USD', 'EUR', 'INR', 'RUB', 'AED', 'SAR'] as const;

const fields: Field[] = [
  { key: 'qty', label: 'Quantity (units)', step: '1' },
  { key: 'unitPrice', label: 'Unit price (ex-factory)', suffix: 'cur' },
  { key: 'inland', label: 'Inland transport to port', suffix: 'cur', hint: 'Factory → port, loading' },
  { key: 'freight', label: 'International freight', suffix: 'cur' },
  { key: 'insurance', label: 'Cargo insurance', suffix: 'cur' },
  { key: 'duty', label: 'Import duty', suffix: '%', hint: 'On CIF value' },
  { key: 'tax', label: 'VAT / GST / other taxes', suffix: '%', hint: 'On CIF + duty' },
  { key: 'other', label: 'Clearance & local charges', suffix: 'cur', hint: 'Broker, port, delivery' },
];

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function LandedCostCalculator({ compact = false }: { compact?: boolean }) {
  const [cur, setCur] = useState<(typeof CURRENCIES)[number]>('USD');
  const [s, setS] = useState<State>({ qty: '1000', unitPrice: '4.50', inland: '350', freight: '1800', insurance: '60', duty: '5', tax: '20', other: '400' });

  const r = useMemo(() => {
    const qty = num(s.qty);
    const goods = qty * num(s.unitPrice);
    const fob = goods + num(s.inland);
    const cif = fob + num(s.freight) + num(s.insurance);
    const duty = cif * (num(s.duty) / 100);
    const tax = (cif + duty) * (num(s.tax) / 100);
    const total = cif + duty + tax + num(s.other);
    return { qty, goods, fob, cif, duty, tax, other: num(s.other), total, perUnit: qty > 0 ? total / qty : 0 };
  }, [s]);

  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 2 }).format(n);

  const parts = [
    { label: 'Goods', v: r.goods, c: 'bg-navy-700' },
    { label: 'Inland', v: num(s.inland), c: 'bg-navy-500' },
    { label: 'Freight & insurance', v: num(s.freight) + num(s.insurance), c: 'bg-navy-300' },
    { label: 'Duty', v: r.duty, c: 'bg-gold-600' },
    { label: 'Taxes', v: r.tax, c: 'bg-gold-400' },
    { label: 'Local charges', v: r.other, c: 'bg-cream-300' },
  ];

  return (
    <div className={`grid gap-6 ${compact ? 'lg:grid-cols-[1.15fr_1fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}>
      <div className="card p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-xl text-navy-900">Your shipment</h3>
          <label className="flex items-center gap-2 text-sm font-semibold text-navy-700">
            Currency
            <select value={cur} onChange={(e) => setCur(e.target.value as typeof cur)} className="field !w-auto !py-1.5">
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={`calc-${f.key}`} className="label">{f.label}</label>
              <div className="relative">
                <input
                  id={`calc-${f.key}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step={f.step ?? 'any'}
                  value={s[f.key]}
                  onChange={(e) => setS((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="field pr-14"
                />
                {f.suffix && <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-xs font-bold text-navy-500">{f.suffix === 'cur' ? cur : '%'}</span>}
              </div>
              {f.hint && <p className="mt-1 text-xs text-navy-500">{f.hint}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-navy-900 p-5 text-cream-50 sm:p-7" aria-live="polite">
        <div className="eyebrow-dark">Estimate summary</div>
        <div className="mt-4 text-sm text-cream-100/70">Landed cost per unit</div>
        <div className="font-serif text-[2.6rem] leading-tight text-gold-300">{fmt(r.perUnit)}</div>

        <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-navy-800" aria-hidden>
          {parts.map((p) => r.total > 0 && p.v > 0 ? <div key={p.label} className={p.c} style={{ width: `${(p.v / r.total) * 100}%` }} /> : null)}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-cream-100/70">
          {parts.map((p) => <li key={p.label} className="flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${p.c}`} />{p.label}</li>)}
        </ul>

        <dl className="mt-6 space-y-2.5 text-sm">
          {[
            ['FOB value', r.fob],
            ['CIF value', r.cif],
            ['Import duty', r.duty],
            ['Taxes', r.tax],
            ['Clearance & local', r.other],
          ].map(([k, v]) => (
            <div key={k as string} className="flex justify-between gap-4 border-b border-cream-50/10 pb-2.5">
              <dt className="text-cream-100/70">{k}</dt>
              <dd className="font-semibold tabular-nums">{fmt(v as number)}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-1 text-base">
            <dt className="font-bold">Total landed cost</dt>
            <dd className="font-bold tabular-nums text-gold-300">{fmt(r.total)}</dd>
          </div>
        </dl>

        <p className="mt-5 text-xs leading-relaxed text-cream-100/55">An indicative estimate for planning only. Actual duty and tax rates depend on the product’s HS code, origin rules and the destination’s regulations; a quotation confirms the real figures.</p>
        <Link href="/contact#enquiry" className="btn-gold mt-auto w-full translate-y-0 !mt-6">Get a real quotation <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
