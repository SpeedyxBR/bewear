"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCentsToBRL } from "@/helpers/money";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

interface RecentOrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: "pending" | "paid" | "canceled";
    createdAt: Date;
    user: {
      name: string;
      email: string;
    };
    items: Array<{
      productVariant: {
        product: {
          name: string;
        };
        name: string;
      };
      quantity: number;
    }>;
  }>;
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "canceled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    #{order.id.slice(-8)}
                  </Link>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {order.user.name} ({order.user.email})
                </p>
                <p className="text-sm text-gray-500">
                  {order.items.length} item(s) •{" "}
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatCentsToBRL(order.totalPriceInCents)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
