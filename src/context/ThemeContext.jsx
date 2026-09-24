import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme can be 'system' (browser preference), 'dark', or 'light'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('d_ensured_theme') || 'system';
  });

  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Calculate resolved theme (what is actually rendered: 'dark' or 'light')
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Listen to browser/OS theme preferences in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    // Modern and backward-compatible media query event listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Apply classes to root <html> element whenever resolvedTheme updates
  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [resolvedTheme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('d_ensured_theme', newTheme);
  };

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('system');
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      systemTheme,
      isSystem: theme === 'system',
      isDark: resolvedTheme === 'dark',
      isLight: resolvedTheme === 'light',
      setTheme,
      cycleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
