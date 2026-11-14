import { NextResponse, type NextRequest } from 'next/server';
import nodemailer, { type Transporter } from 'nodemailer';
import { z } from 'zod';
import { enquiryInbox } from '@/lib/contacts';
import { SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_EXT = ['pdf', 'xls', 'xlsx', 'csv', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
const MAX_MB = Number(process.env.MAX_UPLOAD_MB || 4);

const schema = z.object({
  formType: z.string().trim().min(1).max(80),
  lang: z.enum(['en', 'ru']).catch('en'),
  page: z.string().max(500).optional().default(''),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().max(160).optional().default(''),
  phone: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().max(5000).optional().default(''),
  consent: z.literal('yes'),
  details: z.string().max(12000).optional().default('{}'),
});

// Simple in-memory rate limit: 6 submissions per 10 minutes per IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 6;
}

let transporter: Transporter | null = null;
function getTransport(): Transporter | null {
  if (transporter) return transporter;
  if (process.env.MAIL_TRANSPORT === 'json') {
    transporter = nodemailer.createTransport({ jsonTransport: true });
    return transporter;
  }
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing
  if (String(form.get('website') || '').trim()) return NextResponse.json({ ok: true });
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'rate' }, { status: 429 });

  const raw: Record<string, string> = {};
  for (const key of Object.keys(schema.shape)) {
    const v = form.get(key);
    if (typeof v === 'string') raw[key] = v;
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  const data = parsed.data;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!emailOk && data.phone.replace(/\D/g, '').length < 7) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });

  let details: Record<string, string> = {};
  try {
    const obj = JSON.parse(data.details);
    if (obj && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj).slice(0, 60)) details[String(k).slice(0, 120)] = String(v).slice(0, 1500);
    }
  } catch {
    details = {};
  }

  const files = form.getAll('files').filter((f): f is File => typeof f === 'object' && f !== null && 'arrayBuffer' in f);
  let total = 0;
  const attachments: { filename: string; content: Buffer }[] = [];
  for (const f of files.slice(0, 10)) {
    const ext = f.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXT.includes(ext)) return NextResponse.json({ ok: false, error: 'type' }, { status: 400 });
    total += f.size;
    if (total > MAX_MB * 1024 * 1024) return NextResponse.json({ ok: false, error: 'size' }, { status: 413 });
    attachments.push({ filename: f.name.replace(/[^\w.\- ()Ѐ-ӿ؀-ۿ]/g, '_').slice(0, 150), content: Buffer.from(await f.arrayBuffer()) });
  }

  const t = getTransport();
  if (!t) {
    console.error('[enquiry] SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS. Not delivered:', { formType: data.formType, name: data.name, email: data.email, phone: data.phone });
    return NextResponse.json({ ok: false, error: 'server' }, { status: 503 });
  }

  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone / WhatsApp', data.phone],
    ...Object.entries(details),
    ['Website language', data.lang === 'ru' ? 'Russian' : 'English'],
    ['Submitted from', data.page],
    ['Received', `${when} IST`],
  ];
  const filled = rows.filter(([, v]) => v && v.trim());

  const html = `<!doctype html><html><body style="margin:0;background:#F6F1E4;font-family:Arial,Helvetica,sans-serif;color:#0E2130">
  <div style="max-width:640px;margin:0 auto;padding:24px">
    <div style="background:#0E2130;color:#fff;border-radius:14px 14px 0 0;padding:20px 24px;border-bottom:3px solid #D4AF37">
      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E6CC77">New website enquiry · VELTRAXIS TRADECORP</div>
      <div style="font-size:20px;font-weight:bold;margin-top:6px">${esc(data.formType)}</div>
    </div>
    <div style="background:#fff;border-radius:0 0 14px 14px;padding:8px 24px 24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${filled.map(([k, v]) => `<tr><td style="padding:9px 12px 9px 0;border-bottom:1px solid #ECE4CF;color:#3B6C8C;vertical-align:top;width:38%">${esc(k)}</td><td style="padding:9px 0;border-bottom:1px solid #ECE4CF;font-weight:600;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}
      </table>
      ${data.message ? `<div style="margin-top:18px;font-size:12px;color:#3B6C8C;text-transform:uppercase;letter-spacing:1px">Additional information</div><div style="margin-top:6px;white-space:pre-wrap;font-size:14px;line-height:1.6;background:#FCFAF4;border-radius:10px;padding:14px">${esc(data.message)}</div>` : ''}
      ${attachments.length ? `<div style="margin-top:16px;font-size:13px;color:#285370">📎 ${attachments.length} attachment(s): ${attachments.map((a) => esc(a.filename)).join(', ')}</div>` : ''}
      <div style="margin-top:20px;font-size:12px;color:#9DB8CB">Reply to this email to respond directly to the sender.</div>
    </div>
  </div></body></html>`;
  const text = filled.map(([k, v]) => `${k}: ${v}`).join('\n') + (data.message ? `\n\nAdditional information:\n${data.message}` : '');

  const from = process.env.MAIL_FROM || process.env.SMTP_USER || enquiryInbox;
  try {
    await t.sendMail({
      from,
      to: enquiryInbox,
      cc: process.env.MAIL_CC_ALL || undefined,
      replyTo: emailOk ? `${data.name.replace(/[<>"]/g, '')} <${data.email}>` : undefined,
      subject: `[Veltraxis Enquiry]${data.lang === 'ru' ? ' [RU]' : ''} ${data.formType} — ${data.name}${data.company ? ` (${data.company})` : ''}${details['Product name'] ? ` · ${details['Product name'].slice(0, 60)}` : ''}`,
      html,
      text,
      attachments,
    });

    if (emailOk && process.env.SEND_AUTOREPLY !== 'false') {
      const ack =
        data.lang === 'ru'
          ? {
              subject: 'Мы получили ваш запрос — VELTRAXIS TRADECORP',
              text: `Здравствуйте, ${data.name}!\n\nСпасибо за обращение в VELTRAXIS TRADECORP. Ваш запрос получен. Наша команда изучит детали и свяжется с вами по дальнейшим шагам — обычно в течение одного рабочего дня.\n\nВы можете ответить на это письмо, чтобы добавить спецификации, фотографии или документы.\n\nVELTRAXIS TRADECORP\n${enquiryInbox}\n${SITE_URL}/ru`,
            }
          : {
              subject: 'We received your requirement — VELTRAXIS TRADECORP',
              text: `Dear ${data.name},\n\nThank you for contacting VELTRAXIS TRADECORP. Your requirement has been received. Our team will review the details and contact you about the next steps, usually within one business day.\n\nYou can reply to this email to add specifications, photos or documents.\n\nVELTRAXIS TRADECORP\n${enquiryInbox}\n${SITE_URL}`,
            };
      await t
        .sendMail({ from, to: data.email, replyTo: enquiryInbox, subject: ack.subject, text: ack.text })
        .catch((e) => console.warn('[enquiry] auto-reply failed', e?.message));
    }

    if (process.env.MAIL_TRANSPORT === 'json') console.log('[enquiry] (json transport) to', enquiryInbox, '|', data.formType, '| files:', attachments.map((a) => `${a.filename} (${a.content.length} B)`).join(', ') || 'none', '|', JSON.stringify(details));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enquiry] send failed', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 502 });
  }
}
