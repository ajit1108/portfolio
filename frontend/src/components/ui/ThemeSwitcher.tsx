import { useEffect, useRef, useState } from 'react';
import { Check, Palette } from 'lucide-react';
import { THEMES, type ThemeId } from '../../hooks/useTheme';

interface ThemeSwitcherProps {
  theme: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export default function ThemeSwitcher({ theme, onChange }: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = THEMES.find((option) => option.id === theme) ?? THEMES[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        type="button"
        className="theme-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Change color theme. Current theme: ${active.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        title="Change color theme"
      >
        <Palette size={17} aria-hidden="true" />
        <span className="theme-trigger-label">Theme</span>
        <span className="theme-trigger-dot" style={{ background: active.swatch }} aria-hidden="true" />
      </button>

      {open && (
        <div className="theme-menu" role="menu" aria-label="Color themes">
          <p className="theme-menu-title">Color theme</p>
          {THEMES.map((option) => {
            const selected = option.id === theme;
            return (
              <button
                type="button"
                key={option.id}
                role="menuitemradio"
                aria-checked={selected}
                className={`theme-option${selected ? ' active' : ''}`}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
              >
                <span className="theme-swatch" style={{ background: option.swatch }} aria-hidden="true" />
                <span className="theme-option-text">
                  <span className="theme-option-name">{option.name}</span>
                  <span className="theme-option-hint">{option.hint}</span>
                </span>
                {selected && <Check size={15} className="theme-check" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
