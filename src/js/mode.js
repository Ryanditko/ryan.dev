// Função para alternar o tema
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    html.classList.toggle('dark');
    
    if (html.classList.contains('dark')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Verificar tema ao carregar a página
  function checkTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
    if (savedTheme === 'dark') {
      html.classList.add('dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      html.classList.remove('dark');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  }
  
  // Adicionar event listeners
  document.addEventListener('DOMContentLoaded', () => {
    checkTheme();
    
    const themeToggle = document.getElementById('mobile-theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Opcional: também pode adicionar para um toggle no desktop
    const desktopThemeToggle = document.getElementById('desktop-theme-toggle');
    if (desktopThemeToggle) {
      desktopThemeToggle.addEventListener('click', toggleTheme);
    }
  });