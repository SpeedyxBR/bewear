import { getDashboardStats } from "@/actions/admin/get-dashboard-stats";

import DashboardStats from "./components/dashboard-stats";
import RecentOrders from "./components/recent-orders";
import TopProducts from "./components/top-products";

export default async function AdminDashboard() {
  const { stats, recentOrders, topProducts } = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu e-commerce</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders orders={recentOrders} />
        <TopProducts products={topProducts} />
      </div>
    </div>
  );
}
