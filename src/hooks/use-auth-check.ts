"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useAuthCheck = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const requireAuth = (callback: () => void, message: string) => {
    // Por enquanto, sempre mostra o diálogo de login
    // Você pode implementar a lógica de verificação de autenticação aqui
    setDialogMessage(message);
    setShowLoginDialog(true);
  };

  return {
    requireAuth,
    showLoginDialog,
    setShowLoginDialog,
    dialogMessage,
  };
};
