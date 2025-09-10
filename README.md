# 🛍️ BeWear Bootcamp

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-18.4.0-635BFF?style=for-the-badge&logo=stripe)

**Uma plataforma de e-commerce moderna e completa para roupas e acessórios**

[🚀 Demo](#-demo) • [📋 Funcionalidades](#-funcionalidades) • [🛠️ Tecnologias](#️-tecnologias) • [⚡ Início Rápido](#-início-rápido) • [📁 Estrutura](#-estrutura)

</div>

---

## 📖 Sobre o Projeto

O **BeWear Bootcamp** é uma aplicação de e-commerce completa desenvolvida com as mais modernas tecnologias web. A plataforma oferece uma experiência de compra fluida e intuitiva, com funcionalidades avançadas como carrinho de compras, sistema de pagamento integrado, autenticação de usuários e muito mais.

### 🎯 Objetivo

Criar uma solução de e-commerce robusta e escalável que demonstra as melhores práticas de desenvolvimento web moderno, utilizando Next.js 15, React 19 e uma stack tecnológica de ponta.

---

## ✨ Funcionalidades

### 🛒 **E-commerce Completo**

- **Catálogo de Produtos**: Visualização organizada por categorias
- **Sistema de Variantes**: Produtos com diferentes cores e preços
- **Carrinho de Compras**: Adicionar, remover e gerenciar produtos
- **Busca Avançada**: Pesquisa inteligente de produtos
- **Filtros por Categoria**: Navegação intuitiva

### 💳 **Pagamentos e Checkout**

- **Integração Stripe**: Pagamentos seguros e confiáveis
- **Checkout Completo**: Processo de compra otimizado
- **Gestão de Endereços**: Múltiplos endereços de entrega
- **Confirmação de Pedidos**: Sistema de confirmação robusto

### 👤 **Autenticação e Usuários**

- **Sistema de Login/Registro**: Autenticação segura com Better Auth
- **Perfil do Usuário**: Gestão de dados pessoais
- **Histórico de Pedidos**: Acompanhamento de compras
- **Endereços Salvos**: Gestão de endereços de entrega

### 🎨 **Interface e UX**

- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Tema Escuro/Claro**: Alternância de temas
- **Animações Suaves**: Transições e micro-interações
- **Componentes Reutilizáveis**: UI consistente e moderna

---

## 🛠️ Tecnologias

### **Frontend**

- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca de interface de usuário
- **TypeScript 5.0** - Tipagem estática
- **Tailwind CSS 3.4.0** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

### **Backend & Banco de Dados**

- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Better Auth** - Autenticação moderna
- **Server Actions** - API routes do Next.js

### **Pagamentos & Integrações**

- **Stripe** - Processamento de pagamentos
- **Webhooks** - Sincronização de eventos

### **Desenvolvimento**

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **React Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários performáticos

---

## ⚡ Início Rápido

### 📋 Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn** ou **pnpm**
- **PostgreSQL** (local ou remoto)

### 🚀 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/bewear-bootcamp.git
   cd bewear-bootcamp
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Preencha as variáveis necessárias:

   ```env
   # Banco de Dados
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/bewear"

   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # Better Auth
   BETTER_AUTH_SECRET="seu-secret-super-seguro"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

4. **Configure o banco de dados**

   ```bash
   # Gerar migrações
   npm run db:generate

   # Executar migrações
   npm run db:migrate

   # Popular com dados de exemplo
   npm run db:seed
   ```

5. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

---

## 📁 Estrutura do Projeto

```
bewear-bootcamp/
├── 📁 src/
│   ├── 📁 app/                    # App Router do Next.js
│   │   ├── 📁 api/               # API Routes
│   │   ├── 📁 authentication/    # Páginas de autenticação
│   │   ├── 📁 cart/              # Páginas do carrinho
│   │   ├── 📁 category/          # Páginas de categorias
│   │   ├── 📁 checkout/          # Páginas de checkout
│   │   └── 📁 my-orders/         # Páginas de pedidos
│   ├── 📁 components/            # Componentes React
│   │   ├── 📁 common/           # Componentes compartilhados
│   │   └── 📁 ui/               # Componentes de UI base
│   ├── 📁 db/                   # Configuração do banco
│   ├── 📁 hooks/                # Custom hooks
│   ├── 📁 lib/                  # Utilitários e configurações
│   └── 📁 providers/            # Context providers
├── 📁 drizzle/                  # Migrações do banco
├── 📄 package.json
├── 📄 tailwind.config.js
└── 📄 tsconfig.json
```

---

## 🎨 Demonstração

### 🏠 **Página Inicial**

- Showcase de produtos em destaque
- Carrossel de categorias
- Lista de produtos organizados
- Navegação intuitiva

### 🛍️ **Carrinho de Compras**

- Adicionar/remover produtos
- Seleção de variantes (cor, tamanho)
- Cálculo automático de totais
- Persistência de dados

### 💳 **Checkout**

- Processo de compra otimizado
- Integração com Stripe
- Gestão de endereços
- Confirmação de pedidos

---

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run build:vercel # Build otimizado para Vercel

# Banco de Dados
npm run db:generate  # Gera migrações
npm run db:migrate   # Executa migrações
npm run db:studio    # Interface visual do banco
npm run db:seed      # Popula banco com dados
npm run db:reset     # Reseta banco de dados

# Qualidade de Código
npm run lint         # Executa ESLint
```

---

## 🔧 Configuração Avançada

### **Banco de Dados**

O projeto utiliza Drizzle ORM com PostgreSQL. Para configurar:

1. Instale PostgreSQL
2. Crie um banco de dados
3. Configure a `DATABASE_URL` no `.env.local`
4. Execute as migrações

### **Stripe**

Para configurar pagamentos:

1. Crie uma conta no Stripe
2. Obtenha as chaves de API
3. Configure os webhooks
4. Adicione as variáveis no `.env.local`

### **Deploy**

O projeto está otimizado para deploy na Vercel:

1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Andrel** - [@seu-github](https://github.com/seu-github)

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Stripe](https://stripe.com/) - Pagamentos
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Drizzle](https://orm.drizzle.team/) - ORM TypeScript

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela! ⭐**

[🔝 Voltar ao topo](#-bewear-bootcamp)

</div>
