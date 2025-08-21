import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export const useAuthCheck = () => {
  const { data: session } = authClient.useSession();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const requireAuth = (action: () => void, message?: string) => {
    if (!session?.user) {
      setDialogMessage(
        message ||
          "Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se veste com personalidade."
      );
      setShowLoginDialog(true);
      return false;
    }
    action();
    return true;
  };

  return {
    session,
    showLoginDialog,
    setShowLoginDialog,
    dialogMessage,
    requireAuth,
    isAuthenticated: !!session?.user,
  };
};
