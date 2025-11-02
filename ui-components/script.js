// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const THEME_KEY = 'ui-theme';
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(mode){
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem(THEME_KEY, mode);
  themeToggle.textContent = (mode === 'light') ? '🌙 Dark' : '🌞 Light';
}

const saved = localStorage.getItem(THEME_KEY);
if (saved) applyTheme(saved);
else applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});
