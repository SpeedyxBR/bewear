"use server";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

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
