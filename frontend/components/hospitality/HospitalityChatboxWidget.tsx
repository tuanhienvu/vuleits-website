'use client';

import { useState } from 'react';
import { useHospitalityFeatures } from '@/hooks/useHospitalityFeatures';

export default function HospitalityChatboxWidget() {
  const { features, ready } = useHospitalityFeatures();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Array<{ from: 'bot' | 'guest'; body: string }>>([]);

  if (!ready || !features.chatboxEnabled) return null;

  function autoReply(input: string) {
    const q = input.toLowerCase();
    if (q.includes('price') || q.includes('cost')) {
      return 'Rates depend on stay type and season. Open the booking calendar to see the latest nightly pricing.';
    }
    if (q.includes('confirm') || q.includes('booking ref')) {
      return 'After reservation, we send a confirmation with your booking reference immediately.';
    }
    if (q.includes('cancel') || q.includes('modify')) {
      return 'You can modify or cancel from the customer dashboard using your booking email and reference.';
    }
    return features.chatbotAutoReplyScript;
  }

  function sendMessage() {
    const message = draft.trim();
    if (!message) return;
    const reply = autoReply(message);
    setMessages((prev) => [
      ...prev,
      { from: 'guest', body: message },
      { from: 'bot', body: reply },
    ]);
    setDraft('');
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[320px] max-w-[85vw] rounded-2xl border border-white/20 bg-[#1f2521]/95 text-white shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <p className="font-medium">Wellness Concierge Chat</p>
            <button className="text-white/70 hover:text-white" onClick={() => setOpen(false)} aria-label="Close chat">x</button>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              <div className="rounded-lg bg-white/10 p-3">{features.chatbotAutoReplyScript}</div>
              {messages.map((m, idx) => (
                <div
                  key={`${m.from}-${idx}`}
                  className={`rounded-lg p-3 ${m.from === 'guest' ? 'bg-emerald-700/50' : 'bg-white/10'}`}
                >
                  {m.body}
                </div>
              ))}
            </div>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 placeholder:text-white/50"
              placeholder="Type your message..."
            />
            <button
              type="button"
              className="w-full rounded-lg bg-[#6f7f6a] px-3 py-2 text-sm font-medium hover:bg-[#63735f]"
              onClick={sendMessage}
            >
              Send
            </button>
            <p className="text-xs text-white/70">
              Need human support? Escalate to: {features.chatbotEscalationEmail}
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open concierge chat"
          title="Open concierge chat"
          className="h-14 w-14 rounded-full bg-[#6f7f6a] text-white shadow-lg hover:bg-[#63735f] transition-colors flex items-center justify-center"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </button>
      )}
    </div>
  );
}
