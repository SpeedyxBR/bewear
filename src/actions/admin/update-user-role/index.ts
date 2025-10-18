"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["user", "admin"]),
});

export const updateUserRole = async (
  data: z.infer<typeof updateUserRoleSchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const { userId, role } = updateUserRoleSchema.parse(data);

  await db.update(userTable).set({ role }).where(eq(userTable.id, userId));

  revalidatePath("/admin/users");

  return { success: true };
};
