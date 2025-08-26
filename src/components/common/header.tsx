"use client";

import {
  ArrowRightIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Search,
  ShoppingBagIcon,
  TruckIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Cart } from "./cart";
import { SearchModal } from "./search-modal";
import { useState, useEffect } from "react";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Garante que o componente só renderiza no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Renderiza um placeholder durante a hidratação
  if (!isMounted) {
    return (
      <header className="container mx-auto flex items-center justify-between p-5">
        <div className="w-[250px] px-5">
          <div className="flex items-center">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
        <div className="flex w-[250px] items-center justify-end gap-3">
          <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
        </div>
      </header>
    );
  }

  // Função helper para autenticação
  const requireAuth = (callback: () => void, message: string) => {
    // Fecha o menu antes de executar o callback
    setIsMenuOpen(false);
    // Aqui você pode implementar a lógica de autenticação
    // Por enquanto, vamos executar o callback diretamente
    callback();
  };

  return (
    <header className="container mx-auto flex items-center justify-between p-5">
      <div className="w-[250px] px-5">
        {session?.user ? (
          <>
            <div className="flex justify-between">
              <div className="flex items-center">
                <Button
                  variant="link"
                  size="icon"
                  className="text-black [&_svg:not([class*='size-'])]:size-auto"
                  onClick={() => authClient.signOut()}
                >
                  <UserIcon />
                </Button>
                <div>
                  <h3 className="font-semibold">
                    Olá, {session?.user?.name} !
                  </h3>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <Button
              size="icon"
              asChild
              variant="link"
              className="text-black [&_svg:not([class*='size-'])]:size-auto"
            >
              <Link href="/authentication">
                <LogInIcon />
              </Link>
            </Button>
            <h2 className="font-semibold">Olá. Faça seu login!</h2>
          </div>
        )}
      </div>

      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex w-[250px] items-center justify-end gap-3">
        <Button
          variant="link"
          className="hidden text-black md:block [&_svg:not([class*='size-'])]:size-auto"
          onClick={() => setIsSearchModalOpen(true)}
        >
          <Search />
        </Button>
        <div className="separator hidden md:block">|</div>
        <Cart />
        <div className="separator block md:hidden">|</div>

        {/* Menu Único - Funciona em Mobile e Desktop */}
        {isMounted && (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="h-full w-[300px] sm:w-[350px] md:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-full w-full">
                <div className="flex h-full min-h-0 flex-col overflow-y-auto pb-20">
                  {/* Seção de Usuário */}
                  <div className="py-4">
                    {session?.user ? (
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
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
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <h2 className="font-semibold text-gray-800">
                            Olá. Faça o seu login!
                          </h2>
                          <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="h-auto bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
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

                  {/* Navegação Principal */}
                  <div className="py-3">
                    <h3 className="mb-2 px-4 text-sm font-semibold tracking-wide text-gray-600 uppercase">
                      Navegação
                    </h3>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () => (window.location.href = "/"),
                            "Faça login para acessar a página inicial!",
                          );
                        }}
                      >
                        <HomeIcon className="h-5 w-5" />
                        <span>Início</span>
                      </Button>

                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () => (window.location.href = "/my-orders"),
                            "Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se veste com personalidade.",
                          );
                        }}
                      >
                        <TruckIcon className="h-5 w-5" />
                        <span>Meus Pedidos</span>
                      </Button>

                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(() => {
                            window.location.href = "/cart/identification";
                          }, "Faça login para acessar sua sacola!");
                        }}
                      >
                        <ShoppingBagIcon className="h-5 w-5" />
                        <span>Sacola</span>
                      </Button>
                    </div>
                  </div>

                  {/* Categorias */}
                  <div className="py-3">
                    <h3 className="mb-2 px-4 text-sm font-semibold tracking-wide text-gray-600 uppercase">
                      Categorias
                    </h3>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        size="sm"
                        onClick={() => {
                          requireAuth(
                            () =>
                              (window.location.href = "/category/camisetas"),
                            "Faça login para explorar nossas camisetas exclusivas!",
                          );
                        }}
                      >
                        Camisetas
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () =>
                              (window.location.href =
                                "/category/bermuda-shorts"),
                            "Faça login para explorar bermudas e shorts!",
                          );
                        }}
                      >
                        Bermuda & Shorts
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () => (window.location.href = "/category/calcas"),
                            "Faça login para explorar nossas calças!",
                          );
                        }}
                      >
                        Calças
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () =>
                              (window.location.href =
                                "/category/jaquetas-moletons"),
                            "Faça login para explorar jaquetas e moletons!",
                          );
                        }}
                      >
                        Jaquetas & Moletons
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () => (window.location.href = "/category/tenis"),
                            "Faça login para explorar nossos tênis!",
                          );
                        }}
                      >
                        Tênis
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-12 w-full justify-start px-4"
                        onClick={() => {
                          requireAuth(
                            () =>
                              (window.location.href = "/category/acessorios"),
                            "Faça login para explorar nossos acessórios!",
                          );
                        }}
                      >
                        Acessórios
                      </Button>
                    </div>
                  </div>

                  {/* Botão de Logout */}
                  {session && session.user && (
                    <>
                      <div className="mt-auto py-6">
                        <Button
                          variant="ghost"
                          className="h-12 w-full justify-between px-4 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
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
        )}
      </div>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </header>
  );
};
