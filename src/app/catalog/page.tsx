import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";

import CatalogClient from "./components/catalog-client";

const CatalogPage = async () => {
  const marks = await db.query.markTable.findMany();
  const categories = await db.query.categoryTable.findMany();
  const products = await db.query.productTable.findMany({
    with: {
      mark: true,
      category: true,
      variants: true,
    },
  });

  return (
    <div className="mb-10">
      <Header />
      <CatalogClient
        marks={marks}
        categories={categories}
        products={products}
      />
    </div>
  );
};

export default CatalogPage;
