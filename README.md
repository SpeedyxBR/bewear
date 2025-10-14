# Bewear - E-commerce de Moda

Bewear é uma plataforma de e-commerce moderna focada em moda e estilo, desenvolvida com Next.js 15, TypeScript e tecnologias de ponta.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** (App Router) - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **BetterAuth** - Sistema de autenticação
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM TypeScript-first
- **React Query** - Gerenciamento de estado do servidor
- **Stripe** - Processamento de pagamentos

## 📋 Funcionalidades

### 🛍️ E-commerce

- Catálogo de produtos com filtros avançados
- Carrinho de compras persistente
- Sistema de favoritos
- Checkout integrado com Stripe
- Histórico de pedidos

### 👤 Autenticação

- Login e registro de usuários
- Gerenciamento de sessões
- Proteção de rotas

### 📍 Endereços

- Cadastro de endereços de entrega
- Múltiplos endereços por usuário
- Validação de CEP

### 🎨 Interface

- Design responsivo e moderno
- Componentes reutilizáveis
- Animações suaves
- Carrossel de produtos e marcas

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta Stripe (para pagamentos)

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd bewear.v2
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

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

### 4. Configure o banco de dados

```bash
# Execute as migrações
npm run db:migrate

# Popule o banco com dados iniciais
npm run db:seed
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📁 Estrutura do Projeto

```
src/
├── actions/           # Server Actions
├── app/              # Páginas e rotas (App Router)
├── components/       # Componentes reutilizáveis
│   ├── common/      # Componentes comuns
│   └── ui/          # Componentes UI (shadcn/ui)
├── db/              # Configuração do banco de dados
├── hooks/           # Hooks customizados
│   ├── mutations/   # Hooks para mutations
│   └── queries/     # Hooks para queries
├── lib/             # Utilitários e configurações
└── providers/       # Providers do React
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Linting
npm run lint

# Banco de dados
npm run db:migrate    # Executar migrações
npm run db:seed       # Popular banco com dados
npm run db:studio     # Interface visual do banco
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🐛 Problemas Conhecidos e Soluções

### Logo não aparece na Vercel

**Problema**: O logo da Bewear não é exibido corretamente no deploy da Vercel.

**Solução**:

- Verifique se o arquivo `logo.svg` está na pasta `public/`
- Certifique-se de que o caminho `/logo.svg` está correto nos componentes
- Teste localmente antes do deploy

### Cards de patrocínio grudados

**Problema**: Os cards das marcas parceiras ficam muito próximos uns dos outros.

**Solução**:

- Ajuste o `spaceBetween` no componente `PartnerBrandsList`
- Aumente o padding interno dos cards no `PartnerBrandsItem`
- Teste em diferentes tamanhos de tela

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Padrões de Código

- Use TypeScript para todo o código
- Siga as convenções do ESLint configurado
- Use nomes descritivos para variáveis e funções
- Mantenha componentes pequenos e focados
- Use kebab-case para arquivos e pastas
- Escreva código em inglês, textos em português

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
