# 🛍️ BeWear Bootcamp

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-18.4.0-635BFF?style=for-the-badge&logo=stripe)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.2.12-green?style=for-the-badge)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.44.2-orange?style=for-the-badge)

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

- **Catálogo de Produtos**: Visualização organizada por categorias com sistema de variantes
- **Sistema de Variantes**: Produtos com diferentes cores, preços e imagens
- **Carrinho de Compras**: Adicionar, remover, aumentar/diminuir quantidade de produtos
- **Busca Avançada**: Pesquisa inteligente por nome, descrição e categoria
- **Filtros por Categoria**: Navegação intuitiva com seletores de categoria
- **Seleção de Variantes**: Interface para escolha de cor e variante do produto
- **Cálculo de Preços**: Sistema automático de cálculo de totais e subtotais

### 💳 **Pagamentos e Checkout**

- **Integração Stripe**: Pagamentos seguros e confiáveis com webhooks
- **Checkout em 3 Etapas**: Identificação → Endereço → Confirmação
- **Gestão de Endereços**: Múltiplos endereços de entrega salvos
- **Confirmação de Pedidos**: Sistema robusto de confirmação e finalização
- **Histórico de Pedidos**: Acompanhamento completo de compras realizadas

### 👤 **Autenticação e Usuários**

- **Sistema de Login/Registro**: Autenticação segura com Better Auth
- **Login Social**: Integração com Google OAuth
- **Sessões Persistentes**: Sistema de sessões com tokens seguros
- **Perfil do Usuário**: Gestão completa de dados pessoais
- **Endereços Salvos**: CRUD completo de endereços de entrega
- **Histórico de Pedidos**: Visualização detalhada de pedidos realizados

### 🎨 **Interface e UX**

- **Design Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- **Componentes Modernos**: Interface baseada em Radix UI e Tailwind CSS
- **Animações Suaves**: Transições e micro-interações com Framer Motion
- **Componentes Reutilizáveis**: UI consistente e moderna
- **Carrossel de Produtos**: Exibição dinâmica de produtos em destaque
- **Modal de Busca**: Interface de busca rápida e intuitiva
- **Sheet de Carrinho**: Carrinho lateral deslizante para melhor UX

---

## 🛠️ Tecnologias

### **Frontend**

- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca de interface de usuário
- **TypeScript 5.0** - Tipagem estática
- **Tailwind CSS 3.4.0** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis (Dialog, Tabs, Accordion, etc.)
- **Lucide React** - Ícones modernos
- **Embla Carousel** - Carrossel de produtos
- **Next Themes** - Gerenciamento de temas

### **Backend & Banco de Dados**

- **Drizzle ORM 0.44.2** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Better Auth 1.2.12** - Autenticação moderna com OAuth
- **Server Actions** - API routes do Next.js
- **Drizzle Kit** - Ferramentas de migração e studio

### **Pagamentos & Integrações**

- **Stripe 18.4.0** - Processamento de pagamentos
- **Stripe Webhooks** - Sincronização de eventos
- **@stripe/stripe-js** - SDK cliente do Stripe

### **Gerenciamento de Estado**

- **TanStack React Query 5.83.0** - Gerenciamento de estado servidor
- **React Hook Form 7.62.0** - Formulários performáticos
- **Zod 4.0.14** - Validação de schemas
- **@hookform/resolvers** - Integração Hook Form + Zod

### **UI/UX**

- **Class Variance Authority** - Gerenciamento de variantes CSS
- **clsx** - Utilitário para classes condicionais
- **tailwind-merge** - Merge inteligente de classes Tailwind
- **Sonner** - Sistema de notificações toast
- **React Number Format** - Formatação de números e valores monetários

### **Desenvolvimento**

- **ESLint 9** - Linting de código
- **Prettier 3.6.2** - Formatação de código
- **tsx** - Executor TypeScript
- **Autoprefixer** - Prefixos CSS automáticos

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
   AUTH_SECRET="seu-secret-super-seguro"
   BETTER_AUTH_URL="http://localhost:3000"

   # Google OAuth (opcional)
   GOOGLE_CLIENT_ID="seu-google-client-id"
   GOOGLE_CLIENT_SECRET="seu-google-client-secret"
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
│   │   ├── 📁 api/               # API Routes (auth, stripe webhook)
│   │   ├── 📁 authentication/    # Páginas de login/registro
│   │   ├── 📁 cart/              # Páginas do carrinho e checkout
│   │   │   ├── 📁 confirmation/  # Confirmação de pedidos
│   │   │   └── 📁 identification/ # Identificação e endereços
│   │   ├── 📁 category/          # Páginas de categorias
│   │   ├── 📁 checkout/          # Processo de checkout
│   │   ├── 📁 my-orders/         # Histórico de pedidos
│   │   └── 📁 product-variant/   # Páginas de produtos
│   ├── 📁 actions/               # Server Actions
│   │   ├── 📁 add-cart-product/  # Adicionar ao carrinho
│   │   ├── 📁 create-checkout-session/ # Criar sessão Stripe
│   │   ├── 📁 search-products/   # Busca de produtos
│   │   └── ...                   # Outras actions
│   ├── 📁 components/            # Componentes React
│   │   ├── 📁 common/           # Componentes compartilhados
│   │   │   ├── auth-dialog.tsx   # Modal de autenticação
│   │   │   ├── cart.tsx          # Componente do carrinho
│   │   │   ├── search-modal.tsx  # Modal de busca
│   │   │   └── ...               # Outros componentes
│   │   └── 📁 ui/               # Componentes de UI base (Radix)
│   ├── 📁 db/                   # Configuração do banco
│   │   ├── index.ts             # Conexão com banco
│   │   ├── schema.ts            # Schemas Drizzle
│   │   ├── seed.ts              # Dados de exemplo
│   │   └── reset.ts             # Reset do banco
│   ├── 📁 hooks/                # Custom hooks
│   │   ├── 📁 mutations/        # Hooks de mutação
│   │   ├── 📁 queries/          # Hooks de consulta
│   │   └── use-cart-sheet.tsx   # Hook do carrinho
│   ├── 📁 lib/                  # Utilitários e configurações
│   │   ├── auth.ts              # Configuração Better Auth
│   │   ├── auth-client.ts       # Cliente de autenticação
│   │   └── utils.ts             # Utilitários gerais
│   ├── 📁 providers/            # Context providers
│   └── 📁 helpers/              # Funções auxiliares
├── 📁 drizzle/                  # Migrações e schemas do banco
│   ├── 📁 meta/                 # Metadados das migrações
│   ├── schema.ts                # Schema principal
│   └── relations.ts             # Relações entre tabelas
├── 📁 public/                   # Assets estáticos
│   ├── 📁 rules/                # Regras do projeto
│   └── *.png, *.svg             # Imagens e ícones
├── 📄 package.json
├── 📄 tailwind.config.js
├── 📄 drizzle.config.ts
└── 📄 tsconfig.json
```

---

## 🗄️ Banco de Dados

### **Estrutura das Tabelas**

O projeto utiliza um schema bem estruturado com as seguintes entidades principais:

- **`user`** - Usuários do sistema
- **`category`** - Categorias de produtos
- **`product`** - Produtos do catálogo
- **`product_variant`** - Variantes de produtos (cores, preços)
- **`cart`** - Carrinhos de compra
- **`cart_item`** - Itens no carrinho
- **`shipping_address`** - Endereços de entrega
- **`order`** - Pedidos realizados
- **`order_item`** - Itens dos pedidos
- **`session`** - Sessões de usuário
- **`account`** - Contas vinculadas (OAuth)
- **`verification`** - Tokens de verificação

### **Relacionamentos**

- **Produtos** → **Categorias** (1:N)
- **Produtos** → **Variantes** (1:N)
- **Usuários** → **Carrinhos** (1:N)
- **Carrinhos** → **Itens** (1:N)
- **Usuários** → **Endereços** (1:N)
- **Usuários** → **Pedidos** (1:N)
- **Pedidos** → **Itens** (1:N)

### **Funcionalidades do Banco**

- **Migrações Automáticas** com Drizzle Kit
- **Studio Visual** para gerenciamento
- **Seeds** para dados de exemplo
- **Reset** completo do banco
- **Relacionamentos** bem definidos com foreign keys

---

## 🎨 Demonstração

### 🏠 **Página Inicial**

- **Banner Responsivo** com imagens otimizadas para mobile e desktop
- **Carrossel de Marcas** com logos das principais marcas
- **Produtos em Destaque** com carrossel interativo
- **Seletor de Categorias** para navegação rápida
- **Lista de Novos Produtos** organizados por data de criação
- **Showcase** com produtos especiais

### 🛍️ **Carrinho de Compras**

- **Sheet Lateral** deslizante para melhor UX
- **Adicionar/Remover** produtos com controles intuitivos
- **Seleção de Variantes** (cor, preço) com interface visual
- **Cálculo Automático** de totais e subtotais
- **Persistência** de dados entre sessões
- **Controle de Quantidade** com botões +/-

### 💳 **Checkout em 3 Etapas**

1. **Identificação** - Login/Registro ou continuar como visitante
2. **Endereço** - Seleção ou criação de endereço de entrega
3. **Confirmação** - Revisão final e pagamento via Stripe

### 🔍 **Sistema de Busca**

- **Modal de Busca** com interface moderna
- **Busca Inteligente** por nome, descrição e categoria
- **Resultados Instantâneos** com preview dos produtos
- **Filtros Avançados** por categoria e preço

### 👤 **Área do Usuário**

- **Autenticação** com email/senha e Google OAuth
- **Gestão de Endereços** com CRUD completo
- **Histórico de Pedidos** com detalhes completos
- **Sessões Persistentes** com tokens seguros

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

## 🔧 Funcionalidades de Desenvolvimento

### **Server Actions**

O projeto utiliza extensivamente Server Actions do Next.js para operações do servidor:

- **`add-cart-product`** - Adicionar produtos ao carrinho
- **`create-checkout-session`** - Criar sessão de pagamento Stripe
- **`create-shipping-address`** - Criar endereços de entrega
- **`search-products`** - Busca de produtos com filtros
- **`get-cart`** - Recuperar carrinho do usuário
- **`finish-order`** - Finalizar pedido

### **Custom Hooks**

Hooks personalizados para gerenciamento de estado:

- **`use-cart.ts`** - Gerenciamento do carrinho
- **`use-search-products.ts`** - Busca de produtos
- **`use-user-addresses.ts`** - Endereços do usuário
- **`use-cart-sheet.tsx`** - Controle do sheet do carrinho

### **Validação e Schemas**

- **Zod** para validação de schemas
- **React Hook Form** para formulários performáticos
- **Validação Server-side** em todas as actions
- **Tipagem TypeScript** completa

### **Gerenciamento de Estado**

- **TanStack React Query** para cache e sincronização
- **Mutations** para operações de escrita
- **Queries** para operações de leitura
- **Otimistic Updates** para melhor UX

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
