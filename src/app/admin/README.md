# Painel Administrativo - Bewear E-commerce

## Visão Geral

O painel administrativo é um sistema completo para gerenciar todos os aspectos do e-commerce Bewear. Ele fornece uma interface moderna e intuitiva para administradores gerenciarem produtos, categorias, pedidos e usuários.

## Funcionalidades

### 🏠 Dashboard

- **Métricas em tempo real**: Total de usuários, produtos, pedidos e receita
- **Pedidos recentes**: Lista dos 5 pedidos mais recentes
- **Produtos mais vendidos**: Ranking dos produtos com maior faturamento

### 📦 Gestão de Produtos

- **Listar produtos**: Visualizar todos os produtos com informações detalhadas
- **Criar produto**: Adicionar novos produtos com múltiplas variantes
- **Editar produto**: Modificar informações de produtos existentes
- **Excluir produto**: Remover produtos do catálogo
- **Variantes**: Gerenciar cores, preços e imagens de cada produto

### 🏷️ Gestão de Categorias

- **Listar categorias**: Visualizar todas as categorias
- **Criar categoria**: Adicionar novas categorias
- **Editar categoria**: Modificar nomes e slugs
- **Excluir categoria**: Remover categorias (apenas se não tiver produtos)

### 🛒 Gestão de Pedidos

- **Listar pedidos**: Visualizar todos os pedidos com detalhes
- **Atualizar status**: Alterar status dos pedidos (Pendente, Pago, Cancelado)
- **Informações do cliente**: Dados completos do comprador
- **Histórico**: Acompanhar mudanças de status

### 👥 Gestão de Usuários

- **Listar usuários**: Visualizar todos os usuários cadastrados
- **Alterar roles**: Promover usuários a administradores
- **Status de verificação**: Verificar se emails foram confirmados
- **Informações de cadastro**: Data e detalhes de criação

## Segurança

### 🔐 Autenticação e Autorização

- **Middleware de proteção**: Todas as rotas `/admin/*` são protegidas
- **Verificação de role**: Apenas usuários com role "admin" podem acessar
- **Redirecionamento**: Usuários não autorizados são redirecionados

### 🛡️ Validações

- **Server Actions**: Todas as operações passam por validação no servidor
- **Zod Schemas**: Validação rigorosa de dados de entrada
- **Error Handling**: Tratamento adequado de erros e feedback ao usuário

## Estrutura de Arquivos

```
src/app/admin/
├── layout.tsx                    # Layout principal do admin
├── page.tsx                      # Dashboard principal
├── components/
│   ├── admin-sidebar.tsx         # Navegação lateral
│   ├── dashboard-stats.tsx       # Cards de métricas
│   ├── recent-orders.tsx         # Lista de pedidos recentes
│   └── top-products.tsx          # Ranking de produtos
├── products/
│   ├── page.tsx                  # Lista de produtos
│   └── components/
│       ├── create-product-button.tsx
│       ├── create-product-form.tsx
│       └── products-table.tsx
├── categories/
│   ├── page.tsx                  # Lista de categorias
│   └── components/
│       ├── create-category-button.tsx
│       ├── create-category-form.tsx
│       └── categories-table.tsx
├── orders/
│   ├── page.tsx                  # Lista de pedidos
│   └── components/
│       └── orders-table.tsx
└── users/
    ├── page.tsx                  # Lista de usuários
    └── components/
        └── users-table.tsx
```

## Server Actions

Todas as operações administrativas são realizadas através de Server Actions:

```
src/actions/admin/
├── get-dashboard-stats/          # Estatísticas do dashboard
├── get-all-orders/              # Buscar todos os pedidos
├── update-order-status/         # Atualizar status de pedido
├── get-all-users/               # Buscar todos os usuários
├── update-user-role/            # Alterar role de usuário
├── create-product/              # Criar produto
├── update-product/              # Atualizar produto
├── delete-product/              # Excluir produto
├── create-category/             # Criar categoria
├── update-category/             # Atualizar categoria
└── delete-category/             # Excluir categoria
```

## Como Usar

### 1. Criar Usuário Administrador

```bash
# Execute o script para promover um usuário a admin
npm run create-admin-user
```

### 2. Acessar o Painel

1. Faça login com uma conta de administrador
2. Clique em "Painel Admin" no menu do usuário
3. Navegue pelas diferentes seções usando a sidebar

### 3. Gerenciar Produtos

1. Vá para "Produtos" na sidebar
2. Clique em "Novo Produto" para criar
3. Preencha as informações e adicione variantes
4. Use as ações na tabela para editar/excluir

### 4. Gerenciar Pedidos

1. Acesse "Pedidos" na sidebar
2. Visualize todos os pedidos com detalhes
3. Use o dropdown de ações para alterar status
4. Monitore mudanças em tempo real

## Tecnologias Utilizadas

- **Next.js 15**: App Router para roteamento
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **shadcn/ui**: Componentes de interface
- **React Hook Form**: Formulários
- **Zod**: Validação de schemas
- **Drizzle ORM**: Operações de banco
- **Better Auth**: Autenticação
- **React Query**: Gerenciamento de estado

## Próximos Passos

- [ ] Relatórios avançados com gráficos
- [ ] Sistema de notificações
- [ ] Logs de auditoria
- [ ] Backup automático de dados
- [ ] Integração com APIs externas
- [ ] Sistema de cupons e promoções
