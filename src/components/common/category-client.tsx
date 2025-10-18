"use client";

import { useMemo,useState } from "react";

import { Separator } from "@/components/ui/separator";

import CategoryFilters from "./category-filters";
import CategorySorting from "./category-sorting";
import ProductItem from "./product-item";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  categoryId: string;
  markId: string | null;
  mark: {
    id: string;
    name: string;
    createdAt: Date;
    imageUrl: string;
  } | null;
  variants: Array<{
    id: string;
    name: string;
    createdAt: Date;
    slug: string;
    imageUrl: string;
    productId: string;
    color: string;
    priceInCents: number;
  }>;
}

interface CategoryClientProps {
  products: Product[];
  categoryName: string;
}

const CategoryClient = ({ products, categoryName }: CategoryClientProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  const handleFilteredProducts = (products: Product[]) => {
    setFilteredProducts(products);
    setSortedProducts(products);
  };

  const handleSortedProducts = (products: Product[]) => {
    setSortedProducts(products);
  };

  const finalProducts = useMemo(() => {
    return sortedProducts;
  }, [sortedProducts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold min-sm:text-xl min-lg:text-2xl">
          {categoryName}
        </h3>
        <div className="h-[1px] w-full bg-[#00000013]"></div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <CategorySorting
              products={filteredProducts}
              onSortedProducts={handleSortedProducts}
            />
          </div>
          <div className="lg:hidden">
            <CategoryFilters
              products={filteredProducts}
              onFilteredProducts={handleSortedProducts}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex gap-6">
        <div className="hidden lg:block">
          <CategoryFilters
            products={products}
            onFilteredProducts={handleFilteredProducts}
          />
        </div>

        <div className="flex-1">
          <div className="text-muted-foreground mb-4 text-sm">
            Exibindo {finalProducts.length} de {products.length} produtos
          </div>

          {finalProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 min-sm:grid-cols-3 min-lg:grid-cols-4">
              {finalProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  textContainerClassName="max-w-full"
                  showFavoriteActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-muted-foreground mb-2">
                Nenhum produto encontrado
              </div>
              <div className="text-muted-foreground text-sm">
                Tente ajustar os filtros ou termos de busca
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryClient;
