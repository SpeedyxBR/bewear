import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";

interface UseGoogleAuthOptions {
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
}

export const useGoogleAuth = (options: UseGoogleAuthOptions = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    onSuccess,
    onError,
    successMessage = "Seja bem-vindo(a) de volta!",
  } = options;

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        fetchOptions: {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getUseCartQueryKey(),
            });
            router.push("/");
            toast.success(successMessage);
            onSuccess?.();
          },
          onError: () => {
            setIsLoading(false);
            onError?.();
          },
        },
      });
    } catch (error) {
      setIsLoading(false);
      onError?.();
    }
  };

  return {
    signInWithGoogle,
    isLoading,
  };
};
