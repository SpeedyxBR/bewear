import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { PartnersList } from "@/components/common/partners-list";
import { ProductList } from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

// Força a página a ser dinâmica para evitar queries durante build
export const dynamic = "force-dynamic";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let products: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let categories: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentlyProducts: any[] = [];

  try {
    // Tenta buscar dados do banco, mas não falha se não conseguir
    products = await db.query.productTable.findMany({
      with: {
        variants: true,
      },
    });

    categories = await db.query.categoryTable.findMany({});

    recentlyProducts = await db.query.productTable.findMany({
      orderBy: [desc(productTable.createdAt)],
      with: {
        variants: true,
      },
    });
  } catch (error) {
    console.error("Erro ao carregar dados do banco:", error);
    // Se falhar, usa arrays vazios
    products = [];
    categories = [];
    recentlyProducts = [];
  }

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.svg"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="px-5">
          <div className="lg:col-span-3">
            <PartnersList />
          </div>
        </div>

        {products.length > 0 && (
          <ProductList products={products} title="Mais vendidos" />
        )}

        {categories.length > 0 && (
          <div className="px-5">
            <CategorySelector categories={categories} />
          </div>
        )}

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Seja autentico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {recentlyProducts.length > 0 && (
          <ProductList products={recentlyProducts} title="Novidades" />
        )}

        <Footer />
      </div>
    </>
  );
}
