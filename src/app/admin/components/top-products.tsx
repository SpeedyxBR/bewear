"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCentsToBRL } from "@/helpers/money";

interface TopProductsProps {
  products: Array<{
    id: string;
    name: string;
    createdAt: Date;
    variants: Array<{
      id: string;
      priceInCents: number;
    }>;
  }>;
}

export default function TopProducts({ products }: TopProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {product.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {product.variants.length > 0
                    ? formatCentsToBRL(product.variants[0].priceInCents)
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
