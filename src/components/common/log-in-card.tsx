"use client";

import { LogIn } from "lucide-react";
import Image from "next/image"; 
import Link from "next/link";

import { Button } from "../ui/button";
import ContinueWithoutLoginButton from "../ui/continue-without-login-button";
import GoogleButton from "../ui/google-button";

interface LogInCardProps {
  onClick: () => void;
}

const LogInCard = ({ onClick }: LogInCardProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClick} />
      <div className="bg-background relative z-10 w-[400px] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4 px-3 py-4">
          {/* Agora o componente Image será reconhecido */}
          <Image
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
            <GoogleButton
              onSuccess={onClick}
              successMessage="Seja bem-vindo(a) de volta!"
            />
            <ContinueWithoutLoginButton onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInCard;