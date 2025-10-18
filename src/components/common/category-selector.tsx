import { Filter } from "lucide-react";
import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <Card className="rounded-3xl border-0 bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-lg min-sm:hidden">
      <div className="mb-4 flex items-center gap-2">
        <Filter size={20} className="text-purple-600" />
        <h3 className="font-semibold text-purple-800">Categorias</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="truncate rounded-full border border-white/50 bg-white/80 font-semibold text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md"
            asChild
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default CategorySelector;
