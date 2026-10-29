import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education',href: '#education' },
  { label: 'Contact',  href: '#contact' },
];

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <Code2 size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              ajit<span>.dev</span>
            </div>

            <nav>
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
              <a
                href="#contact"
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              >
                Hire Me
              </a>
              <button
                className="hamburger"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X size={22} color="var(--text-primary)" /> : <Menu size={22} color="var(--text-primary)" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <nav className="mobile-nav" onClick={() => setMobileOpen(false)}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
