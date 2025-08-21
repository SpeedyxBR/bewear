"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { categoryTable, productTable } from "@/db/schema";
import { useAuthCheck } from "@/hooks/use-auth-check";
import { AuthDialog } from "./auth-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface SearchPopupProps {
  categories: (typeof categoryTable.$inferSelect)[];
  products: (typeof productTable.$inferSelect)[];
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
  const { requireAuth, showLoginDialog, setShowLoginDialog, dialogMessage } =
    useAuthCheck();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Para simplificar, vamos buscar produtos pelo nome e categoria
  const allSearchResults = [
    ...categories.map((cat) => ({ ...cat, type: "category" as const })),
    ...products.map((prod) => ({ ...prod, type: "product" as const })),
  ].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categorySlug: string) => {
    requireAuth(() => {
      window.location.href = `/category/${categorySlug}`;
      onOpenChange(false);
      setSearchTerm("");
    }, "Faça login para explorar nossas categorias de produtos exclusivos!");
  };

  const handleItemClick = (item: any) => {
    if (item.type === "category") {
      handleCategoryClick(item.slug);
    } else {
      // Para produtos, tentamos encontrar uma categoria relacionada
      requireAuth(() => {
        window.location.href = `/category/camisetas`; // fallback para uma categoria existente
        onOpenChange(false);
        setSearchTerm("");
      }, "Faça login para ver os detalhes do produto!");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl h-[80vh] max-h-[600px] p-0">
          <DialogHeader className="p-6 pb-4 border-b relative">
            <DialogTitle className="text-center text-xl">
              Buscar produtos
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 absolute top-4 right-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="p-6 flex-1 flex flex-col">
            {/* Barra de pesquisa */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Digite para buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base rounded-full border-gray-300 focus:border-purple-500 bg-gray-50"
                autoFocus
              />
            </div>

            {/* Lista de categorias */}
            <div className="flex-1">
              <ScrollArea className="h-full pr-4">
                {searchTerm === "" ? (
                  <div className="space-y-1">
                    <div className="text-center mb-6">
                      <p className="text-gray-500 text-sm">
                        Digite para começar a buscar produtos, categorias ou
                        marcas
                      </p>
                    </div>

                    {/* Tags de categorias como na imagem */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                          onClick={() => handleCategoryClick(category.slug)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {allSearchResults.length > 0 ? (
                      <>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          Resultados da busca ({allSearchResults.length})
                        </h3>
                        {allSearchResults.map((item) => (
                          <button
                            key={`${item.type}-${item.id}`}
                            className="w-full p-4 text-left hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all group"
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.type === "category"
                                ? "Categoria"
                                : "Produto"}
                            </div>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Nenhum resultado encontrado
                        </h3>
                        <p className="text-gray-500">
                          Tente buscar com outras palavras-chave
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AuthDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        message={dialogMessage}
      />
    </>
  );
};
