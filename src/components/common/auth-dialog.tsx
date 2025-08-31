"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: {
    title: string;
    description: string;
  };
}

export const AuthDialog = ({
  open,
  onOpenChange,
  message,
}: AuthDialogProps) => {
  const handleSignInWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.error("Erro ao fazer login com Google. Tente novamente.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-4 sm:max-w-[425px]">
        <DialogHeader className="space-y-4 text-center">
          {/* Logo da BEWEAR */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="BEWEAR"
                width={120}
                height={31}
                className="h-8 w-auto"
                priority
                onError={(e) => {
                  // Fallback para texto se a imagem falhar
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<span class="text-2xl font-bold text-black">BEWEAR</span>';
                  }
                }}
              />
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold">
            Entrar na BEWEAR
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
            veste com personalidade.
          </DialogDescription>
        </DialogHeader>

        {/* Botão de login com Google */}
        <Button
          className="flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={handleSignInWithGoogle}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
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
          Entrar com Google
        </Button>

        {/* Separador */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              OU CONTINUE COM EMAIL
            </span>
          </div>
        </div>

        {/* Botão de redirecionamento para o login */}
        <Button
          asChild
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          <a href="/authentication">Ir para o login</a>
        </Button>

        {/* Link para criar conta */}
        <div className="text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <a
            href="/authentication"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            Crie uma conta
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
