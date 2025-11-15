# Portfolio - Ryan Rodrigues

Portfolio profissional desenvolvendo aplicações web modernas e escaláveis.

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://ryandev-murex.vercel.app)

## Descrição

Portfolio pessoal desenvolvido para apresentar projetos, experiências profissionais e habilidades técnicas. O site utiliza HTML5, CSS3 e JavaScript vanilla, com foco em performance e experiência do usuário.

## Funcionalidades

- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Alternância de Tema**: Suporte para modo claro e escuro com persistência de preferência
- **Animações CSS**: Transições e efeitos visuais otimizados
- **Formulário de Contato**: Integração com Formspree para envio de mensagens
- **Otimização de Performance**: Carregamento lazy de imagens e código minificado
- **SEO Otimizado**: Meta tags e estrutura semântica para melhor indexação

## Tecnologias

### Frontend

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript (ES6+)
- Tailwind CSS (via CDN)

### Bibliotecas

- Font Awesome (ícones)
- Devicon (ícones de tecnologias)
- Typed.js (efeito de digitação)

### Deploy

- Vercel (hospedagem e CI/CD)

## Estrutura do Projeto

```text
ryan.dev/
├── index.html              # Página principal
├── skills.html             # Página de habilidades técnicas
├── experiences.html        # Experiências profissionais
├── projects.html           # Portfolio de projetos
├── education.html          # Formação acadêmica
├── src/
│   ├── css/               # Folhas de estilo
│   ├── js/                # Scripts JavaScript
│   ├── img/               # Imagens e assets
│   └── docs/              # Documentos (CV, etc)
└── manifest.json          # PWA manifest
```

## Instalação Local

Clone o repositório:

```bash
git clone https://github.com/Ryanditko/ryan.dev.git
cd ryan.dev
```

Abra o arquivo `index.html` em um navegador ou utilize um servidor local:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

Acesse `http://localhost:8000` no navegador.

## Deployment

O projeto está configurado para deploy automático na Vercel. Qualquer push na branch `main` dispara uma nova build.

### Deploy Manual

```bash
vercel --prod
```

## Contato

- **Website**: [ryandev-murex.vercel.app](https://ryandev-murex.vercel.app)
- **Email**: [yryurodriguess@gmail.com](mailto:yryurodriguess@gmail.com)
- **LinkedIn**: [Ryan Rodrigues](https://www.linkedin.com/in/ryan-rodrigues-592a27313)
- **GitHub**: [@Ryanditko](https://github.com/Ryanditko)

## Licença

© 2025 Ryan Rodrigues Cordeiro. Todos os direitos reservados.

