"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export const useAuthCheck = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está logado
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        // Verificar se session existe e tem dados válidos
        const isAuth = !!session && "user" in session && !!session.user;
        setIsAuthenticated(isAuth);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const requireAuth = (callback: () => void, message: string) => {
    if (isAuthenticated) {
      // Se já está logado, executa a callback
      callback();
    } else {
      // Se não está logado, mostra o diálogo
      setDialogMessage(message);
      setShowLoginDialog(true);
    }
  };

  return {
    requireAuth,
    showLoginDialog,
    setShowLoginDialog,
    dialogMessage,
    isAuthenticated,
  };
};
