// Theme Manager - Dark Theme Only
document.addEventListener('DOMContentLoaded', function() {
  // Force dark theme only
  document.documentElement.setAttribute('data-theme', 'dark');
  document.body.classList.add('dark-theme');
  localStorage.setItem('theme', 'dark');
  
  // Hide all theme toggle buttons
  const themeToggles = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
  themeToggles.forEach(toggle => {
    if (toggle) {
      toggle.style.display = 'none';
    }
  });
  
  // Apply dark theme colors immediately
  applyDarkTheme();
});

function applyDarkTheme() {
  // Apply dark theme styles
  const root = document.documentElement;
  
  // Set CSS custom properties for dark theme
  root.style.setProperty('--bg-primary', '#000000');
  root.style.setProperty('--bg-secondary', '#111111');
  root.style.setProperty('--text-primary', '#ffffff');
  root.style.setProperty('--text-secondary', '#cccccc');
  root.style.setProperty('--accent-color', '#84d917');
  root.style.setProperty('--card-bg', '#1a1a1a');
  root.style.setProperty('--border-color', 'rgba(132, 217, 23, 0.3)');
  
  // Apply to body
  document.body.style.backgroundColor = '#000000';
  document.body.style.color = '#ffffff';
} 
      '<i class="fas fa-moon"></i>';
    
    // Adicionar estilos inline
    themeToggle.style.cssText = `
      background: transparent;
      border: 2px solid #84d917;
      color: #84d917;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    `;
    
    // Adicionar hover effect
    themeToggle.addEventListener('mouseenter', () => {
      themeToggle.style.background = '#84d917';
      themeToggle.style.color = '#000000';
    });
// No additional code needed - dark theme only
