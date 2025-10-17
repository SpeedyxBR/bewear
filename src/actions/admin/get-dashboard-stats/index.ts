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

  // Buscar estatísticas separadamente para evitar cross joins problemáticos
  const [totalUsersResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userTable);
  const [totalProductsResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(productTable);
  const [totalOrdersResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(orderTable);
  const [totalRevenueResult] = await db
    .select({
      total: sql<number>`coalesce(sum(case when ${orderTable.status} = 'paid' then ${orderTable.totalPriceInCents} else 0 end), 0)`,
    })
    .from(orderTable);

  const stats = {
    totalUsers: totalUsersResult.count,
    totalProducts: totalProductsResult.count,
    totalOrders: totalOrdersResult.count,
    totalRevenue: totalRevenueResult.total,
  };

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

  // Para simplificar, vamos pegar os 5 produtos mais recentes
  const topProducts = await db.query.productTable.findMany({
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    limit: 5,
    with: {
      variants: true,
    },
  });

  return {
    stats,
    recentOrders,
    topProducts,
  };
};
