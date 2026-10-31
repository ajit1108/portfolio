import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { THEMES, type ThemeId } from '../../hooks/useTheme';
import { scrollToSection } from '../../lib/scroll';

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education',href: '#education' },
  { label: 'Contact',  href: '#contact' },
];

interface HeaderProps {
  activeSection: string;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export default function Header({ activeSection, theme, onThemeChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    scrollToSection(href.replace('#', ''));
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <a
              href="#hero"
              className="logo"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
              aria-label="Ajit Birajdar — back to top"
            >
              <Code2 size={18} aria-hidden="true" />
              <span className="logo-text">ajit<span className="logo-dot">.dev</span></span>
            </a>

            <nav aria-label="Primary">
              <ul className="nav-links">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="nav-actions">
              <ThemeSwitcher theme={theme} onChange={onThemeChange} />
              <a
                href="#contact"
                className="btn btn-primary btn-sm nav-hire"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              >
                Hire Me
              </a>
              <button
                className="hamburger"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mobile-theme" onClick={(e) => e.stopPropagation()}>
            <span className="mobile-theme-label">Theme</span>
            <div className="mobile-theme-options">
              {THEMES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`mobile-theme-swatch${option.id === theme ? ' active' : ''}`}
                  style={{ background: option.swatch }}
                  onClick={() => { onThemeChange(option.id); setMobileOpen(false); }}
                  aria-label={`${option.name} theme`}
                  aria-pressed={option.id === theme}
                  title={option.name}
                />
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
