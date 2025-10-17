"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LogInCardProps {
  onClick: () => void;
}

const LogInCard = ({ onClick }: LogInCardProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        fetchOptions: {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getUseCartQueryKey(),
            });
            router.push("/");
            toast.success("Seja bem-vindo(a) de volta!");
            onClick();
          },
          onError: () => {
            setIsGoogleLoading(false);
          },
        },
      });
    } catch (error) {
      setIsGoogleLoading(false);
    }
  };

  const handleContinueWithoutLogin = () => {
    onClick();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClick} />
      <div className="bg-background relative z-10 w-[400px] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4 px-3 py-4">
          <img
            src="/logo.svg"
            alt="BEWEAR"
            width={120}
            height={40}
            className="h-auto"
          />
          <p className="text-lg font-semibold">Entre ou crie sua conta</p>
          <div className="h-[1px] w-[50px] bg-gray-300"></div>
          <p className="text-muted-foreground mt-1 text-center text-sm">
            Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
            veste com personalidade.
          </p>
          <div className="mt-6 w-full space-y-3">
            <Button
              asChild
              className="w-full rounded-full"
              onClick={onClick}
              size="lg"
            >
              <Link href="/authentication">
                Fazer login <LogIn />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSignInWithGoogle}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {!isGoogleLoading && (
                <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
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
              )}
              Entrar com Google
            </Button>
            <Button
              className="text-muted-foreground w-full text-sm"
              onClick={handleContinueWithoutLogin}
              variant="ghost"
            >
              Continuar sem login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInCard;
