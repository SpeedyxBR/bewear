import { db } from "@/db";
import { eq } from "drizzle-orm";
import { categoryTable, productTable } from "@/db/schema";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import CategoryClient from "@/components/common/category-client";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
      mark: true,
    },
  });
  if (!products) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="mt-5 space-y-6 px-5 min-sm:px-10">
        <Suspense fallback={<Loading />}>
          <CategoryClient products={products} categoryName={category.name} />
        </Suspense>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
