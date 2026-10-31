import { Mail, Phone, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';
import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                      <GithubIcon size={18} /> GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
            <LinkedinIcon size={18} /> LinkedIn
          </a>
          <a href={`tel:${personalInfo.phoneHref}`} className="footer-link">
            <Phone size={18} /> {personalInfo.phone}
          </a>
          <a href={`mailto:${personalInfo.email}`} className="footer-link">
            <Mail size={18} /> Email
          </a>
        </div>
        <p className="footer-copy">
          © {year} <span>{personalInfo.name}</span> · Built with{' '}
          <Heart size={12} fill="#e879f9" color="#e879f9" style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
          using React &amp; Vite
        </p>
      </div>
    </footer>
  );
}
