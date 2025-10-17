import { getAllOrders } from "@/actions/admin/get-all-orders";
import OrdersTable from "./components/orders-table";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pedidos</h1>
        <p className="text-gray-600">
          Visualize e gerencie todos os pedidos do sistema
        </p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
