import { db } from ".";
import {
  categoryTable,
  productTable,
  productVariantTable,
  orderItemTable,
  orderTable,
  cartItemTable,
  cartTable,
  shippingAddressTable,
  accountTable,
  sessionTable,
  userTable,
} from "./schema";

async function reset() {
  console.log("🧹 Resetando o banco de dados...");

  try {
    // Limpar dados existentes na ordem correta (respeitando chaves estrangeiras)
    console.log("🗑️ Limpando dados existentes...");

    // 1. Primeiro as tabelas que dependem de outras
    await db.delete(orderItemTable);
    await db.delete(cartItemTable);

    // 2. Depois as tabelas intermediárias
    await db.delete(orderTable);
    await db.delete(cartTable);
    await db.delete(shippingAddressTable);

    // 3. Depois as tabelas de produtos
    await db.delete(productVariantTable);
    await db.delete(productTable);
    await db.delete(categoryTable);

    // 4. Por último as tabelas de autenticação
    await db.delete(accountTable);
    await db.delete(sessionTable);
    await db.delete(userTable);

    console.log("✅ Banco de dados resetado com sucesso!");
    console.log(
      "💡 Execute 'npm run db:seed' para popular com dados de exemplo",
    );
  } catch (error) {
    console.error("❌ Erro durante o reset:", error);
    throw error;
  }
}

reset().catch(console.error);
