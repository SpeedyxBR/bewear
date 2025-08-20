"use client";
import {
  ArrowRightIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Debug para verificar se a sessão está funcionando
  console.log("Session data:", session);

  // Debug para verificar se o logo está carregando
  console.log("Logo path:", "/logo.svg");

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/" className="flex items-center">
        {/* Logo principal - texto BEWEAR */}
        <div className="text-2xl font-bold text-purple-600">
          BEWEAR
        </div>
        
        {/* Logo de imagem como fallback opcional */}
        <img
          src="/logo.svg"
          alt="BEWEAR Logo"
          width={100}
          height={26.14}
          className="h-auto w-auto ml-2 hidden"
          onError={(e) => {
            console.log("Logo SVG falhou");
            e.currentTarget.style.display = "none";
          }}
          onLoad={(e) => {
            console.log("Logo SVG carregado, escondendo texto");
            e.currentTarget.previousElementSibling?.classList.add("hidden");
            e.currentTarget.classList.remove("hidden");
          }}
        />
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
                {/* Navegação Principal - Mais próxima e destacada */}
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

                    {/* Meus Pedidos - Sempre visível */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                      onClick={() => {
                        if (!session?.user) {
                          setDialogMessage(
                            "Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se veste com personalidade."
                          );
                          setShowLoginDialog(true);
                        } else {
                          window.location.href = "/my-orders";
                        }
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
                        if (!session?.user) {
                          setDialogMessage(
                            "Faça login para acessar sua sacola!"
                          );
                          setShowLoginDialog(true);
                        } else {
                          window.location.href = "/cart";
                        }
                      }}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      <span>Sacola</span>
                    </Button>
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

      {/* Dialog para usuários não logados */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Criar uma conta</DialogTitle>
            <DialogDescription className="text-center">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-3 justify-center"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                });
                setShowLoginDialog(false);
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue com o Google
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowLoginDialog(false)}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
