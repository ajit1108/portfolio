import { useEffect, useState } from 'react';
import { ArrowDown, FolderGit2, Mail, MapPin, Phone } from 'lucide-react';
import { personalInfo, skills } from '../../data/portfolio';
import { scrollToSection } from '../../lib/scroll';
import HeroParticles from './HeroParticles';

const terminalStack = skills
  .filter((group) => ['Languages', 'Frontend', 'Backend', 'Databases'].includes(group.category))
  .map((group) => group.items[0])
  .join(' · ');

const TERMINAL_LINES = [
  { command: 'whoami', output: personalInfo.name },
  { command: 'role --current', output: personalInfo.headline },
  { command: 'stack --core', output: terminalStack },
];

const START_DELAY = 700;
const COMMAND_SPEED = 100;
const OUTPUT_SPEED = 45;
const COMMAND_PAUSE = 300;
const OUTPUT_PAUSE = 550;

type TypingPhase = 'command' | 'output';

function HeroTerminal() {
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [completed, setCompleted] = useState(reducedMotion);
  const [activeLine, setActiveLine] = useState(0);
  const [phase, setPhase] = useState<TypingPhase>('command');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (completed) return;

    const line = TERMINAL_LINES[activeLine];
    const text = phase === 'command' ? line.command : line.output;

    if (charCount < text.length) {
      const delay =
        activeLine === 0 && charCount === 0
          ? START_DELAY
          : phase === 'command'
            ? COMMAND_SPEED
            : OUTPUT_SPEED;
      const timer = window.setTimeout(() => setCharCount((count) => count + 1), delay);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      if (phase === 'command') {
        setPhase('output');
        setCharCount(0);
      } else if (activeLine < TERMINAL_LINES.length - 1) {
        setActiveLine((index) => index + 1);
        setPhase('command');
        setCharCount(0);
      } else {
        setCompleted(true);
      }
    }, phase === 'command' ? COMMAND_PAUSE : OUTPUT_PAUSE);

    return () => window.clearTimeout(timer);
  }, [activeLine, charCount, completed, phase]);

  return (
    <aside className="hero-terminal" aria-label="Profile summary">
      <div className="terminal-bar" aria-hidden="true">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-amber" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">terminal</span>
      </div>

      <div className="terminal-body" aria-hidden="true">
        {TERMINAL_LINES.map((line, index) => {
          const lineDone = completed || index < activeLine;
          const isActive = !completed && index === activeLine;
          const commandText =
            lineDone || (isActive && phase === 'output')
              ? line.command
              : isActive
                ? line.command.slice(0, charCount)
                : '';
          const outputText = lineDone
            ? line.output
            : isActive && phase === 'output'
              ? line.output.slice(0, charCount)
              : '';
          const showPrompt = lineDone || isActive;
          const showOutput = lineDone || (isActive && phase === 'output');

          return (
            <div className="terminal-line" key={line.command}>
              <p className="terminal-command">
                {showPrompt && <span className="terminal-prompt">$</span>}
                <span className="terminal-text">
                  {commandText || '\u00A0'}
                  {isActive && phase === 'command' && <span className="terminal-cursor" />}
                </span>
              </p>
              <p className="terminal-output">
                {showOutput ? outputText : '\u00A0'}
                {isActive && phase === 'output' && <span className="terminal-cursor" />}
              </p>
            </div>
          );
        })}

        <p className="terminal-command terminal-cursor-line">
          {completed ? (
            <>
              <span className="terminal-prompt">$</span>
              <span className="terminal-cursor" />
            </>
          ) : (
            '\u00A0'
          )}
        </p>
      </div>

      <p className="sr-only">
        {personalInfo.name}. {personalInfo.headline}. Core stack:{' '}
        {terminalStack.replace(/ · /g, ', ')}.
      </p>
    </aside>
  );
}

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-mesh" aria-hidden="true" />
      <HeroParticles />

      <div className="container">
        <div className="hero-grid">
          <div className="hero-text">
            {personalInfo.available && (
              <span className="availability-badge hero-badge">
                <span className="availability-dot" />
                Available for opportunities
              </span>
            )}

            <p className="hero-eyebrow">Hello, I&apos;m</p>
            <h1 className="hero-name">{personalInfo.name}</h1>
            <p className="hero-designation">{personalInfo.headline}</p>
            <p className="hero-tagline">{personalInfo.tagline}</p>

            <div className="hero-contact">
              <a
                href={personalInfo.phoneUrl}
                className="hero-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (opens in a new tab)"
              >
                <span className="hero-contact-icon" aria-hidden="true"><Phone size={16} /></span>
                {personalInfo.phone}
              </a>
              <a
                href={personalInfo.emailUrl}
                className="hero-contact-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Compose email in Gmail (opens in a new tab)"
              >
                <span className="hero-contact-icon" aria-hidden="true"><Mail size={16} /></span>
                {personalInfo.email}
              </a>
            </div>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                <FolderGit2 size={16} aria-hidden="true" />
                View Projects
              </button>
              <button className="btn btn-outline" onClick={() => scrollToSection('contact')}>
                <Mail size={16} aria-hidden="true" />
                Contact Me
              </button>
            </div>

            <p className="hero-meta">
              <MapPin size={14} aria-hidden="true" />
              <span>{personalInfo.location}</span>
              <span className="hero-meta-sep" aria-hidden="true">·</span>
              <span>Open to full-time roles &amp; internships</span>
            </p>
          </div>

          <HeroTerminal />
        </div>
      </div>

      <button className="scroll-cue" onClick={() => scrollToSection('about')} aria-label="Scroll to about section">
        <span>Scroll</span>
        <ArrowDown size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
