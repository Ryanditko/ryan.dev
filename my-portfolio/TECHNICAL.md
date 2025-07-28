# 🛠️ Guia Técnico de Desenvolvimento

## 📋 Índice
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Performance](#performance)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas
```
my-portfolio/
├── 📁 assets/                    # Assets otimizados e organizados
│   ├── 📁 css/                  # Estilos compilados
│   ├── 📁 js/                   # Scripts organizados por funcionalidade
│   ├── 📁 images/               # Imagens otimizadas
│   └── 📁 docs/                 # Documentação técnica
├── 📁 src/                      # Código fonte original
├── 📁 tests/                    # Suíte de testes
├── 📁 .github/                  # Configurações CI/CD
├── 📁 coverage/                 # Relatórios de cobertura
└── 📁 lighthouse-reports/       # Relatórios de performance
```

### Padrões de Organização

#### CSS Architecture
- **CSS Variables**: Sistema de design tokens
- **BEM Methodology**: Nomenclatura de classes
- **Mobile-First**: Abordagem responsiva
- **Component-Based**: Estilos organizados por componente

#### JavaScript Architecture
- **Module Pattern**: Organização em classes/módulos
- **Event-Driven**: Sistema baseado em eventos
- **Progressive Enhancement**: Funciona sem JavaScript
- **Error Handling**: Tratamento robusto de erros

## ⚙️ Configuração do Ambiente

### Pré-requisitos
```bash
# Versões mínimas requeridas
node >= 16.0.0
npm >= 8.0.0
git >= 2.0.0
```

### Instalação Completa
```bash
# 1. Clone o repositório
git clone https://github.com/Ryanditko/my-portfolio.git
cd my-portfolio

# 2. Instale dependências
npm install

# 3. Configure hooks do Git
npm run prepare

# 4. Verifique a instalação
npm run validate
```

### Configuração do Editor (VS Code)
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "html.format.indentInnerHtml": true,
  "css.validate": false,
  "scss.validate": false,
  "files.associations": {
    "*.css": "css"
  }
}
```

## 🚀 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento com live reload
npm run start        # Servidor de produção local
npm run preview      # Build + preview local
```

### Qualidade de Código
```bash
npm run lint         # Executa todos os linters
npm run lint:fix     # Corrige automaticamente problemas
npm run format       # Formata código com Prettier
npm run validate     # Validação completa (lint + format + audit)
```

### Build e Otimização
```bash
npm run build        # Build completo
npm run optimize:images  # Otimiza imagens
npm run minify:css   # Minifica CSS
npm run minify:js    # Minifica JavaScript
```

### Testes
```bash
npm run test         # Executa testes
npm run test:watch   # Modo watch para desenvolvimento
npm run test:coverage # Gera relatório de cobertura
```

### Deploy
```bash
npm run deploy       # Deploy para GitHub Pages
npm run audit        # Auditoria de performance
```

## 📏 Padrões de Código

### HTML Standards
- **Semântico**: Use elementos apropriados
- **Acessível**: ARIA labels e roles
- **Validado**: HTML5 válido
- **SEO Friendly**: Meta tags apropriadas

```html
<!-- ✅ Bom -->
<nav aria-label="Navegação principal">
  <ul role="menubar">
    <li role="none">
      <a href="#about" role="menuitem">Sobre</a>
    </li>
  </ul>
</nav>

<!-- ❌ Ruim -->
<div class="nav">
  <div onclick="navigate()">Sobre</div>
</div>
```

### CSS Standards
- **Custom Properties**: Use variáveis CSS
- **Mobile-First**: Media queries de mobile para desktop
- **BEM Naming**: Nomenclatura consistente
- **Performance**: Evite seletores complexos

```css
/* ✅ Bom */
.component__element--modifier {
  color: var(--text-primary);
  transition: var(--transition-fast);
}

@media (min-width: 768px) {
  .component__element--modifier {
    font-size: 1.2rem;
  }
}

/* ❌ Ruim */
div.content > ul li:nth-child(odd) a.link {
  color: #333;
}
```

### JavaScript Standards
- **ES6+ Features**: Use sintaxe moderna
- **Error Handling**: Try/catch apropriados
- **Performance**: Evite DOM queries desnecessárias
- **Accessibility**: Suporte a teclado e screen readers

```javascript
// ✅ Bom
class ThemeManager {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const theme = await this.getStoredTheme();
      this.applyTheme(theme);
    } catch (error) {
      console.error('Theme initialization failed:', error);
      this.applyTheme('light'); // fallback
    }
  }
}

// ❌ Ruim
function initTheme() {
  var theme = localStorage.getItem('theme');
  document.body.className = theme;
}
```

## 🧪 Testes

### Estrutura de Testes
```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
├── e2e/           # Testes end-to-end
└── utils/         # Utilitários de teste
```

### Executando Testes
```bash
# Todos os testes
npm test

# Testes específicos
npm test -- --testNamePattern="ThemeManager"

# Com cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

### Exemplo de Teste
```javascript
// tests/unit/theme-manager.test.js
import { ThemeManager } from '../../assets/js/theme-manager.js';

describe('ThemeManager', () => {
  let themeManager;

  beforeEach(() => {
    localStorage.clear();
    themeManager = new ThemeManager();
  });

  test('should initialize with auto theme', () => {
    expect(themeManager.currentTheme).toBe('auto');
  });

  test('should toggle between light and dark', () => {
    themeManager.setTheme('light');
    themeManager.toggleTheme();
    expect(themeManager.currentTheme).toBe('dark');
  });
});
```

## ⚡ Performance

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregadas sob demanda
- **Code Splitting**: Scripts carregados conforme necessário
- **Image Optimization**: WebP com fallback
- **CSS Optimization**: Critical CSS inline
- **JavaScript Optimization**: Modules e tree shaking

### Monitoramento
```bash
# Lighthouse audit
npm run audit

# Performance budget check
npm run check:performance

# Bundle analyzer
npm run analyze
```

## 🚢 Deploy

### Ambientes
- **Development**: `localhost:3000`
- **Staging**: `staging.ryandev.com`
- **Production**: `ryandev-murex.vercel.app`

### Pipeline CI/CD
1. **Push** → GitHub Actions triggered
2. **Quality Check** → Lint, test, audit
3. **Build** → Optimize assets
4. **Deploy** → Vercel/GitHub Pages
5. **Notify** → Success/failure notification

### Deploy Manual
```bash
# Para Vercel
vercel --prod

# Para GitHub Pages
npm run deploy

# Para Netlify
netlify deploy --prod --dir=.
```

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Build Failures
```bash
# Limpar cache
npm run clean
rm -rf node_modules package-lock.json
npm install

# Verificar versões
node --version
npm --version
```

#### 2. Linting Errors
```bash
# Auto-fix quando possível
npm run lint:fix

# Verificar configurações
cat .eslintrc.json
cat .stylelintrc.json
```

#### 3. Performance Issues
```bash
# Analisar bundle
npm run analyze

# Verificar imagens
npm run optimize:images

# Lighthouse audit
npm run audit
```

#### 4. Theme Not Working
- Verificar se `localStorage` está disponível
- Checar console para erros JavaScript
- Validar CSS custom properties
- Testar em modo incógnito

### Debug Mode
```javascript
// Ativar debug no console
localStorage.setItem('debug', 'true');
window.location.reload();

// Ver métricas de performance
console.log(window.performanceMonitor.getMetrics());

// Verificar estado do tema
console.log(window.themeManager.getThemeInfo());
```

### Logs Úteis
```bash
# Git logs
git log --oneline -10

# NPM logs
npm run lint 2>&1 | tee lint.log

# Performance logs
npm run audit > audit.log
```

## 📞 Suporte

### Recursos de Ajuda
- 📖 [Documentação Completa](./docs/)
- 🐛 [Report de Bugs](https://github.com/Ryanditko/my-portfolio/issues)
- 💬 [Discussões](https://github.com/Ryanditko/my-portfolio/discussions)
- 📧 [Contato Direto](mailto:contato@ryandev.com)

### Contributing
Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para diretrizes de contribuição.

---

**Última atualização**: ${new Date().toISOString().split('T')[0]}
**Versão**: 2.0.0
