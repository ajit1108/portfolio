import { useState, useRef } from 'react';
import { Mail, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';
import { personalInfo } from '../../data/portfolio';
import { apiUrl } from '../../lib/api';

type ToastState = { type: 'success' | 'error'; message: string } | null;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);

    const data = new FormData(formRef.current);
    const body = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      subject: data.get('subject') as string,
      message: data.get('message') as string,
    };

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        showToast('success', 'Message sent! I\'ll get back to you soon.');
        formRef.current.reset();
        return;
      }

      if (res.status === 429) {
        showToast('error', 'Too many messages right now. Please try again in a minute.');
        return;
      }

      const detail = await res
        .json()
        .then((data) => data?.details?.[0]?.message as string | undefined)
        .catch(() => undefined);
      showToast(
        'error',
        detail ?? `Couldn't send your message. Please email me directly at ${personalInfo.email}.`
      );
    } catch {
      showToast('error', `Couldn't reach the server. Please email me directly at ${personalInfo.email}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Let's talk</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Let's talk.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="form-input"
                placeholder="Project Collaboration"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project or idea..."
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <><span className="spinner" />Sending...</>
              ) : (
                <><Send size={16} />Send Message</>
              )}
            </button>
          </form>

          {/* Info card */}
          <div className="contact-info-card">
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Let's connect
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                I'm currently open to full-time opportunities, internships, and exciting freelance projects.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`mailto:${personalInfo.email}`} className="contact-link-item">
                <div className="contact-link-icon"><Mail size={18} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Email</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{personalInfo.email}</div>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="contact-link-icon"><GithubIcon size={18} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>GitHub</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>github.com/ajit1108</div>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="contact-link-icon"><LinkedinIcon size={18} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>LinkedIn</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Ajit Birajdar</div>
                </div>
              </a>

              <div className="contact-link-item" style={{ cursor: 'default' }}>
                <div className="contact-link-icon"><MapPin size={18} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Location</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{personalInfo.location}</div>
                </div>
              </div>
            </div>

            {/* Availability badge */}
            <div className="availability-badge" style={{ width: 'fit-content' }}>
              <span className="availability-dot" />
              Available for opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success'
            ? <CheckCircle size={16} color="#34d399" />
            : <AlertCircle size={16} color="#ef4444" />}
          {toast.message}
        </div>
      )}
    </section>
  );
}
