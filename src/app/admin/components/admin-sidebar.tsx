"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Tag,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Produtos",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categorias",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    name: "Pedidos",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Usuários",
    href: "/admin/users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
      </div>

      <nav className="mt-6 flex-1">
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-r-2 border-blue-700 bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => authClient.signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}
