# 🛍️ Bewear - E-commerce de Moda Moderno

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

Bewear é uma plataforma de e-commerce moderna e elegante, desenvolvida com tecnologias de ponta para oferecer a melhor experiência de compra em moda e estilo.

## 🚀 Tecnologias Utilizadas

### **Frontend**

- **Next.js 15** (App Router) - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes UI moderna
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Query** - Gerenciamento de estado do servidor

### **Backend & Database**

- **BetterAuth** - Sistema de autenticação moderno
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM TypeScript-first
- **Stripe** - Processamento de pagamentos

### **Ferramentas de Desenvolvimento**

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Drizzle Kit** - Ferramentas de migração e studio

## 📋 Funcionalidades Principais

### 🛒 **E-commerce Completo**

- **Catálogo de Produtos**: Sistema completo com filtros avançados
- **Carrinho de Compras**: Persistente e responsivo
- **Sistema de Favoritos**: Lista de produtos favoritos
- **Checkout Integrado**: Processamento seguro com Stripe
- **Histórico de Pedidos**: Acompanhamento completo

### 🔍 **Sistema de Filtros Avançado**

- **Filtro por Preço**: Slider interativo com faixa personalizável
- **Filtro por Marcas**: Checkboxes para Nike, Adidas, Puma, etc.
- **Filtro por Cores**: Botões interativos para todas as cores disponíveis
- **Ordenação Inteligente**: Padrão, Nome A-Z/Z-A, Preço, Mais Recentes
- **Filtros Ativos**: Badges com remoção individual
- **Layout Responsivo**: Sidebar desktop e sheet mobile

### 👤 **Autenticação & Usuários**

- **Login e Registro**: Sistema completo de autenticação
- **Gerenciamento de Sessões**: Controle seguro de acesso
- **Proteção de Rotas**: Middleware de autenticação

### 📍 **Gestão de Endereços**

- **Múltiplos Endereços**: Cadastro de vários endereços por usuário
- **Validação de CEP**: Integração com API de CEP
- **Endereços de Entrega**: Seleção flexível para pedidos

### 🎨 **Interface Moderna**

- **Design Responsivo**: Adaptável a todos os dispositivos
- **Componentes Reutilizáveis**: Arquitetura modular
- **Animações Suaves**: Transições elegantes
- **Carrossel de Produtos**: Swiper.js para navegação fluida

## 🛠️ Instalação e Configuração

### **Pré-requisitos**

- Node.js 18+
- PostgreSQL 14+
- Conta Stripe (para pagamentos)

### **1. Clone o Repositório**

```bash
git clone <url-do-repositorio>
cd bewear.v2
```

### **2. Instale as Dependências**

```bash
npm install
```

### **3. Configure as Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bewear"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# BetterAuth
BETTER_AUTH_SECRET="seu-secret-aqui"
BETTER_AUTH_URL="http://localhost:3000"
```

### **4. Configure o Banco de Dados**

```bash
# Execute as migrações
npx drizzle-kit migrate

# Popule o banco com dados iniciais
npx tsx --env-file=.env src/db/seed.ts
```

### **5. Execute o Projeto**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📁 Arquitetura do Projeto

```
src/
├── actions/              # Server Actions
│   ├── add-cart-product/
│   ├── get-categories/
│   └── ...
├── app/                  # Páginas e rotas (App Router)
│   ├── category/[slug]/  # Páginas de categoria com filtros
│   ├── catalog/          # Catálogo completo
│   ├── cart/             # Carrinho e checkout
│   └── ...
├── components/           # Componentes reutilizáveis
│   ├── common/           # Componentes comuns
│   │   ├── category-filters.tsx    # Sistema de filtros
│   │   ├── category-sorting.tsx    # Ordenação de produtos
│   │   ├── product-item.tsx        # Item de produto
│   │   └── ...
│   └── ui/               # Componentes UI (shadcn/ui)
├── db/                   # Configuração do banco de dados
│   ├── index.ts          # Conexão com banco
│   ├── schema.ts          # Esquemas das tabelas
│   └── seed.ts           # Dados iniciais
├── hooks/                 # Hooks customizados
│   ├── mutations/         # Hooks para mutations
│   └── queries/           # Hooks para queries
├── lib/                   # Utilitários e configurações
└── providers/             # Providers do React
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build            # Build para produção
npm start                # Inicia em produção

# Qualidade de Código
npm run lint             # Executa ESLint

# Banco de Dados
npx drizzle-kit migrate  # Executa migrações
npx drizzle-kit studio   # Interface visual do banco
npx tsx src/db/seed.ts   # Popula banco com dados
```

## 🎯 Sistema de Filtros Detalhado

### **Componentes Principais**

#### **CategoryFilters**

- **Filtro de Preço**: Slider com faixa personalizável (min/max)
- **Filtro de Marcas**: Checkboxes para seleção múltipla
- **Filtro de Cores**: Botões pill interativos
- **Filtros Ativos**: Badges com remoção individual
- **Responsivo**: Sidebar desktop + Sheet mobile

#### **CategorySorting**

- **Padrão**: Ordem original dos produtos
- **Nome A-Z**: Ordenação alfabética crescente
- **Nome Z-A**: Ordenação alfabética decrescente
- **Menor Preço**: Ordenação por preço crescente
- **Maior Preço**: Ordenação por preço decrescente
- **Mais Recentes**: Ordenação por data de criação

#### **CategoryClient**

- **Gerenciador Principal**: Coordena filtros e ordenação
- **Layout Responsivo**: Adaptação automática
- **Contadores**: Produtos encontrados e exibidos
- **Estado Vazio**: Mensagem quando não há resultados

### **URLs das Categorias**

- **Acessórios**: `http://localhost:3000/category/acessrios`
- **Bermuda & Shorts**: `http://localhost:3000/category/bermuda-shorts`
- **Calças**: `http://localhost:3000/category/calas`
- **Camisetas**: `http://localhost:3000/category/camisetas`
- **Blusas**: `http://localhost:3000/category/blusas`
- **Tênis**: `http://localhost:3000/category/tnis`

## 🚀 Deploy

### **Vercel (Recomendado)**

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### **Outras Plataformas**

O projeto é compatível com qualquer plataforma que suporte Next.js:

- **Netlify**: Deploy automático
- **Railway**: Deploy com banco PostgreSQL
- **DigitalOcean App Platform**: Deploy escalável

## 🐛 Problemas Conhecidos e Soluções

### **Logo não aparece na Vercel**

**Problema**: O logo da Bewear não é exibido corretamente no deploy.

**Solução**:

- Verifique se o arquivo `logo.svg` está na pasta `public/`
- Certifique-se de que o caminho `/logo.svg` está correto nos componentes
- Teste localmente antes do deploy

### **Cards de patrocínio grudados**

**Problema**: Os cards das marcas parceiras ficam muito próximos uns dos outros.

**Solução**:

- Ajuste o `spaceBetween` no componente `PartnerBrandsList`
- Aumente o padding interno dos cards no `PartnerBrandsItem`
- Teste em diferentes tamanhos de tela

### **Erro de setState durante render**

**Problema**: Erro ao usar filtros em categorias.

**Solução**:

- Use `useEffect` em vez de `useMemo` para chamadas de callback
- Evite chamadas de setState durante o render

## 🤝 Contribuição

### **Como Contribuir**

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **Padrões de Código**

- Use TypeScript para todo o código
- Siga as convenções do ESLint configurado
- Use nomes descritivos para variáveis e funções
- Mantenha componentes pequenos e focados
- Use kebab-case para arquivos e pastas
- Escreva código em inglês, textos em português

### **Estrutura de Commits**

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona testes
chore: tarefas de manutenção
```

## 📊 Performance

### **Métricas de Build**

- **First Load JS**: ~99.7 kB (shared)
- **Páginas Estáticas**: 15 páginas
- **Tempo de Build**: ~5-12 segundos
- **Bundle Size**: Otimizado com Next.js 15

### **Otimizações Implementadas**

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Carregamento sob demanda
- **Static Generation**: Páginas pré-renderizadas
- **React Query**: Cache inteligente de dados

## 🔒 Segurança

### **Medidas Implementadas**

- **BetterAuth**: Autenticação segura
- **Stripe**: Processamento seguro de pagamentos
- **Validação**: Zod schemas para validação
- **HTTPS**: Certificados SSL em produção
- **CORS**: Configuração adequada de CORS

## 📞 Suporte

### **Documentação Adicional**

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [BetterAuth](https://www.better-auth.com/)

### **Contato**

Para dúvidas ou problemas:

- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento
- Consulte a documentação técnica

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe Bewear</p>
  <p>© 2024 Bewear. Todos os direitos reservados.</p>
</div>
