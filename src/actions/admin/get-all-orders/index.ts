"use server";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getAllOrders = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const orders = await db.query.orderTable.findMany({
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    with: {
      user: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return orders;
};
