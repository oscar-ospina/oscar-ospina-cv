const SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var mode = stored === 'light' || stored === 'dark' ? stored : 'system';
    var isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
