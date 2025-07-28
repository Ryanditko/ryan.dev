# 🚀 Deploy Manual na Vercel - Passo a Passo

## 📁 Arquivos para Upload

Você precisa fazer upload destes arquivos/pastas:

```
meu-portfolio/
├── index.html           ← Página principal
├── assets/              ← Pasta com CSS, JS e imagens
├── src/                 ← Imagens dos projetos
├── manifest.json        ← PWA (opcional)
└── vercel.json          ← Configuração (vazio)
```

## 🌐 Como fazer o deploy:

### 1️⃣ Acesse a Vercel
- Vá em [vercel.com](https://vercel.com)
- Faça login com sua conta

### 2️⃣ Novo Projeto
- Clique em **"New Project"**
- Escolha **"Upload Files"** (não GitHub)

### 3️⃣ Upload dos Arquivos
- Arraste e solte toda a pasta `my-portfolio`
- OU selecione todos os arquivos:
  - `index.html`
  - Pasta `assets/`
  - Pasta `src/`
  - `manifest.json`
  - `vercel.json`

### 4️⃣ Configurações
- **Project Name:** `ryan-portfolio` (ou qualquer nome)
- **Framework:** Deixe em "Other" ou "Static"
- **Root Directory:** `/` (pasta raiz)
- **Build Command:** Deixe vazio
- **Output Directory:** Deixe vazio

### 5️⃣ Deploy
- Clique em **"Deploy"**
- Aguarde alguns segundos
- **Pronto!** Seu site estará online

## ✅ Teste
Após o deploy, teste:
- Navegação entre seções
- Menu mobile
- Troca de tema (dark/light)
- Formulário de contato
- Links dos projetos

## 🔄 Atualizações Futuras
Para atualizar o site:
1. Modifique os arquivos localmente
2. Acesse o dashboard da Vercel
3. Vá em "Deployments"
4. Clique em "Upload Files" novamente
5. Faça novo upload

---

**Dica:** O arquivo `vercel.json` está vazio propositalmente para evitar conflitos.
