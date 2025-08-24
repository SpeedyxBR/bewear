"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface SearchPopupProps {
  categories: any[];
  products: any[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchPopup = ({
  categories,
  products,
  isOpen,
  onOpenChange,
}: SearchPopupProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-96 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Buscar</SheetTitle>
        </SheetHeader>

        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="max-h-96">
          {searchTerm && (
            <div className="p-4">
              {filteredCategories.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Categorias
                  </h3>
                  <div className="space-y-1">
                    {filteredCategories.map((category: any) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="block p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
                        onClick={() => onOpenChange(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Produtos
                  </h3>
                  <div className="space-y-1">
                    {filteredProducts.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/product-variant/${product.slug}`}
                        className="block p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
                        onClick={() => onOpenChange(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredCategories.length === 0 &&
                filteredProducts.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhum resultado encontrado
                  </p>
                )}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
