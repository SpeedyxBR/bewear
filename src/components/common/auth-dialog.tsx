"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
}

export const AuthDialog = ({
  open,
  onOpenChange,
  message,
}: AuthDialogProps) => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.error("Erro ao fazer login com Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        if (formData.password !== formData.passwordConfirmation) {
          toast.error("As senhas não coincidem");
          return;
        }

        await authClient.signUp.email({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success("Conta criada com sucesso!");
              onOpenChange(false);
              router.push("/");
            },
            onError: (error) => {
              if (error.error.code === "USER_ALREADY_EXISTS") {
                toast.error("E-mail já cadastrado.");
              } else {
                toast.error(error.error.message);
              }
            },
          },
        });
      } else {
        // Sign In
        await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success("Login realizado com sucesso!");
              onOpenChange(false);
            },
            onError: (ctx) => {
              if (ctx.error.code === "USER_NOT_FOUND") {
                toast.error("E-mail não encontrado.");
              } else if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                toast.error("E-mail ou senha inválidos.");
              } else {
                toast.error(ctx.error.message);
              }
            },
          },
        });
      }
    } catch (error) {
      toast.error("Erro ao processar autenticação");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setIsSignUp(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          {/* Logo da Bewear */}
          <div className="flex justify-center mb-4">
            <Image
              src="/Logo.png"
              alt="BEWEAR"
              width={120}
              height={31}
              priority
              className="h-auto w-auto"
            />
          </div>

          <DialogTitle className="text-2xl font-bold">
            {isSignUp ? "Criar Conta" : "Entrar na BEWEAR"}
          </DialogTitle>

          <DialogDescription className="text-base">
            {message ||
              (isSignUp
                ? "Crie sua conta para aproveitar a melhor experiência"
                : "Faça login para continuar comprando")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Botão Google */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignInWithGoogle}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isSignUp ? "Criar conta com Google" : "Entrar com Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com email
              </span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required={isSignUp}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="passwordConfirmation">Confirmar Senha</Label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.passwordConfirmation}
                  onChange={(e) =>
                    handleInputChange("passwordConfirmation", e.target.value)
                  }
                  required={isSignUp}
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Processando..."
                : isSignUp
                  ? "Criar Conta"
                  : "Entrar"}
            </Button>
          </form>

          {/* Alternar entre login e signup */}
          <div className="text-center text-sm">
            {isSignUp ? (
              <span>
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Faça login
                </button>
              </span>
            ) : (
              <span>
                Não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Crie uma conta
                </button>
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
