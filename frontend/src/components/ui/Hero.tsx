import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';
import { personalInfo } from '../../data/portfolio';
import { useTypingEffect } from '../../hooks/useTypingEffect';

export default function Hero() {
  const typed = useTypingEffect(personalInfo.roles, 80, 50, 2200);

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
            {/* Availability badge */}
            {personalInfo.available && (
              <div className="availability-badge" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
                <span className="availability-dot" />
                Available for opportunities
              </div>
            )}

            <h1 className="hero-name">
              Hi, I'm{' '}
              <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            <div className="hero-role-container">
              <span className="hero-role-prefix">I'm a</span>
              <span className="hero-role-typed gradient-text">
                {typed}
                <span className="cursor" />
              </span>
            </div>

            <p className="hero-tagline">{personalInfo.tagline}</p>

            {/* CTA buttons */}
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={scrollToContact}>
                <Mail size={16} />
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

            {/* Stats bar */}
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
          <div className="hero-avatar">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              onError={(e) => {
                // Fallback to a gradient placeholder if image fails
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement!;
                parent.style.background = 'linear-gradient(135deg, var(--accent-2), var(--accent), #e879f9)';
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
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={scrollDown}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.75rem',
          animation: 'bounce 2s ease-in-out infinite',
        }}
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
