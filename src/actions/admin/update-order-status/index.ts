"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(["pending", "paid", "canceled"]),
});

export const updateOrderStatus = async (
  data: z.infer<typeof updateOrderStatusSchema>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const { orderId, status } = updateOrderStatusSchema.parse(data);

  await db.update(orderTable).set({ status }).where(eq(orderTable.id, orderId));

  revalidatePath("/admin/orders");

  return { success: true };
};
