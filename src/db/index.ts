import "dotenv/config";

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

// Configuração mais robusta do banco
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn(
    "⚠️ DATABASE_URL não configurada. Aplicação funcionará sem banco de dados."
  );
}

export const db = drizzle(
  databaseUrl || "postgresql://fake:fake@localhost:5432/fake",
  {
    schema,
  }
);

// Função para verificar conexão
export async function testConnection() {
  try {
    if (databaseUrl) {
      await db.execute(sql`SELECT 1`);
      console.log("✅ Conexão com banco estabelecida");
      return true;
    } else {
      console.log("⚠️ Banco não configurado, usando modo offline");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao conectar com banco:", error);
    return false;
  }
}
