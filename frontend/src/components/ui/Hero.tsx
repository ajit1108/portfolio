import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';
import { personalInfo } from '../../data/portfolio';
import { useTypingEffect } from '../../hooks/useTypingEffect';

export default function Hero() {
  const typed = useTypingEffect(personalInfo.roles, 80, 50, 2200);
  const cgpa = personalInfo.stats.find((stat) => stat.label === 'CGPA');

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-content">
          {/* Left: Text */}
          <div className="hero-text">
            {personalInfo.available && (
              <div className="availability-badge">
                <span className="availability-dot" aria-hidden="true" />
                Available for opportunities
              </div>
            )}

            <p className="hero-eyebrow">Hi, I&apos;m</p>

            <h1 className="hero-name gradient-text">{personalInfo.name}</h1>

            <div className="hero-role-container">
              <span className="hero-role-prefix">I&apos;m a</span>
              <span className="hero-role-typed gradient-text">
                {typed}
                <span className="cursor" aria-hidden="true" />
              </span>
            </div>

            <p className="hero-tagline">{personalInfo.tagline}</p>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={scrollToContact}>
                <Mail size={16} aria-hidden="true" />
                Get In Touch
              </button>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
            </div>

            <div className="stats-bar">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-value">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="hero-visual">
            <div className="hero-avatar">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                onError={(e) => {
                  // Gradient monogram fallback if the photo is missing
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement!;
                  parent.style.background = 'linear-gradient(135deg, var(--grad-2), var(--accent-deep))';
                  parent.style.display = 'flex';
                  parent.style.alignItems = 'center';
                  parent.style.justifyContent = 'center';
                  parent.style.fontSize = '4rem';
                  parent.style.fontWeight = '800';
                  parent.style.color = '#fff';
                  parent.style.borderRadius = 'var(--radius-xl)';
                  parent.innerHTML = '<span>AB</span>';
                }}
              />
            </div>

            <div className="float-chip chip-top" aria-hidden="true">
              <span className="chip-dot" />
              Open to work
            </div>
            {cgpa && (
              <div className="float-chip chip-bottom" aria-hidden="true">
                {cgpa.value} CGPA
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="scroll-cue" onClick={scrollDown} aria-label="Scroll to about section">
        <span>Scroll</span>
        <ArrowDown size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
