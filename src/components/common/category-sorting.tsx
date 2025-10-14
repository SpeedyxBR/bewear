"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowUpDown } from "lucide-react";

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

interface CategorySortingProps {
  products: Product[];
  onSortedProducts: (products: Product[]) => void;
}

type SortOption =
  | "default"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "newest";

const CategorySorting = ({
  products,
  onSortedProducts,
}: CategorySortingProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "default", label: "Padrão" },
    { value: "name-asc", label: "Nome A-Z" },
    { value: "name-desc", label: "Nome Z-A" },
    { value: "price-asc", label: "Menor Preço" },
    { value: "price-desc", label: "Maior Preço" },
    { value: "newest", label: "Mais Recentes" },
  ];

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    setIsOpen(false);

    let sortedProducts = [...products];

    switch (option) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sortedProducts.sort((a, b) => {
          const minPriceA = Math.min(...a.variants.map((v) => v.priceInCents));
          const minPriceB = Math.min(...b.variants.map((v) => v.priceInCents));
          return minPriceA - minPriceB;
        });
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => {
          const maxPriceA = Math.max(...a.variants.map((v) => v.priceInCents));
          const maxPriceB = Math.max(...b.variants.map((v) => v.priceInCents));
          return maxPriceB - maxPriceA;
        });
        break;
      case "newest":
        sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        break;
    }

    onSortedProducts(sortedProducts);
  };

  const currentOption = sortOptions.find(
    (option) => option.value === sortOption,
  );

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Ordenar por:</span>
        </div>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="min-w-[140px] justify-between"
            >
              {currentOption?.label}
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSort(option.value as SortOption)}
                className={sortOption === option.value ? "bg-muted" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default CategorySorting;
