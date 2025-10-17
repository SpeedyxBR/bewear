"use server";

import { db } from "@/db";
import { orderTable, productTable, userTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";

export const getDashboardStats = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const [stats] = await db
    .select({
      totalUsers: sql<number>`count(${userTable.id})`,
      totalProducts: sql<number>`count(${productTable.id})`,
      totalOrders: sql<number>`count(${orderTable.id})`,
      totalRevenue: sql<number>`coalesce(sum(case when ${orderTable.status} = 'paid' then ${orderTable.totalPriceInCents} else 0 end), 0)`,
    })
    .from(userTable)
    .crossJoin(productTable)
    .crossJoin(orderTable);

  const recentOrders = await db.query.orderTable.findMany({
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    limit: 5,
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

  const topProducts = await db
    .select({
      productId: sql<string>`${productTable.id}`,
      productName: sql<string>`${productTable.name}`,
      totalSold: sql<number>`coalesce(sum(${orderTable.totalPriceInCents}), 0)`,
    })
    .from(productTable)
    .leftJoin(orderTable, eq(orderTable.userId, userTable.id))
    .groupBy(productTable.id, productTable.name)
    .orderBy(sql`total_sold desc`)
    .limit(5);

  return {
    stats,
    recentOrders,
    topProducts,
  };
};
