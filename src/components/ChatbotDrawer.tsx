import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, X, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Language, UI_COPY } from '../data/barbershop';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface ChatbotDrawerProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onJumpToBooking: () => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  language,
  onLanguageChange,
  isOpen,
  onToggle,
  onJumpToBooking,
}) => {
  const copy = UI_COPY[language].chat;
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: copy.welcome,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  // Sync initial welcome message when language changes and user hasn't chatted yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', role: 'model', text: UI_COPY[language].chat.welcome }];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          messages: nextMessages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'Unable to reach AI concierge.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply!,
        },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Request failed';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => onToggle(true)}
          className="fixed bottom-5 right-5 z-40 flex h-11 items-center gap-2.5 rounded-lg border border-[#D4AF37]/40 bg-[#111114] px-4 text-sm font-medium text-[#F4F4F5] shadow-2xl transition-colors duration-150 hover:border-[#D4AF37] hover:bg-[#18181C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label={copy.launcherLabel}
        >
          <MessageSquare className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
          <span className="whitespace-nowrap">{copy.launcherLabel}</span>
        </button>
      )}

      {isOpen && (
        <aside
          className="fixed bottom-4 right-4 z-50 flex h-[540px] max-h-[82vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111114] shadow-2xl"
          aria-label={copy.title}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#0C0C0E] px-4 py-3.5">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-[#F4F4F5]">
                {copy.title}
              </h3>
              <p className="truncate text-xs text-[#A1A1AA]">{copy.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div
                className="flex items-center rounded-md border border-white/10 bg-[#16161A] p-0.5 text-[11px] font-medium"
                role="group"
                aria-label="Chat Language"
              >
                {(['ky', 'ru', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`rounded px-1.5 py-0.5 uppercase transition-colors ${
                      language === lang
                        ? 'bg-[#D4AF37] text-[#08080A] font-semibold'
                        : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onToggle(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#A1A1AA] transition-colors hover:bg-white/5 hover:text-[#F4F4F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label={copy.close}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#D4AF37] text-[#08080A] font-medium'
                      : 'border border-white/10 bg-[#16161A] text-[#E4E4E7]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-white/10 bg-[#16161A] px-3.5 py-2 text-xs text-[#A1A1AA]">
                  {copy.thinking}
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2.5 text-xs text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div ref={listEndRef} />
          </div>

          {/* Quick prompts & shortcut */}
          <div className="border-t border-white/10 bg-[#0C0C0E] px-4 pt-2.5 pb-2">
            <div className="flex flex-wrap gap-1.5 pb-2">
              {copy.quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isLoading}
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-md border border-white/10 bg-[#16161A] px-2.5 py-1 text-left text-xs text-[#D4D4D8] transition-colors hover:border-[#D4AF37]/50 hover:text-[#F4F4F5] disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                onToggle(false);
                onJumpToBooking();
              }}
              className="mb-2 flex w-full items-center justify-between rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-medium text-[#E5C158] transition-colors hover:bg-[#D4AF37]/20"
            >
              <span>{copy.bookShortcut}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 pb-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy.placeholder}
                className="h-10 flex-1 rounded-lg border border-white/10 bg-[#16161A] px-3 text-sm text-[#F4F4F5] placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] text-[#08080A] transition-colors hover:bg-[#E5C158] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label={copy.send}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </aside>
      )}
    </>
  );
};
