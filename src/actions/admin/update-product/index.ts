"use server";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  categoryId: z.string().uuid("Categoria inválida"),
  markId: z.string().uuid("Marca inválida").optional(),
});

export const updateProduct = async (
  data: z.infer<typeof updateProductSchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const validatedData = updateProductSchema.parse(data);

  const slug = validatedData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await db
    .update(productTable)
    .set({
      name: validatedData.name,
      slug,
      description: validatedData.description,
      categoryId: validatedData.categoryId,
      markId: validatedData.markId,
    })
    .where(eq(productTable.id, validatedData.id));

  revalidatePath("/admin/products");

  return { success: true };
};
