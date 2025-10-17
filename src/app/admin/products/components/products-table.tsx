"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCentsToBRL } from "@/helpers/money";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown, Edit, Trash2, Eye } from "lucide-react";
import { deleteProduct } from "@/actions/admin/delete-product";
import { toast } from "sonner";
import Link from "next/link";

interface ProductsTableProps {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: Date;
    category: {
      name: string;
    };
    mark: {
      name: string;
    } | null;
    variants: Array<{
      id: string;
      name: string;
      color: string;
      priceInCents: number;
      imageUrl: string;
    }>;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  marks: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (productId: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    setIsDeleting(productId);
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir produto");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <Badge variant="outline">{product.category.name}</Badge>
                    {product.mark && (
                      <Badge variant="secondary">{product.mark.name}</Badge>
                    )}
                  </div>

                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                    <div>
                      <p className="font-medium">Variantes</p>
                      <p>{product.variants.length} variação(ões)</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {product.variants.map((variant) => (
                          <Badge
                            key={variant.id}
                            variant="outline"
                            className="text-xs"
                          >
                            {variant.color} -{" "}
                            {formatCentsToBRL(variant.priceInCents)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Criado em</p>
                      <p>
                        {formatDistanceToNow(new Date(product.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isDeleting === product.id}
                      >
                        {isDeleting === product.id ? (
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
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/product-variant/${product.variants[0]?.slug}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600"
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
