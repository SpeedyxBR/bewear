"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const deleteProductSchema = z.object({
  id: z.string().uuid(),
});

export const deleteProduct = async (
  data: z.infer<typeof deleteProductSchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const { id } = deleteProductSchema.parse(data);

  await db.delete(productTable).where(eq(productTable.id, id));

  revalidatePath("/admin/products");

  return { success: true };
};
