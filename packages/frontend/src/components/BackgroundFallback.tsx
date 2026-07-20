import { useEffect, useState } from 'react';

function getTheme(): 'dark' | 'light' {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return 'dark';
}

/** Lightweight CSS gradient used as a fallback if the 3D background fails. */
export function BackgroundFallback() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setTheme(getTheme());
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`bg-gradient ${theme === 'light' ? 'bg-gradient--light' : 'bg-gradient--dark'}`}
    >
      <span className="bg-blob bg-blob--1" />
      <span className="bg-blob bg-blob--2" />
      <span className="bg-blob bg-blob--3" />
    </div>
  );
}
