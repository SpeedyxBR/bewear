"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  Search,
  ShoppingBagIcon,
  TruckIcon,
  UserIcon,
} from "lucide-react";

import { categoryTable, productTable } from "@/db/schema";
import { useAuthCheck } from "@/hooks/use-auth-check";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AuthDialog } from "./auth-dialog";
import { Cart } from "./cart";
import { SearchModal } from "./search-modal";
import { SearchPopup } from "./search-popup";

interface HeaderProps {
  categories?: (typeof categoryTable.$inferSelect)[];
  products?: (typeof productTable.$inferSelect)[];
}

export const Header = ({ categories = [], products = [] }: HeaderProps) => {
  const { data: session } = authClient.useSession();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { requireAuth, showLoginDialog, setShowLoginDialog, dialogMessage } =
    useAuthCheck();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-8 py-5 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white"
      }`}
    >
      {/* Logo à esquerda no mobile */}
      <Link href="/" className="block md:hidden">
        <Image src="/Logo.png" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      {/* Login apenas na webf */}
      <div className="hidden md:block">
        {session?.user ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => authClient.signOut()}
              className="text-black"
            >
              <UserIcon />
            </Button>
            <span className="text-gray-700">Olá, {session.user.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="text-black">
              <Link href="/authentication">
                <UserIcon />
              </Link>
            </Button>
            <span className="text-gray-700">Faça seu cadastro</span>
          </div>
        )}
      </div>

      {/* Logo centralizado na web */}
      <Link
        href="/"
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2"
      >
        <Image src="/Logo.png" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      {/* Menu e carrinho à direita */}
      <div className="flex items-center gap-3">
        {/* Ícone de busca */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSearchPopupOpen(true)}
          className="hover:bg-purple-50 hover:border-purple-300"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="h-full">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-full w-full">
              <div className="flex flex-col h-full min-h-0">
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

                {/* Navegação Principal - Mais próxima e destacada */}
                <div className="py-3">
                  <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide px-4 mb-2">
                    Navegação
                  </h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () => (window.location.href = "/"),
                          "Faça login para acessar a página inicial!"
                        );
                      }}
                    >
                      <HomeIcon className="h-5 w-5" />
                      <span>Início</span>
                    </Button>

                    {/* Meus Pedidos - Sempre visível */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () => (window.location.href = "/my-orders"),
                          "Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se veste com personalidade."
                        );
                      }}
                    >
                      <TruckIcon className="h-5 w-5" />
                      <span>Meus Pedidos</span>
                    </Button>

                    {/* Sacola - Sempre visível */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(() => {
                          // Fecha o menu primeiro
                          setIsMenuOpen(false);
                          // Redireciona para a página de identificação do carrinho
                          window.location.href = "/cart/identification";
                        }, "Faça login para acessar sua sacola!");
                      }}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      <span>Sacola</span>
                    </Button>
                  </div>
                </div>

                <div className="py-3">
                  <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide px-4 mb-2">
                    Categorias
                  </h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      size="sm"
                      onClick={() => {
                        requireAuth(
                          () => (window.location.href = "/category/camisetas"),
                          "Faça login para explorar nossas camisetas exclusivas!"
                        );
                      }}
                    >
                      Camisetas
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () =>
                            (window.location.href = "/category/bermuda-shorts"),
                          "Faça login para explorar bermudas e shorts!"
                        );
                      }}
                    >
                      Bermuda & Shorts
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () => (window.location.href = "/category/calcas"),
                          "Faça login para explorar nossas calças!"
                        );
                      }}
                    >
                      Calças
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () =>
                            (window.location.href =
                              "/category/jaquetas-moletons"),
                          "Faça login para explorar jaquetas e moletons!"
                        );
                      }}
                    >
                      Jaquetas & Moletons
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () => (window.location.href = "/category/tenis"),
                          "Faça login para explorar nossos tênis!"
                        );
                      }}
                    >
                      Tênis
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        requireAuth(
                          () => (window.location.href = "/category/acessorios"),
                          "Faça login para explorar nossos acessórios!"
                        );
                      }}
                    >
                      Acessórios
                    </Button>
                  </div>
                </div>

                {/* Botão de Logout para usuários logados - NO FINAL */}
                {session && session.user && (
                  <>
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

      <AuthDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        message={dialogMessage}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <SearchPopup
        categories={categories}
        products={products}
        isOpen={isSearchPopupOpen}
        onOpenChange={setIsSearchPopupOpen}
      />
    </header>
  );
};
