import type { LucideIcon } from 'lucide-react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ icon: Icon, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="section-header">
      <span className="section-icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  );
}
