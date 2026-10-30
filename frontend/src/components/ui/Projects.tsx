import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
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
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Selected work</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Real-world applications I've built from the ground up.</p>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="projects-grid">
          {filtered.map((project) => (
            <article className="project-card" key={project.id}>
              {/* Top row: category + featured star */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`project-category-tag ${tagClass(project.category)}`}>
                  {project.category}
                </span>
                {project.featured && (
                  <Star size={14} fill="var(--accent-bright)" color="var(--accent-bright)" />
                )}
              </div>

              {/* Title */}
              <div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>

              {/* Description */}
              <p className="project-description">{project.description}</p>

              {/* Highlights */}
              <ul className="project-highlights">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="project-tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-tech-tag">{tech}</span>
                ))}
              </div>

              {/* Links */}
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <GithubIcon size={14} />
                  Source
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
