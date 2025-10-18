"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export const createCategory = async (
  data: z.infer<typeof createCategorySchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const { name } = createCategorySchema.parse(data);

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await db.insert(categoryTable).values({
    name,
    slug,
  });

  revalidatePath("/admin/categories");

  return { success: true };
};
