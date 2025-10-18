"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { auth } from "@/lib/auth";

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
