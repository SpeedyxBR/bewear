"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCentsToBRL } from "@/helpers/money";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { updateOrderStatus } from "@/actions/admin/update-order-status";
import { toast } from "sonner";
import Link from "next/link";

interface OrdersTableProps {
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

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

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

  const handleStatusUpdate = async (
    orderId: string,
    status: "pending" | "paid" | "canceled",
  ) => {
    setIsUpdating(orderId);
    try {
      await updateOrderStatus({ orderId, status });
      toast.success("Status do pedido atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar status do pedido");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Pedido #{order.id.slice(-8)}
                    </Link>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>

                  <div className="mt-2 grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
                    <div>
                      <p className="font-medium">Cliente</p>
                      <p>{order.user.name}</p>
                      <p>{order.user.email}</p>
                    </div>

                    <div>
                      <p className="font-medium">Itens</p>
                      <p>{order.items.length} produto(s)</p>
                      <p>
                        {order.items
                          .map(
                            (item) =>
                              `${item.productVariant.product.name} (${item.productVariant.name})`,
                          )
                          .join(", ")}
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">Data do Pedido</p>
                      <p>
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {formatCentsToBRL(order.totalPriceInCents)}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUpdating === order.id}
                      >
                        {isUpdating === order.id ? (
                          "Atualizando..."
                        ) : (
                          <>
                            Ações
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(order.id, "pending")}
                        disabled={order.status === "pending"}
                      >
                        Marcar como Pendente
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(order.id, "paid")}
                        disabled={order.status === "paid"}
                      >
                        Marcar como Pago
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(order.id, "canceled")}
                        disabled={order.status === "canceled"}
                      >
                        Cancelar Pedido
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
