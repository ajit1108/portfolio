import { useCallback, useState } from 'react';

export type ThemeId = 'midnight' | 'emerald' | 'ember' | 'arctic';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  hint: string;
  swatch: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    hint: 'Violet on ink',
    swatch: 'linear-gradient(135deg, #a78bfa, #6d28d9)',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    hint: 'Teal on forest',
    swatch: 'linear-gradient(135deg, #5eead4, #0f766e)',
  },
  {
    id: 'ember',
    name: 'Ember',
    hint: 'Amber on coal',
    swatch: 'linear-gradient(135deg, #fcd34d, #c2410c)',
  },
  {
    id: 'arctic',
    name: 'Arctic',
    hint: 'Indigo on light',
    swatch: 'linear-gradient(135deg, #e2e8f0, #4f46e5)',
  },
];

export const THEME_STORAGE_KEY = 'ajit-portfolio-theme';

const THEME_COLORS: Record<ThemeId, string> = {
  midnight: '#07070f',
  emerald: '#04120f',
  ember: '#120a05',
  arctic: '#f6f7fb',
};

const isThemeId = (value: unknown): value is ThemeId =>
  THEMES.some((theme) => theme.id === value);

function readStoredTheme(): ThemeId | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(stored) ? stored : null;
  } catch {
    return null;
  }
}

function readInitialTheme(): ThemeId {
  const applied = document.documentElement.dataset.theme;
  if (isThemeId(applied)) return applied;
  return readStoredTheme() ?? 'midnight';
}

function applyTheme(theme: ThemeId) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme === 'arctic' ? 'light' : 'dark';
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme]);
}

let transitionTimer: number | undefined;

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(readInitialTheme);

  const setTheme = useCallback((next: ThemeId) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 450);

    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this session.
    }
    setThemeState(next);
  }, []);

  return { theme, setTheme, themes: THEMES };
}
