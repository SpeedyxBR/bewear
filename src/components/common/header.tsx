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
import { AuthDialog } from "./auth-dialog";
import { useState, useEffect } from "react";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [authDialog, setAuthDialog] = useState<{
    open: boolean;
    message: { title: string; description: string };
  }>({
    open: false,
    message: { title: "", description: "" },
  });

  // Garante que o componente só renderiza no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Renderiza um placeholder durante a hidratação
  if (!isMounted) {
    return (
      <header className="flex min-h-[80px] w-full items-center px-4 py-5 sm:px-6 lg:px-8">
        {/* Mobile Placeholder */}
        <div className="flex w-full items-center justify-between md:hidden">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        {/* Desktop Placeholder */}
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="flex flex-1 items-center">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </header>
    );
  }

  // Função helper para autenticação
  const requireAuth = (callback: () => void, description: string) => {
    // Fecha o menu antes de verificar autenticação
    setIsMenuOpen(false);

    if (session?.user) {
      // Usuário está logado, executa o callback
      callback();
    } else {
      // Usuário não está logado, mostra o diálogo
      setAuthDialog({
        open: true,
        message: { title: "", description },
      });
    }
  };

  return (
    <header className="flex min-h-[80px] w-full items-center px-4 py-5 sm:px-6 lg:px-8">
      {/* Mobile: Logo à esquerda + ícones à direita */}
      <div className="flex w-full items-center justify-between md:hidden">
        {/* Logo Mobile */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="BEWEAR"
            width={100}
            height={26.14}
            className="object-contain"
          />
        </Link>

        {/* Ícones Mobile */}
        <div className="flex items-center gap-3">
          <Cart />
          <div className="separator">|</div>
          {/* Menu Mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="h-full w-1/2 max-w-[300px] bg-white dark:bg-card sm:max-w-[350px] md:max-w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full w-full">
                <div className="flex h-full min-h-0 flex-col overflow-y-auto pb-20">
                  {/* Seção de Usuário Mobile */}
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
                          <span className="block text-xs text-muted-foreground">
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

                  {/* Navegação Principal Mobile */}
                  <div className="py-3">
                    <h3 className="mb-2 px-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
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

                  {/* Categorias Mobile */}
                  <div className="py-3">
                    <h3 className="mb-2 px-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
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
                            () => (window.location.href = "/category/calas"),
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
                            "Faça login para explorar nossas jaquetas e moletons!",
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
                            () => (window.location.href = "/category/tnis"),
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
                              (window.location.href = "/category/acessrios"),
                            "Faça login para explorar nossos acessórios!",
                          );
                        }}
                      >
                        Acessórios
                      </Button>
                    </div>
                  </div>

                  {/* Botão de Logout Mobile */}
                  {session && session.user && (
                    <>
                      <div className="mt-auto py-6">
                        <Button
                          variant="ghost"
                          className="h-12 w-full justify-between px-6"
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
        </div>
      </div>

      {/* Desktop: Layout completo */}
      <div className="hidden w-full items-center justify-between md:flex">
        {/* Seção Esquerda Desktop */}
        <div className="flex flex-1 items-center">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Button
                variant="link"
                size="icon"
                className="text-black [&_svg:not([class*='size-'])]:size-auto"
                onClick={() => authClient.signOut()}
              >
                <UserIcon />
              </Button>
              <h3 className="font-semibold">Olá, {session?.user?.name} !</h3>
            </div>
          ) : (
            <div className="flex items-center gap-3">
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

        {/* Logo Desktop - Centralizado */}
        <div className="flex flex-1 items-center justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="BEWEAR"
              width={100}
              height={26.14}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Seção Direita Desktop */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <Button
            variant="link"
            className="text-black [&_svg:not([class*='size-'])]:size-auto"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <Search />
          </Button>
          <div className="separator">|</div>
          <Cart />
          <div className="separator">|</div>

          {/* Menu Desktop */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="h-full w-full max-w-full bg-white dark:bg-card sm:max-w-[350px] md:max-w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full w-full">
                <div className="flex h-full min-h-0 flex-col overflow-y-auto pb-20">
                  {/* Seção de Usuário Desktop */}
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
                          <span className="block text-xs text-muted-foreground">
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

                  {/* Navegação Principal Desktop */}
                  <div className="py-3">
                    <h3 className="mb-2 px-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
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

                  {/* Categorias Desktop */}
                  <div className="py-3">
                    <h3 className="mb-2 px-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
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
                            () => (window.location.href = "/category/calas"),
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
                            "Faça login para explorar nossas jaquetas e moletons!",
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
                            () => (window.location.href = "/category/tnis"),
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
                              (window.location.href = "/category/acessrios"),
                            "Faça login para explorar nossos acessórios!",
                          );
                        }}
                      >
                        Acessórios
                      </Button>
                    </div>
                  </div>

                  {/* Botão de Logout Desktop */}
                  {session && session.user && (
                    <>
                      <div className="mt-auto py-6">
                        <Button
                          variant="ghost"
                          className="h-12 w-full justify-between px-6"
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
        </div>
      </div>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <AuthDialog
        open={authDialog.open}
        onOpenChange={(open) => setAuthDialog((prev) => ({ ...prev, open }))}
        message={authDialog.message}
      />
    </header>
  );
};
