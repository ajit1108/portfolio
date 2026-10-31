import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';
import { personalInfo } from '../../data/portfolio';
import { scrollToSection } from '../../lib/scroll';

const QUICK_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <section className="footer-cta" aria-labelledby="footer-cta-title">
          <div className="footer-cta-glow" aria-hidden="true" />
          <span className="section-eyebrow">Open to opportunities</span>
          <h2 id="footer-cta-title" className="footer-cta-title">
            Let&apos;s build something together
          </h2>
          <p className="footer-cta-text">
            I&apos;m available for full-time roles, internships and freelance projects.
            Tell me what you&apos;re building and let&apos;s see how I can help.
          </p>
          <div className="footer-cta-actions">
            <a
              href={personalInfo.emailUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={16} aria-hidden="true" />
              Get in Touch
            </a>
            <button type="button" className="btn btn-outline" onClick={() => scrollToSection('projects')}>
              View My Work
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </section>

        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">ajit<span>.dev</span></span>
            <p className="footer-brand-text">
              Full Stack Java Developer building scalable backend systems and
              intelligent web applications.
            </p>
            <p className="footer-location">
              <MapPin size={14} aria-hidden="true" />
              {personalInfo.location}
            </p>
          </div>

          <nav className="footer-column" aria-label="Footer navigation">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button type="button" className="footer-nav-link" onClick={() => scrollToSection(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-social">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Visit GitHub profile (opens in a new tab)"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Visit LinkedIn profile (opens in a new tab)"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={personalInfo.emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={`Compose email to ${personalInfo.email} in Gmail (opens in a new tab)`}
              >
                <Mail size={18} />
              </a>
              <a
                href={personalInfo.phoneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={`Chat with ${personalInfo.phone} on WhatsApp (opens in a new tab)`}
              >
                <Phone size={18} />
              </a>
            </div>
            <a
              href={personalInfo.emailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-line"
            >
              {personalInfo.email}
            </a>
            <a
              href={personalInfo.phoneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-line"
            >
              {personalInfo.phone}
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} {personalInfo.name}. All rights reserved.</p>
          <p>Built with React, TypeScript &amp; Spring Boot.</p>
        </div>
      </div>
    </footer>
  );
}
