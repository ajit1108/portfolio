import type { CSSProperties } from 'react';
import { Brain, Code, Database, Monitor, Server, Sparkles, Wrench } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { skills } from '../../data/portfolio';

const SKILL_ICONS: Record<string, React.ReactNode> = {
  Code: <Code size={20} />,
  Monitor: <Monitor size={20} />,
  Server: <Server size={20} />,
  Database: <Database size={20} />,
  Brain: <Brain size={20} />,
  Wrench: <Wrench size={20} />,
};

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          icon={Sparkles}
          eyebrow="Technical arsenal"
          title="Skills & Technologies"
          subtitle="The languages, frameworks and platforms I use to ship complete applications."
        />

        <div className="skills-grid">
          {skills.map((cat, index) => (
            <Reveal key={cat.category} delay={index * 60}>
              <div
                className="skill-category-card"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
