"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { buyNow } from "@/actions/buy-now";

export const getUseBuyNowMutationKey = () => ["buy-now"];

export const useBuyNow = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: getUseBuyNowMutationKey(),
    mutationFn: buyNow,
    onSuccess: (data) => {
      console.log("Hook onSuccess - dados recebidos:", data);
      console.log("URL do checkout:", data.checkoutSession?.url);
      
      // Redirecionar para o checkout do Stripe
      if (data.checkoutSession?.url) {
        console.log("Redirecionando para:", data.checkoutSession.url);
        window.location.href = data.checkoutSession.url;
      } else {
        console.error("URL do checkout não encontrada");
      }
    },
    onError: (error) => {
      console.error("Erro ao processar compra direta:", error);
      // Aqui você pode adicionar um toast ou notificação de erro
    },
  });
};
