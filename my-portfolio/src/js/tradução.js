
    // Sistema de Tradução
    document.addEventListener('DOMContentLoaded', function() {
      const translations = {
        'pt': {
          'about-link': 'Sobre',
          'skills-link': 'Stacks',
          'projects-link': 'Projetos',
          'experience-link': 'Experiência',
          'contact-link': 'Contato',
          'hero-title': 'Prazer, eu sou',
          'hero-subtitle': 'Desenvolvedor Fullstack em desenvolvimento com conhecimento em DevWeb, RPA, Cloud e Data Analytics. Estou construindo uma carreira incrível aqui, venha me conhecer!',
          'milestones-btn': 'Marcos',
          'resume-btn': 'Currículo',
          'about-title': 'Sobre Mim',
          // Adicione todas as outras strings que precisam ser traduzidas
        },
        'en': {
          'about-link': 'About',
          'skills-link': 'Skills',
          'projects-link': 'Projects',
          'experience-link': 'Experience',
          'contact-link': 'Contact',
          'hero-title': 'Hi, I am',
          'hero-subtitle': 'Fullstack Developer in development with knowledge in WebDev, RPA, Cloud and Data Analytics. I\'m building an amazing career here, come meet me!',
          'milestones-btn': 'Milestones',
          'resume-btn': 'Resume',
          'about-title': 'About Me',
          // Adicione todas as outras strings que precisam ser traduzidas
        }
      };
      
      // Elementos que precisam de tradução devem ter data-i18n="chave"
      // Exemplo: <h2 data-i18n="about-title">Sobre Mim</h2>
      
      // Verifica o idioma salvo ou preferência do navegador
      const savedLang = localStorage.getItem('language') || 
                       (navigator.language.startsWith('pt') ? 'pt' : 'en');
      
      // Aplica o idioma salvo
      applyLanguage(savedLang);
      
      // Função para aplicar traduções
      function applyLanguage(lang) {
        // Atualiza o atributo lang do HTML
        document.documentElement.lang = lang;
        
        // Aplica as traduções
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
          }
        });
        
        // Salva a preferência
        localStorage.setItem('language', lang);
      }
      
      // Botões de alternar idioma (adicione esses botões ao seu navbar)
      document.getElementById('lang-pt').addEventListener('click', function() {
        applyLanguage('pt');
      });
      
      document.getElementById('lang-en').addEventListener('click', function() {
        applyLanguage('en');
      });
    });
    
  