import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Bot, Send, Sparkles, Trash2, X } from 'lucide-react';
import { aiContext, personalInfo } from '../../data/portfolio';
import { apiUrl } from '../../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const STORAGE_KEY = 'ajit-portfolio-chat';

const SUGGESTIONS = [
  'What projects has Ajit built?',
  'What is his backend tech stack?',
  'Tell me about Keystone.',
  'What is his education?',
  'How can I contact Ajit?',
];

const mkId = () => crypto.randomUUID();

const greeting = (): Message => ({
  id: mkId(),
  role: 'assistant',
  text: "Hi, I'm Ajit's portfolio assistant. Ask me about his projects, skills, education or how to reach him.",
});

function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [greeting()];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [greeting()];
    const valid = parsed.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof (item as Message).id === 'string' &&
        ['user', 'assistant'].includes((item as Message).role) &&
        typeof (item as Message).text === 'string'
    );
    return valid ? (parsed as Message[]) : [greeting()];
  } catch {
    return [greeting()];
  }
}

class ChatError extends Error {}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailed, setLastFailed] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, open, error, loading]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const ask = async (text: string) => {
    setLoading(true);
    setError(null);
    setLastFailed(null);

    try {
      const res = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context: aiContext }),
      });

      if (res.ok) {
        const data: { reply?: unknown } = await res.json();
        const reply = typeof data.reply === 'string' ? data.reply.trim() : '';
        if (!reply) throw new ChatError('The assistant returned an empty answer. Please try again.');
        setMessages((prev) => [...prev, { id: mkId(), role: 'assistant', text: reply }]);
        return;
      }

      if (res.status === 429) {
        throw new ChatError('Too many questions right now. Please wait a minute and try again.');
      }

      const payload: { error?: string } | null = await res.json().catch(() => null);
      if (res.status === 503 && payload?.error === 'ai_not_configured') {
        throw new ChatError(
          `The AI assistant isn't configured yet. You can reach Ajit directly at ${personalInfo.email} or ${personalInfo.phone}.`
        );
      }

      throw new ChatError(
        `The AI assistant is unavailable right now. Please email Ajit at ${personalInfo.email}.`
      );
    } catch (cause) {
      const message = cause instanceof ChatError
        ? cause.message
        : `I couldn't reach the assistant. Please email Ajit at ${personalInfo.email}.`;
      setError(message);
      setLastFailed(text);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { id: mkId(), role: 'user', text }]);
    setInput('');
    void ask(text);
  };

  const retry = () => {
    if (!lastFailed || loading) return;
    void ask(lastFailed);
  };

  const clearConversation = () => {
    setMessages([greeting()]);
    setError(null);
    setLastFailed(null);
    setInput('');
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <button
        className={`chatbot-trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {open && (
        <>
          <div className="chatbot-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />

          <div
            className="chatbot-window"
            role="dialog"
            aria-modal="false"
            aria-label="AI portfolio assistant"
          >
            <header className="chatbot-header">
              <div className="chatbot-header-info">
                <span className="chatbot-avatar" aria-hidden="true">
                  <Bot size={20} />
                </span>
                <div>
                  <p className="chatbot-name">Ajit&apos;s AI Assistant</p>
                  <p className="chatbot-status">
                    <span className={`chatbot-status-dot ${error ? 'offline' : ''}`} aria-hidden="true" />
                    {error ? 'Offline — direct contact available' : 'Ask about his work'}
                  </p>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button
                  type="button"
                  className="chatbot-icon-btn"
                  onClick={clearConversation}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  type="button"
                  className="chatbot-icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            <div className="chatbot-messages" aria-live="polite">
              {messages.map((message) => (
                <div key={message.id} className={`chatbot-message ${message.role}`}>
                  {message.role === 'assistant' && (
                    <span className="chatbot-message-avatar" aria-hidden="true">
                      <Bot size={14} />
                    </span>
                  )}
                  <div className={`message-bubble ${message.role}`}>{message.text}</div>
                </div>
              ))}

              {loading && (
                <div className="chatbot-message assistant">
                  <span className="chatbot-message-avatar" aria-hidden="true">
                    <Bot size={14} />
                  </span>
                  <div className="message-bubble assistant typing" aria-label="Assistant is thinking">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {error && (
                <div className="chatbot-error" role="alert">
                  <AlertCircle size={16} aria-hidden="true" />
                  <div>
                    <p>{error}</p>
                    {lastFailed && (
                      <button type="button" className="chatbot-retry" onClick={retry}>
                        Try again
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && !loading && !error && (
              <div className="chatbot-suggestions" aria-label="Suggested questions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="chatbot-suggestion"
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot-input-row">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask about Ajit..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={2000}
                aria-label="Chat message"
              />
              <button
                type="button"
                className="chatbot-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>

            <p className="chatbot-hint">Answers use Ajit&apos;s portfolio data and may be imperfect.</p>
          </div>
        </>
      )}
    </>
  );
}
