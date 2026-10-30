import { GraduationCap, Award, MapPin } from 'lucide-react';
import { education } from '../../data/portfolio';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Academic path</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic journey and qualifications.</p>
        </div>

        <div className="timeline">
          {education.map((edu, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-card">
                <div className="timeline-top">
                  <div className="timeline-main">
                    <div className="timeline-period">{edu.period}</div>
                    <h3 className="timeline-degree">{edu.degree}</h3>
                    <div className="timeline-row">
                      <GraduationCap size={14} />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="timeline-row timeline-row-muted">
                      <MapPin size={12} />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <div className="timeline-badges">
                    {edu.current && <span className="pill-current">Current</span>}
                    <span className="timeline-score">
                      <Award size={12} />
                      {edu.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
