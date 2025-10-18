"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import AdminSidebar from "./admin-sidebar";

export default function AdminMobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="m-4">
            <Menu className="h-4 w-4" />
            <span className="ml-2">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6">
              <h1 className="text-xl font-bold text-gray-900">Painel Admin</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminSidebar
                isMobile={true}
                onLinkClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
