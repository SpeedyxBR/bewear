-- Adicionar enum para roles de usuário
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Adicionar coluna role na tabela user
ALTER TABLE "user" ADD COLUMN role user_role NOT NULL DEFAULT 'user';

-- Comentário para documentar a mudança
COMMENT ON COLUMN "user".role IS 'Role do usuário: user (padrão) ou admin';
