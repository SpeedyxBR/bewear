import { getProducts } from "@/actions/get-products";
import { getCategories } from "@/actions/get-categories";
import { getMarks } from "@/actions/get-marks";
import ProductsTable from "./components/products-table";
import CreateProductButton from "./components/create-product-button";

export default async function AdminProductsPage() {
  const [products, categories, marks] = await Promise.all([
    getProducts(),
    getCategories(),
    getMarks(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Produtos
          </h1>
          <p className="text-gray-600">
            Visualize e gerencie todos os produtos do catálogo
          </p>
        </div>
        <CreateProductButton categories={categories} marks={marks} />
      </div>

      <ProductsTable
        products={products}
        categories={categories}
        marks={marks}
      />
    </div>
  );
}
