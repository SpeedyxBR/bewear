import { getCategories } from "@/actions/get-categories";
import CategoriesTable from "./components/categories-table";
import CreateCategoryButton from "./components/create-category-button";

export default async function AdminCategoriesPage() {
  const result = await getCategories();
  const categories = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Categorias
          </h1>
          <p className="text-gray-600">
            Visualize e gerencie todas as categorias de produtos
          </p>
        </div>
        <CreateCategoryButton />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
