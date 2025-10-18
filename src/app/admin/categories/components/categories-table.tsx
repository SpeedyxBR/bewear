"use client";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { deleteCategory } from "@/actions/admin/delete-category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoriesTableProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    products: Array<{
      id: string;
    }>;
  }>;
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (categoryId: string, categoryName: string) => {
    if (
      !confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)
    ) {
      return;
    }

    setIsDeleting(categoryId);
    try {
      await deleteCategory({ id: categoryId });
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir categoria");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Categorias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">
                      {category.name}
                    </h3>
                    <Badge variant="outline">
                      {category.products?.length || 0} produto(s)
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Slug:</span> {category.slug}
                    </p>
                    <p>
                      <span className="font-medium">Criado em:</span>{" "}
                      {formatDistanceToNow(new Date(category.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>

                <div className="ml-4 flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isDeleting === category.id}
                      >
                        {isDeleting === category.id ? (
                          "Excluindo..."
                        ) : (
                          <>
                            Ações
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(category.id, category.name)}
                        className="text-red-600"
                        disabled={category.products.length > 0}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
