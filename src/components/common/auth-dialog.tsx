"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-4 sm:max-w-[425px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">
            Faça seu login
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {message.description}
          </DialogDescription>
        </DialogHeader>

        {/* Mensagem do diálogo */}
        {message.title && (
          <div className="rounded-md bg-red-50 p-4">
            <h2 className="text-base font-semibold text-red-700">
              {message.title}
            </h2>
            <p className="mt-2 text-sm text-red-600">{message.description}</p>
          </div>
        )}

        {/* Botão de redirecionamento para o login */}
        <Button
          asChild
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          <a href="/authentication">Ir para o login</a>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
