import { db } from "@/db";
import { Header } from "./header";

export const HeaderWrapper = async () => {
  const categories = await db.query.categoryTable.findMany({});
  const products = await db.query.productTable.findMany({});

  return <Header categories={categories} products={products} />;
};
