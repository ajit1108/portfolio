import { useState } from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { projects } from '../../data/portfolio';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const tagClass = (cat: string) => {
    if (cat === 'AI/ML') return 'tag-aiml';
    if (cat === 'Full Stack') return 'tag-fullstack';
    return '';
  };

  return (
    <section className="section section-alt projects-section" id="projects">
      <div className="projects-glow" aria-hidden="true" />

      <div className="container">
        <SectionHeading
          icon={FolderGit2}
          eyebrow="Selected work"
          title="Projects"
          subtitle="Real-world applications I've designed and built from the ground up."
        />

        <div className="filter-tabs" role="group" aria-label="Filter projects by category">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid" key={activeFilter}>
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <article className="project-card">
                <div className="project-top">
                  <span className={`project-category-tag ${tagClass(project.category)}`}>
                    {project.category}
                  </span>
                  <span className="project-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-block">
                  <p className="project-label">Key highlights</p>
                  <ul className="project-highlights">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-block">
                  <p className="project-label">Technologies</p>
                  <div className="project-tech-stack">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="project-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action"
                    aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                  >
                    <GithubIcon size={15} />
                    GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action project-action-primary"
                      aria-label={`View ${project.title} live demo (opens in a new tab)`}
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="projects-empty">No projects found for this filter.</p>
        )}
      </div>
    </section>
  );
}
