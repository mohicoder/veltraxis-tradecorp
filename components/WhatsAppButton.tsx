import { MessageCircle } from 'lucide-react';
import { phones, waLink } from '@/lib/contacts';

export function WhatsAppButton({ text, aria }: { text: string; aria: string }) {
  return (
    <a
      href={waLink(phones.india, text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className="fixed bottom-5 right-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1F9D55] text-white shadow-lg shadow-navy-950/25 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
