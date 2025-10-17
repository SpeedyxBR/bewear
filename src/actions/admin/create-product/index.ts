"use server";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  categoryId: z.string().uuid("Categoria inválida"),
  markId: z.string().uuid("Marca inválida").optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, "Nome da variante é obrigatório"),
        color: z.string().min(1, "Cor é obrigatória"),
        priceInCents: z.number().min(1, "Preço deve ser maior que zero"),
        imageUrl: z.string().url("URL da imagem inválida"),
      }),
    )
    .min(1, "Pelo menos uma variante é obrigatória"),
});

export const createProduct = async (
  data: z.infer<typeof createProductSchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const validatedData = createProductSchema.parse(data);

  const slug = validatedData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const [product] = await db
    .insert(productTable)
    .values({
      name: validatedData.name,
      slug,
      description: validatedData.description,
      categoryId: validatedData.categoryId,
      markId: validatedData.markId,
    })
    .returning();

  for (const variant of validatedData.variants) {
    const variantSlug = `${slug}-${variant.color}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await db.insert(productVariantTable).values({
      name: variant.name,
      slug: variantSlug,
      color: variant.color,
      priceInCents: variant.priceInCents,
      imageUrl: variant.imageUrl,
      productId: product.id,
    });
  }

  revalidatePath("/admin/products");

  return { success: true, productId: product.id };
};
