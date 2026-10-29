import { GraduationCap, Award, MapPin } from 'lucide-react';
import { education } from '../../data/portfolio';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <div className="divider" />
          <p className="section-subtitle">My academic journey and qualifications.</p>
        </div>

        <div className="timeline">
          {education.map((edu, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <div className="timeline-period">{edu.period}</div>

                    <h3 className="timeline-degree">{edu.degree}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                      <GraduationCap size={14} color="var(--text-muted)" />
                      <span className="timeline-institution">{edu.institution}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                      <MapPin size={12} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{edu.location}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    {edu.current && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'rgba(52, 211, 153, 0.12)',
                          border: '1px solid rgba(52, 211, 153, 0.3)',
                          color: '#34d399',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        Current
                      </span>
                    )}
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
