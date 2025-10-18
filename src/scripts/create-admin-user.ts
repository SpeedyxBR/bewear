import { eq } from "drizzle-orm";

import { db } from "@/db";
import { userTable } from "@/db/schema";

async function createAdminUser() {
  console.log("🔐 Criando usuário administrador...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@bewear.com";
  const adminName = process.env.ADMIN_NAME || "Administrador";

  try {
    const existingAdmin = await db.query.userTable.findFirst({
      where: eq(userTable.email, adminEmail),
    });

    if (existingAdmin) {
      if (existingAdmin.role === "admin") {
        console.log("✅ Usuário administrador já existe!");
        return;
      } else {
        await db
          .update(userTable)
          .set({ role: "admin" })
          .where(eq(userTable.id, existingAdmin.id));
        console.log("✅ Usuário promovido a administrador!");
        return;
      }
    }

    console.log(
      "❌ Usuário não encontrado. Você precisa criar uma conta primeiro.",
    );
    console.log("📝 Instruções:");
    console.log("1. Acesse o site e crie uma conta com o email:", adminEmail);
    console.log("2. Execute este script novamente");
  } catch (error) {
    console.error("❌ Erro ao criar usuário administrador:", error);
  }
}

createAdminUser();
