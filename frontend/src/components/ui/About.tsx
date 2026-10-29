import { Code, Monitor, Server, Database, Brain, Wrench } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { personalInfo, skills, achievements, softSkills } from '../../data/portfolio';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code size={20} />,
  Monitor: <Monitor size={20} />,
  Server: <Server size={20} />,
  Database: <Database size={20} />,
  Brain: <Brain size={20} />,
  Wrench: <Wrench size={20} />,
};

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Passionate developer building meaningful, scalable solutions.
          </p>
        </div>

        {/* Bio + highlights */}
        <div className="about-grid">
          <div>
            <p className="about-bio">{personalInfo.bio}</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${personalInfo.email}`} className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.4rem' }}>
                Contact Me
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.6rem 1.4rem' }}>
                <GithubIcon size={16} />
              View GitHub
              </a>
            </div>
          </div>

          <div className="about-highlights">
            {achievements.map((text, i) => (
              <div className="highlight-card" key={i}>
                <div className="highlight-icon" style={{ fontSize: '1.2rem' }}>
                  {i === 0 ? '🧩' : i === 1 ? '🎓' : '🚀'}
                </div>
                <div>
                  <p className="highlight-desc" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div style={{ marginTop: '5rem' }} id="skills">
          <div className="section-header">
            <h2 className="section-title">Skills &amp; Technologies</h2>
            <div className="divider" />
            <p className="section-subtitle">A curated set of tools I work with.</p>
          </div>

          <div className="skills-grid">
            {skills.map((cat) => (
              <div className="skill-category-card" key={cat.category}>
                <div className="skill-category-header">
                  <div className="skill-icon" style={{ color: cat.color }}>
                    {ICON_MAP[cat.icon] ?? '⚙️'}
                  </div>
                  <span className="skill-category-name" style={{ color: cat.color }}>
                    {cat.category}
                  </span>
                </div>
                <div className="skill-tags">
                  {cat.items.map((item) => (
                    <span key={item} className="badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft skills */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Soft Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {softSkills.map((s) => (
              <span key={s} className="badge" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
