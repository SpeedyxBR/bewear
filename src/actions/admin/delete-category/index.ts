"use server";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

const deleteCategorySchema = z.object({
  id: z.string().uuid(),
});

export const deleteCategory = async (
  data: z.infer<typeof deleteCategorySchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const { id } = deleteCategorySchema.parse(data);

  await db.delete(categoryTable).where(eq(categoryTable.id, id));

  revalidatePath("/admin/categories");

  return { success: true };
};
