import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Loader2 } from 'lucide-react';
import { aiContext } from '../../data/portfolio';
import { apiUrl } from '../../lib/api';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

const SUGGESTIONS = [
  'What projects has Ajit built?',
  'What tech stack does he use?',
  'Tell me about CalmPulse',
  'Where is Ajit from?',
];

let msgId = 0;
const mkId = () => ++msgId;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: mkId(),
      role: 'bot',
      text: "👋 Hi! I'm Ajit's portfolio assistant. Ask me anything about his skills, projects, or background!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: mkId(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context: aiContext }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { id: mkId(), role: 'bot', text: data.reply ?? data.message ?? 'I couldn\'t get a response.' },
        ]);
      } else if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          { id: mkId(), role: 'bot', text: "I'm getting a lot of questions right now — please try again in a minute." },
        ]);
      } else {
        throw new Error();
      }
    } catch {
      // Fallback: simple keyword-based responses when backend isn't running
      const reply = getFallbackReply(text);
      setMessages((prev) => [...prev, { id: mkId(), role: 'bot', text: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        className="chatbot-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        id="chatbot-trigger-btn"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window" id="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div className="chatbot-name">Ajit's AI Assistant</div>
                <div className="chatbot-status">Ask about his work</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message ${msg.role}`}>
                {msg.role === 'bot' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={14} color="var(--accent-bright)" />
                  </div>
                )}
                <div className={`message-bubble ${msg.role}`}>{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot">
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={14} color="var(--accent-bright)" />
                </div>
                <div className="message-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Loader2 size={14} className="spin-icon" style={{ animation: 'spin 0.7s linear infinite' }} />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {messages.length <= 2 && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chatbot-suggestion"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="chatbot-input-row">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="chatbot-input"
              aria-label="Chat input"
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Fallback replies (keyword-based) when backend is offline ─────────────────
function getFallbackReply(text: string): string {
  const q = text.toLowerCase();

  if (q.includes('calmpulse') || q.includes('burnout') || q.includes('stress')) {
    return 'CalmPulse is an AI-powered burnout detection system built with Spring Boot, MongoDB, and Scikit-learn. It analyzes user inputs to predict stress levels and offers a RESTful API for auth and assessments. Live at calmpulse123.netlify.app!';
  }
  if (q.includes('socialnetwork') || q.includes('social network') || q.includes('websocket') || q.includes('chat')) {
    return 'SocialNetwork is a full-stack social media platform using Spring Boot, React, MySQL, and WebSocket (STOMP/SockJS) for real-time messaging. It includes friend requests, posts, and role-based access control.';
  }
  if (q.includes('keystone')) {
    return 'Keystone is a role-based field service management platform built with Spring Boot, Java, Spring Security, MongoDB, and JWT. It manages work orders end to end with SLA tracking, parts inventory, photo attachments, notifications, and reporting — with separate views for customers, dispatchers, technicians, and managers. Try it at keystones-web.onrender.com!';
  }
  if (q.includes('retailx') || q.includes('retail')) {
    return 'RetailX is a retail management app built with React, REST APIs, and Node.js. It handles product inventory, sales tracking, and business operations with a modern responsive UI.';
  }
  if (q.includes('project')) {
    return 'Ajit has built 4 projects: CalmPulse (AI burnout detection), SocialNetwork (full-stack social platform), RetailX (retail management app), and Keystone (field service management). Each showcases different aspects of his full-stack and ML skills.';
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) {
    return 'Ajit works with Java, JavaScript, and Python. On the backend, he uses Spring Boot and REST APIs. Frontend: React.js, HTML5, and CSS3. Databases: MongoDB and MySQL. He also has experience with Machine Learning, Scikit-learn, and tools like Git, Maven, and Vite.';
  }
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('cgpa') || q.includes('gpa')) {
    return 'Ajit is pursuing a B.Tech in Computer Science and Business Systems (CSBS) at KITCOE, Kolhapur (2023–2027) with a CGPA of 8.7. He scored 91.80% in 10th and 66.17% in 12th grade.';
  }
  if (q.includes('location') || q.includes('where') || q.includes('from') || q.includes('live')) {
    return 'Ajit is based in Kolhapur, Maharashtra, India.';
  }
  if (q.includes('email') || q.includes('contact') || q.includes('reach')) {
    return 'You can reach Ajit at +91 8308129957 or ajitbirajdar1108@gmail.com, connect on LinkedIn (linkedin.com/in/ajit-birajdar-5934822b0/), or check his work on GitHub (github.com/ajit1108).';
  }
  if (q.includes('available') || q.includes('hire') || q.includes('job') || q.includes('opportunit')) {
    return 'Yes! Ajit is currently open to full-time opportunities, internships, and interesting freelance projects. Feel free to reach out via the contact form or email.';
  }
  if (q.includes('dsa') || q.includes('leetcode') || q.includes('algorithm')) {
    return 'Ajit enjoys working on data structures and algorithms problems and focuses on writing clean, efficient solutions. Most of his practice shows up in the full-stack projects he ships.';
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Hello! 👋 I\'m Ajit\'s portfolio assistant. I can tell you about his projects, skills, education, and more. What would you like to know?';
  }
  return 'Great question! I can tell you about Ajit\'s projects, skills, education, or how to get in touch. What would you like to know more about?';
}
