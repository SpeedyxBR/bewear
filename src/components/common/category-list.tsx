import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

type Category = typeof categoryTable.$inferSelect;

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="mt-2 mb-8 hidden h-auto w-full items-center justify-center px-10 min-sm:flex">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 bg-white/80 text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
            asChild
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
