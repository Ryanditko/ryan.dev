/* =========================================
   APLICADOR DE CORES PARA ÍCONES DITKO
   ========================================= */

class IconColorManager {
  constructor() {
    this.ditkoGreen = '#84d917';
    this.init();
  }

  init() {
    // Aplicar cores nos ícones quando a página carregar
    this.applyIconColors();
    
    // Observer para novos elementos adicionados dinamicamente
    this.setupMutationObserver();
    
    // Reaplicar cores periodicamente
    setInterval(() => {
      this.applyIconColors();
    }, 2000);
  }

  applyIconColors() {
    // Selecionar todos os tipos de ícones
    const iconSelectors = [
      'i[class*="fa"]',
      'i[class*="fab"]', 
      'i[class*="fas"]',
      'i[class*="far"]',
      'i[class*="fal"]',
      '.icon',
      '.devicon',
      'i[class*="devicon"]',
      '[class*="icon-"]'
    ];

    iconSelectors.forEach(selector => {
      const icons = document.querySelectorAll(selector);
      icons.forEach(icon => {
        // Não alterar ícones que têm cores específicas importantes
        const hasSpecificColor = icon.style.color && 
          !icon.style.color.includes('rgb(132, 217, 23)') &&
          !icon.style.color.includes('#84d917') &&
          icon.style.color !== '';

        if (!hasSpecificColor) {
          icon.style.color = this.ditkoGreen;
          icon.style.setProperty('color', this.ditkoGreen, 'important');
        }
      });
    });

    // Aplicar em elementos com classes específicas
    const specialElements = document.querySelectorAll(
      '.text-green-500, .text-gradient-ditko, .skill-icon, .project-icon'
    );
    
    specialElements.forEach(el => {
      el.style.color = this.ditkoGreen;
      el.style.setProperty('color', this.ditkoGreen, 'important');
    });

    // Aplicar em devicons especificamente
    const devicons = document.querySelectorAll('[class*="devicon"]');
    devicons.forEach(icon => {
      if (!icon.style.color || icon.style.color === '') {
        icon.style.color = this.ditkoGreen;
        icon.style.setProperty('color', this.ditkoGreen, 'important');
      }
    });

    // Aplicar cores verde lima nas barras de progresso
    const progressBars = document.querySelectorAll('.skill-bar, .progress-bar, [class*="progress"]');
    progressBars.forEach(bar => {
      if (!bar.style.background || bar.style.background.includes('green-400')) {
        bar.style.background = 'linear-gradient(90deg, #84d917, #94e327)';
        bar.style.setProperty('background', 'linear-gradient(90deg, #84d917, #94e327)', 'important');
      }
    });
  }

  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Se o novo elemento é um ícone
              if (node.matches && (
                node.matches('i[class*="fa"]') || 
                node.matches('.icon') || 
                node.matches('[class*="devicon"]')
              )) {
                node.style.color = this.ditkoGreen;
                node.style.setProperty('color', this.ditkoGreen, 'important');
              }
              
              // Se o novo elemento contém ícones
              const icons = node.querySelectorAll && node.querySelectorAll(
                'i[class*="fa"], .icon, [class*="devicon"]'
              );
              if (icons) {
                icons.forEach(icon => {
                  icon.style.color = this.ditkoGreen;
                  icon.style.setProperty('color', this.ditkoGreen, 'important');
                });
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.iconColorManager = new IconColorManager();
});

// Também inicializar se a página já estiver carregada
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.iconColorManager = new IconColorManager();
  });
} else {
  window.iconColorManager = new IconColorManager();
}
