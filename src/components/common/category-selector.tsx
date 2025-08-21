"use client";

import Link from "next/link";

import { categoryTable } from "@/db/schema";
import { useAuthCheck } from "@/hooks/use-auth-check";
import { AuthDialog } from "./auth-dialog";
import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  const { requireAuth, showLoginDialog, setShowLoginDialog, dialogMessage } =
    useAuthCheck();

  const handleCategoryClick = (categorySlug: string) => {
    requireAuth(() => {
      window.location.href = `/category/${categorySlug}`;
    }, "Faça login para explorar nossas categorias de produtos exclusivos!");
  };

  return (
    <>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className="pointer-events-auto rounded-full bg-white text-sm font-semibold"
          onClick={() => handleCategoryClick(category.slug)}
        >
          {category.name}
        </Button>
      ))}

      <AuthDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        message={dialogMessage}
      />
    </>
  );
};

export default CategorySelector;
