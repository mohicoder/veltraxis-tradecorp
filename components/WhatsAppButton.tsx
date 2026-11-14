import { MessageCircle } from 'lucide-react';
import { phones, waLink } from '@/lib/contacts';

export function WhatsAppButton() {
  return (
    <a
      href={waLink(phones.india, 'Hello VELTRAXIS TRADECORP, I have a trade requirement:')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1F9D55] text-white shadow-lg shadow-navy-950/25 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
