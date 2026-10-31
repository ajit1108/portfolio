import { BookOpen, Calendar, GraduationCap, MapPin, School } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { education } from '../../data/portfolio';

const EDUCATION_ICONS = {
  graduation: GraduationCap,
  'higher-secondary': BookOpen,
  secondary: School,
} as const;

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          icon={GraduationCap}
          eyebrow="Academic path"
          title="Education"
          subtitle="My academic journey and the qualifications behind my engineering work."
        />

        <div className="education-list">
          {education.map((edu, index) => {
            const Icon = EDUCATION_ICONS[edu.type as keyof typeof EDUCATION_ICONS] ?? GraduationCap;
            const scoreValue = edu.score.replace(/^CGPA:\s*/, '');
            const scoreLabel = edu.score.startsWith('CGPA') ? 'CGPA' : 'Score';

            return (
              <Reveal key={edu.degree} delay={index * 80}>
                <article className="education-card">
                  <span className="education-icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>

                  <div className="education-body">
                    <div className="education-top">
                      <div>
                        <h3 className="education-institution">{edu.institution}</h3>
                        <p className="education-degree">{edu.degree}</p>
                      </div>

                      <div className="education-score">
                        <span className="education-score-value">{scoreValue}</span>
                        <span className="education-score-label">{scoreLabel}</span>
                      </div>
                    </div>

                    <div className="education-meta">
                      <span><Calendar size={14} aria-hidden="true" /> {edu.period}</span>
                      <span><MapPin size={14} aria-hidden="true" /> {edu.location}</span>
                      {edu.current && <span className="pill-current">Current</span>}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
