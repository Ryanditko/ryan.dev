#  Portfolio - Ryan Rodrigues

[![Deploy Status](https://github.com/Ryanditko/my-portfolio/workflows/Deploy%20Portfolio%20to%20GitHub%20Pages/badge.svg)](https://github.com/Ryanditko/my-portfolio/actions)
[![Quality Check](https://github.com/Ryanditko/my-portfolio/workflows/Code%20Quality%20Check/badge.svg)](https://github.com/Ryanditko/my-portfolio/actions)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fryandev-murex.vercel.app)](https://ryandev-murex.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🎯 Portfolio profissional desenvolvido com tecnologias modernas, focado em performance, acessibilidade e experiência do usuário.

## ✨ Características

### 🎨 Design & UX
- **Design Responsivo**: Otimizado para todos os dispositivos (mobile-first)
- **Dark/Light Mode**: Sistema de temas com detecção automática de preferência do sistema
- **Animações Suaves**: Transições e animações implementadas com performance em mente
- **Interface Moderna**: Design clean e profissional seguindo as melhores práticas de UI/UX

### ⚡ Performance
- **Lazy Loading**: Carregamento inteligente de imagens
- **Core Web Vitals**: Otimizado para LCP, FID e CLS
- **Compressão de Assets**: Imagens otimizadas e minificação de código
- **Progressive Enhancement**: Funciona mesmo com JavaScript desabilitado

### ♿ Acessibilidade
- **WCAG 2.1 AA**: Conformidade com diretrizes de acessibilidade
- **Navegação por Teclado**: Suporte completo para navegação sem mouse
- **Screen Reader**: Compatível com leitores de tela
- **Foco Visível**: Indicadores claros de foco para navegação

### 🔧 Funcionalidades Técnicas
- **PWA Ready**: Manifesto e Service Worker configurados
- **SEO Otimizado**: Meta tags, structured data e sitemap
- **Cross-Browser**: Compatível com todos os navegadores modernos
- **TypeScript Ready**: Estrutura preparada para migração

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Semântico e acessível
- **CSS3**: Variáveis CSS, Grid, Flexbox, Animations
- **JavaScript ES6+**: Modules, Classes, Async/Await
- **Tailwind CSS**: Framework utilitário para estilização

### Ferramentas de Desenvolvimento
- **GitHub Actions**: CI/CD automatizado
- **ESLint**: Linting de JavaScript
- **Stylelint**: Linting de CSS
- **HTMLHint**: Validação de HTML
- **Lighthouse**: Auditoria de performance e acessibilidade

### Hospedagem & Deploy
- **Vercel**: Deploy principal
- **GitHub Pages**: Deploy alternativo
- **Cloudflare**: CDN e otimização

## 📁 Estrutura do Projeto

```
my-portfolio/
├── 📁 assets/                    # Assets organizados
│   ├── 📁 css/                  # Estilos CSS
│   │   └── theme.css            # Sistema de temas
│   ├── 📁 js/                   # Scripts JavaScript
│   │   ├── theme-manager.js     # Gerenciador de temas
│   │   └── utilities.js         # Utilitários e funcionalidades
│   ├── 📁 images/               # Imagens otimizadas
│   └── 📁 docs/                 # Documentação
├── 📁 src/                      # Código fonte original
│   ├── 📁 img/                  # Imagens do projeto
│   ├── 📁 js/                   # Scripts originais
│   └── 📁 styles/               # Estilos originais
├── 📁 .github/                  # Configurações GitHub
│   └── 📁 workflows/            # GitHub Actions
│       ├── deploy.yml           # Deploy automatizado
│       └── quality-check.yml    # Verificação de qualidade
├── 📄 index.html                # Página principal
├── 📄 .eslintrc.json           # Configuração ESLint
├── 📄 .stylelintrc.json        # Configuração Stylelint
├── 📄 .htmlhintrc              # Configuração HTMLHint
└── 📄 README.md                # Este arquivo
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **Git**
- Navegador moderno

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Ryanditko/my-portfolio.git
   cd my-portfolio
   ```

2. **Instale as dependências** (opcional, para ferramentas de desenvolvimento)
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   # Servidor local simples
   npx serve .
   # ou
   python -m http.server 8000
   # ou apenas abra index.html no navegador
   ```

4. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

## 🎯 Scripts Disponíveis

```bash
# Validação de código
npm run lint:html       # Validar HTML
npm run lint:css        # Validar CSS
npm run lint:js         # Validar JavaScript
npm run lint:all        # Validar tudo

# Build e Deploy
npm run build           # Build do projeto
npm run deploy          # Deploy para GitHub Pages
npm run preview         # Preview local do build

# Otimização
npm run optimize:images # Otimizar imagens
npm run audit           # Auditoria de performance
```

## 🌐 Deploy

### Deploy Automático
O projeto utiliza **GitHub Actions** para deploy automático:
- **Push para main**: Deploy para produção
- **Pull Request**: Preview deploy e verificação de qualidade

### Deploy Manual
```bash
# Para Vercel
vercel --prod

# Para GitHub Pages
npm run deploy
```

## 📱 Funcionalidades Implementadas

### ✅ Sistema de Temas
- [x] Dark Mode / Light Mode
- [x] Detecção automática de preferência do sistema
- [x] Persistência da escolha do usuário
- [x] Transições suaves entre temas
- [x] Suporte para meta theme-color

### ✅ Navegação
- [x] Menu responsivo com hamburger
- [x] Navegação por teclado
- [x] Smooth scrolling
- [x] Indicador de progresso de scroll
- [x] Auto-hide navbar no scroll

### ✅ Performance
- [x] Lazy loading de imagens
- [x] Intersection Observer para animações
- [x] Otimização de Core Web Vitals
- [x] Compressão de assets
- [x] Service Worker (PWA)

### ✅ Acessibilidade
- [x] Navegação por teclado completa
- [x] Suporte a screen readers
- [x] Skip links
- [x] Focus management
- [x] Aria labels e roles

## 🔄 Melhorias Futuras

### 📋 Roadmap
- [ ] **Multi-idioma**: Suporte para português e inglês
- [ ] **Blog integrado**: Sistema de posts com markdown
- [ ] **Analytics**: Google Analytics e Hotjar
- [ ] **Contact Form**: Formulário funcional com backend
- [ ] **TypeScript**: Migração completa para TypeScript
- [ ] **Testing**: Testes automatizados com Jest/Cypress

### 🎨 Design
- [ ] **Micro-interações**: Animações mais elaboradas
- [ ] **3D Elements**: Elementos tridimensionais com Three.js
- [ ] **Custom Cursor**: Cursor personalizado
- [ ] **Parallax**: Efeitos parallax sutis

### ⚡ Performance
- [ ] **Image Optimization**: WebP/AVIF automático
- [ ] **Code Splitting**: Divisão inteligente do código
- [ ] **Prefetching**: Pre-carregamento inteligente
- [ ] **CDN**: Implementação de CDN próprio

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de submeter um PR.

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Ryan Rodrigues**
- 🌐 Portfolio: [ryandev-murex.vercel.app](https://ryandev-murex.vercel.app)
- 💼 LinkedIn: [Ryan Rodrigues](https://linkedin.com/in/ryan-rodrigues)
- 📧 Email: [contato@ryandev.com](mailto:contato@ryandev.com)
- 🐙 GitHub: [@Ryanditko](https://github.com/Ryanditko)

## 🙏 Agradecimentos

- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)
- **Tailwind CSS** - Framework CSS
- **GitHub** - Hospedagem e CI/CD
- **Vercel** - Platform de deploy

---

<div align="center">
  <p>Feito com ❤️ por <strong>Ryan Rodrigues</strong></p>
  <p>
    <a href="https://ryandev-murex.vercel.app">🌐 Ver Portfolio</a> •
    <a href="mailto:contato@ryandev.com">📧 Contato</a> •
    <a href="https://linkedin.com/in/ryan-rodrigues">💼 LinkedIn</a>
  </p>
</div>
