import type { CSSProperties } from 'react';
import { Brain, Code, Database, Monitor, Server, Wrench } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { personalInfo, skills } from '../../data/portfolio';

const SKILL_ICONS: Record<string, React.ReactNode> = {
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
        <div className="section-header">
          <span className="section-eyebrow">About me</span>
          <h2 className="section-title">Building for the web, end to end</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Passionate developer building meaningful, scalable solutions.
          </p>
        </div>

        <div className="about-body">
          <p className="about-bio">{personalInfo.bio}</p>

          <div className="about-actions">
            <a href={`mailto:${personalInfo.email}`} className="btn btn-primary btn-sm">
              Contact Me
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              <GithubIcon size={15} />
              View GitHub
            </a>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginTop: '5rem' }} id="skills">
          <div className="section-header">
            <span className="section-eyebrow">Technical arsenal</span>
            <h2 className="section-title">Skills &amp; Technologies</h2>
            <div className="divider" />
            <p className="section-subtitle">A curated set of tools I work with.</p>
          </div>

          <div className="skills-grid">
            {skills.map((cat) => (
              <div
                className="skill-category-card"
                key={cat.category}
                style={{ '--cat-color': cat.color } as CSSProperties}
              >
                <div className="skill-category-header">
                  <div className="skill-icon">{SKILL_ICONS[cat.icon] ?? <Wrench size={20} />}</div>
                  <span className="skill-category-name">{cat.category}</span>
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
      </div>
    </section>
  );
}
