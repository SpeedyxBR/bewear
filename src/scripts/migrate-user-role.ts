import { db } from "@/db";
import { sql } from "drizzle-orm";

async function migrateUserRole() {
  console.log("🔄 Executando migração para adicionar coluna 'role'...");

  try {
    // Adicionar o enum user_role
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('user', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Adicionar a coluna role se não existir
    await db.execute(sql`
      ALTER TABLE "user" 
      ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';
    `);

    console.log("✅ Migração concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro na migração:", error);
  }
}

migrateUserRole();
