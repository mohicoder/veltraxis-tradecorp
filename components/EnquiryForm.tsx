'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, LoaderCircle, Paperclip, Send, X } from 'lucide-react';
import type { Dict } from '@/content';

type Form = Dict['form'];
type Role = keyof Form['roles'];
const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png';

function Field({ label, htmlFor, children, wide = false }: { label: string; htmlFor: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={htmlFor} className="label">{label}</label>
      {children}
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-cream-200 pt-6 first:border-0 first:pt-0">
      {title && <legend className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-700">{title}</legend>}
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Check({ name, label, emailLabel }: { name: string; label: string; emailLabel: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm text-navy-800 sm:col-span-2">
      <input type="checkbox" name={name} value="Yes" data-label={emailLabel} className="mt-0.5 h-4 w-4 rounded border-cream-300 accent-navy-700" />
      {label}
    </label>
  );
}

/** `t` is shown to the visitor; `tEn` (English) is used for the email so the team always reads English labels. */
export function EnquiryForm({ maxMb, t, tEn, lang, privacyHref }: { maxMb: number; t: Form; tEn: Form; lang: string; privacyHref: string }) {
  const [role, setRole] = useState<Role>('buyer');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const [product, setProduct] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const prod = p.get('product');
    if (prod) setProduct(prod.slice(0, 120));
    const r = p.get('role');
    if (r && r in t.roles) setRole(r as Role);
  }, []);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list); // copy before the input is cleared below
    setFiles((prev) => [...prev, ...picked].slice(0, 10));
    if (fileRef.current) fileRef.current.value = '';
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const el = e.currentTarget;
    const fd = new FormData(el);
    const name = String(fd.get('name') || '').trim();
    const mail = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    if (!name || (!mail && !phone) || fd.get('consent') !== 'yes') {
      setError(t.errors.required);
      return;
    }
    const total = files.reduce((n, f) => n + f.size, 0);
    if (total > maxMb * 1024 * 1024) {
      setError(t.errors.size.replace('{mb}', String(maxMb)));
      return;
    }

    // Everything except the core fields goes into "details" (label → value) for the email
    const core = new Set(['name', 'company', 'email', 'phone', 'message', 'consent', 'website']);
    const details: Record<string, string> = { [tEn.roleLabel]: tEn.roles[role] };
    el.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]').forEach((input) => {
      if (core.has(input.name)) return;
      if (input instanceof HTMLInputElement && input.type === 'checkbox' && !input.checked) return;
      const v = input.value.trim();
      if (!v) return;
      const label = input.dataset.label || input.name;
      details[label] = details[label] ? `${details[label]} ${v}` : v;
    });

    const body = new FormData();
    body.set('formType', `${tEn.roles[role]} enquiry`);
    body.set('lang', lang);
    body.set('name', name);
    body.set('company', String(fd.get('company') || ''));
    body.set('email', mail);
    body.set('phone', phone);
    body.set('message', String(fd.get('message') || ''));
    body.set('consent', 'yes');
    body.set('website', String(fd.get('website') || ''));
    body.set('page', window.location.href);
    body.set('details', JSON.stringify(details));
    files.forEach((f) => body.append('files', f));

    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus('done');
        formRef.current?.reset();
        setFiles([]);
        return;
      }
      const code = json.error as string | undefined;
      setError(code === 'size' ? t.errors.size.replace('{mb}', String(maxMb)) : code === 'type' ? t.errors.type : code === 'rate' ? t.errors.rate : code === 'invalid' ? t.errors.required : t.errors.server);
    } catch {
      setError(t.errors.server);
    }
    setStatus('idle');
  }

  if (status === 'done') {
    return (
      <div className="card flex flex-col items-start gap-4 p-8 sm:p-10" role="status">
        <CheckCircle2 className="h-12 w-12 text-gold-600" />
        <h3 className="font-serif text-2xl text-navy-900">{t.successTitle}</h3>
        <p className="leading-relaxed text-navy-800/85">{t.success}</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-2">{t.another}</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-6 p-5 sm:p-8">
      <div>
        <div className="label">{t.roleLabel}</div>
        <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(t.roles) as Role[]).map((r) => (
            <button key={r} type="button" role="radio" aria-checked={role === r} onClick={() => setRole(r)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${role === r ? 'border-navy-700 bg-navy-700 text-cream-50' : 'border-cream-300 bg-cream-50 text-navy-800 hover:border-navy-500'}`}>
              {t.roles[r]}
            </button>
          ))}
        </div>
      </div>

      <Group title={t.sections.contact}>
        <Field label={`${t.name} *`} htmlFor="f-name"><input id="f-name" name="name" required autoComplete="name" className="field" /></Field>
        <Field label={t.company} htmlFor="f-company"><input id="f-company" name="company" autoComplete="organization" className="field" /></Field>
        <Field label={t.email} htmlFor="f-email"><input id="f-email" name="email" type="email" autoComplete="email" className="field" /></Field>
        <Field label={t.phone} htmlFor="f-phone"><input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 … / +971 … / +91 …" className="field" /></Field>
        <p className="-mt-2 text-xs text-navy-500 sm:col-span-2">{t.requiredHint}</p>
      </Group>

      {role === 'buyer' && (
        <>
          <Group title={t.sections.product}>
            <Field label={t.direction} htmlFor="f-dir" wide>
              <select id="f-dir" name="direction" data-label={tEn.direction} className="field">
                {t.directions.map((d, i) => <option key={d} value={tEn.directions[i]}>{d}</option>)}
              </select>
            </Field>
            <Field label={t.product} htmlFor="f-product" wide><input id="f-product" name="product" data-label={tEn.product} value={product} onChange={(e) => setProduct(e.target.value)} className="field" /></Field>
            <Field label={t.spec} htmlFor="f-spec" wide><textarea id="f-spec" name="spec" data-label={tEn.spec} rows={3} placeholder={t.specPh} className="field" /></Field>
          </Group>
          <Group title={t.sections.shipment}>
            <Field label={t.qty} htmlFor="f-qty"><input id="f-qty" name="qty" data-label={tEn.qty} inputMode="decimal" className="field" /></Field>
            <Field label={t.unit} htmlFor="f-unit">
              <select id="f-unit" name="unit" data-label={tEn.qty} className="field">{t.units.map((u, i) => <option key={u} value={tEn.units[i]}>{u}</option>)}</select>
            </Field>
            <Check name="repeat" label={t.repeat} emailLabel={tEn.repeat} />
            <Field label={t.country} htmlFor="f-country"><input id="f-country" name="country" data-label={tEn.country} autoComplete="country-name" className="field" /></Field>
            <Field label={t.port} htmlFor="f-port"><input id="f-port" name="port" data-label={tEn.port} className="field" /></Field>
          </Group>
          <Group title={t.sections.commercial}>
            <Field label={t.packaging} htmlFor="f-pack" wide><input id="f-pack" name="packaging" data-label={tEn.packaging} placeholder={t.packagingPh} className="field" /></Field>
            <Check name="privateLabel" label={t.privateLabel} emailLabel={tEn.privateLabel} />
            <Field label={t.certs} htmlFor="f-certs"><input id="f-certs" name="certs" data-label={tEn.certs} placeholder={t.certsPh} className="field" /></Field>
            <Field label={t.date} htmlFor="f-date"><input id="f-date" name="date" type="month" data-label={tEn.date} className="field" /></Field>
            <Field label={t.price} htmlFor="f-price"><input id="f-price" name="price" data-label={tEn.price} className="field" /></Field>
            <Field label={t.incoterm} htmlFor="f-inco">
              <select id="f-inco" name="incoterm" data-label={tEn.incoterm} className="field">{t.incoterms.map((u, i) => <option key={u} value={tEn.incoterms[i]}>{u}</option>)}</select>
            </Field>
          </Group>
        </>
      )}

      {role === 'supplier' && (
        <Group title={t.sections.company}>
          <Field label={t.location} htmlFor="f-loc"><input id="f-loc" name="location" data-label={tEn.location} className="field" /></Field>
          <Field label={t.moq} htmlFor="f-moq"><input id="f-moq" name="moq" data-label={tEn.moq} className="field" /></Field>
          <Field label={t.categoriesSupplied} htmlFor="f-cats" wide><textarea id="f-cats" name="categories" data-label={tEn.categoriesSupplied} rows={3} className="field" /></Field>
          <Field label={t.exportDocs} htmlFor="f-docs" wide><input id="f-docs" name="docs" data-label={tEn.exportDocs} placeholder={t.exportDocsPh} className="field" /></Field>
          <Check name="ownFacility" label={t.ownFacility} emailLabel={tEn.ownFacility} />
          <Check name="privateLabel" label={t.privateLabelCap} emailLabel={tEn.privateLabelCap} />
        </Group>
      )}

      {role === 'partner' && (
        <Group title={t.sections.partnership}>
          <Field label={t.marketsServed} htmlFor="f-mk"><input id="f-mk" name="markets" data-label={tEn.marketsServed} className="field" /></Field>
          <Field label={t.categoriesServed} htmlFor="f-cs"><input id="f-cs" name="categories" data-label={tEn.categoriesServed} className="field" /></Field>
          <Field label={t.partnershipType} htmlFor="f-pt" wide><textarea id="f-pt" name="partnership" data-label={tEn.partnershipType} rows={3} className="field" /></Field>
        </Group>
      )}

      <Group title="">
        <Field label={t.message} htmlFor="f-msg" wide><textarea id="f-msg" name="message" rows={4} placeholder={t.messagePh} className="field" /></Field>
        <div className="sm:col-span-2">
          <div className="label">{t.files}</div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-cream-300 bg-cream-50 px-4 py-3.5 text-sm text-navy-700 hover:border-navy-500">
            <Paperclip className="h-4 w-4 shrink-0" />
            <span>{t.filesHint.replace('{mb}', String(maxMb))}</span>
            <input ref={fileRef} type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
          </label>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-lg bg-cream-100 px-3 py-1.5 text-sm">
                  <span className="truncate">{f.name} <span className="text-navy-500">({(f.size / 1024 / 1024).toFixed(1)} MB)</span></span>
                  <button type="button" aria-label={`${t.removeFile} ${f.name}`} onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="text-navy-500 hover:text-navy-900"><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Group>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-navy-800">
        <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 shrink-0 accent-navy-700" />
        <span>{t.consentBefore}<a href={privacyHref} className="font-semibold underline underline-offset-2">{t.consentLink}</a>.</span>
      </label>

      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{error}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-navy w-full !py-3.5 sm:w-auto">
        {status === 'sending' ? <><LoaderCircle className="h-4 w-4 animate-spin" />{t.sending}</> : <><Send className="h-4 w-4" />{t.submit}</>}
      </button>
    </form>
  );
}
