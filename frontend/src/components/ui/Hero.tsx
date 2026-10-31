import { ArrowDown, FolderGit2, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-text">
          <p className="hero-eyebrow">Hello, I&apos;m</p>

          <h1 className="hero-name">{personalInfo.name}</h1>

          <p className="hero-designation">{personalInfo.headline}</p>

          <div className="hero-contact">
            <a href={`tel:${personalInfo.phoneHref}`} className="hero-contact-link">
              <span className="hero-contact-icon" aria-hidden="true">
                <Phone size={16} />
              </span>
              {personalInfo.phone}
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hero-contact-link">
              <span className="hero-contact-icon" aria-hidden="true">
                <Mail size={16} />
              </span>
              {personalInfo.email}
            </a>
          </div>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              <FolderGit2 size={16} aria-hidden="true" />
              View Projects
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              <Mail size={16} aria-hidden="true" />
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <button className="scroll-cue" onClick={() => scrollTo('about')} aria-label="Scroll to about section">
        <span>Scroll</span>
        <ArrowDown size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
