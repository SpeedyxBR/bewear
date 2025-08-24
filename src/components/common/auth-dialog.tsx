"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const handleLogin = () => {
    onOpenChange(false);
    router.push("/authentication");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Autenticação Necessária</DialogTitle>
          <DialogDescription>
            {message ||
              "Você precisa fazer login para acessar esta funcionalidade."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button onClick={handleLogin} className="w-full">
            Fazer Login
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
