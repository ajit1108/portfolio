import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';
import { personalInfo } from '../../data/portfolio';
import { apiUrl } from '../../lib/api';

type ToastState = { type: 'success' | 'error'; message: string } | null;

type FieldName = 'name' | 'email' | 'subject' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name) errors.name = 'Please enter your name.';
  else if (values.name.length > 100) errors.name = 'Name must be 100 characters or fewer.';

  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Please enter a valid email address.';
  else if (values.email.length > 254) errors.email = 'Email must be 254 characters or fewer.';

  if (!values.subject) errors.subject = 'Please add a subject.';
  else if (values.subject.length > 150) errors.subject = 'Subject must be 150 characters or fewer.';

  if (!values.message) errors.message = 'Please write a message.';
  else if (values.message.length < 5) errors.message = 'Message must be at least 5 characters.';
  else if (values.message.length > 5000) errors.message = 'Message must be 5,000 characters or fewer.';

  return errors;
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const toastTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (type: 'success' | 'error', message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = window.setTimeout(() => setToast(null), 4500);
  };

  const clearError = (field: FieldName) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || submittingRef.current) return;

    const data = new FormData(form);
    const values: Record<FieldName, string> = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      subject: String(data.get('subject') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        showToast('success', 'Message sent! I\'ll get back to you soon.');
        form.reset();
        setErrors({});
        return;
      }

      if (res.status === 429) {
        showToast('error', 'Too many messages right now. Please try again in a minute.');
        return;
      }

      const payload = await res
        .json()
        .then((body) => body as { message?: string; details?: { message?: string }[] })
        .catch(() => undefined);
      const detail = payload?.details?.[0]?.message;
      showToast(
        'error',
        detail ?? `Couldn't send your message. Please email me directly at ${personalInfo.email}.`
      );
    } catch {
      showToast('error', `Couldn't reach the server. Please email me directly at ${personalInfo.email}.`);
    } finally {
      submittingRef.current = false;
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
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={loading}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                autoComplete="name"
                maxLength={100}
                required
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                onChange={() => clearError('name')}
              />
              {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                autoComplete="email"
                maxLength={254}
                required
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                onChange={() => clearError('email')}
              />
              {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="form-input"
                placeholder="Project Collaboration"
                maxLength={150}
                required
                aria-invalid={errors.subject ? 'true' : undefined}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                onChange={() => clearError('subject')}
              />
              {errors.subject && <p className="field-error" id="contact-subject-error">{errors.subject}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project or idea..."
                rows={5}
                minLength={5}
                maxLength={5000}
                required
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                onChange={() => clearError('message')}
              />
              {errors.message && <p className="field-error" id="contact-message-error">{errors.message}</p>}
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
              <a href={`tel:${personalInfo.phoneHref}`} className="contact-link-item">
                <div className="contact-link-icon"><Phone size={18} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Phone</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{personalInfo.phone}</div>
                </div>
              </a>

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
        <div
          className={`toast ${toast.type}`}
          role={toast.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {toast.type === 'success'
            ? <CheckCircle size={16} color="#34d399" />
            : <AlertCircle size={16} color="#ef4444" />}
          {toast.message}
        </div>
      )}
    </section>
  );
}
