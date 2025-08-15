"use client";
import {
  ArrowRightIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();

  // Debug para verificar se a sessão está funcionando
  console.log("Session data:", session);

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="logo_store" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-full">
              <div className="flex flex-col h-full">
                {/* Seção de Usuário */}
                <div className="py-4">
                  {session?.user ? (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")[0]?.[0]}
                          {session?.user?.name?.split(" ")[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="font-semibold text-gray-800">
                          Olá. Faça o seu login!
                        </h2>
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 h-auto"
                        >
                          <Link
                            href="/authentication"
                            className="flex items-center gap-2"
                          >
                            <span>Login</span>
                            <ArrowRightIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />
                <div className="py-3">
                  <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide px-4 mb-2">
                    Navegação
                  </h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      asChild
                    >
                      <Link href="/" className="flex items-center gap-3">
                        <HomeIcon className="h-5 w-5" />
                        <span>Início</span>
                      </Link>
                    </Button>

                    {session?.user && (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-12 px-4"
                          asChild
                        >
                          <Link
                            href="/my-orders"
                            className="flex items-center gap-3"
                          >
                            <TruckIcon className="h-5 w-5" />
                            <span>Meus Pedidos</span>
                          </Link>
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full justify-start h-12 px-4"
                          asChild
                        >
                          <Link
                            href="/cart"
                            className="flex items-center gap-3"
                          >
                            <ShoppingBagIcon className="h-5 w-5" />
                            <span>Sacola</span>
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Separator />
                <div className="py-3">
                  <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide px-4 mb-2">
                    Categorias
                  </h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      size="sm"
                      asChild
                    >
                      <Link href="/category/camisetas">Camisetas</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      asChild
                    >
                      <Link href="/category/bermuda-shorts">
                        Bermuda & Shorts
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      asChild
                    >
                      <Link href="/category/calcas">Calças</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      asChild
                    >
                      <Link href="/category/jaquetas-moletons">
                        Jaquetas & Moletons
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      asChild
                    >
                      <Link href="/category/tenis">Tênis</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      asChild
                    >
                      <Link href="/category/acessorios">Acessórios</Link>
                    </Button>
                  </div>
                </div>

                {/* Botão de Logout para usuários logados - NO FINAL */}
                {session && session.user && (
                  <>
                    <Separator />
                    <div className="mt-auto py-6">
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-12 px-4 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        onClick={() => authClient.signOut()}
                      >
                        <span>Sair da conta</span>
                        <LogOutIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};
