import { FolderGit2, GraduationCap, Layers, Mail, UserRound } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { personalInfo } from '../../data/portfolio';

const STAT_ICONS = [GraduationCap, FolderGit2, Layers];

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <SectionHeading
          icon={UserRound}
          eyebrow="About me"
          title="Building for the web, end to end"
          subtitle="A developer focused on backend engineering, full-stack delivery and applied machine learning."
        />

        <div className="about-body">
          <Reveal className="about-bio-wrap">
            <p className="about-bio">{personalInfo.bio}</p>

            <div className="about-actions">
              <a
                href={personalInfo.emailUrl}
                className="btn btn-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={15} aria-hidden="true" />
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
          </Reveal>

          <div className="stats-grid">
            {personalInfo.stats.map((stat, index) => {
              const Icon = STAT_ICONS[index] ?? Layers;
              return (
                <Reveal key={stat.label} delay={index * 80}>
                  <div className="stat-card">
                    <span className="stat-icon" aria-hidden="true"><Icon size={20} /></span>
                    <span className="stat-value">{stat.value}{stat.suffix}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
