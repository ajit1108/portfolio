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
    name: 'Midnight Blue',
    hint: 'Blue on navy',
    swatch: 'linear-gradient(135deg, #60a5fa, #1e3a8a)',
  },
  {
    id: 'arctic',
    name: 'Purple Gradient',
    hint: 'Violet on white',
    swatch: 'linear-gradient(135deg, #f5f3ff, #7c3aed)',
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    hint: 'Green on forest',
    swatch: 'linear-gradient(135deg, #34d399, #065f46)',
  },
  {
    id: 'ember',
    name: 'Sunset Orange',
    hint: 'Amber on dusk',
    swatch: 'linear-gradient(135deg, #fbbf24, #c2410c)',
  },
];

export const THEME_STORAGE_KEY = 'ajit-portfolio-theme';

const THEME_COLORS: Record<ThemeId, string> = {
  midnight: '#060b1a',
  emerald: '#04120f',
  ember: '#120a05',
  arctic: '#ffffff',
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
