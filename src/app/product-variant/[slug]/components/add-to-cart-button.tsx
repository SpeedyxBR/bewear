"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useCartSheet } from "@/hooks/use-cart-sheet";
import { useAuthCheck } from "@/hooks/use-auth-check";
import { AuthDialog } from "@/components/common/auth-dialog";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { openCart } = useCartSheet();
  const { requireAuth, showLoginDialog, setShowLoginDialog, dialogMessage } =
    useAuthCheck();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado ao carrinho.", { duration: 1000 });
      openCart();
    },
  });

  const handleAddToCart = () => {
    requireAuth(
      () => mutate(),
      "Faça login para adicionar produtos ao carrinho!"
    );
  };

  return (
    <>
      <Button
        className="rounded-full py-6 text-lg font-bold"
        size="lg"
        variant="outline"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar à sacola
      </Button>

      <AuthDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        message={dialogMessage}
      />
    </>
  );
};

export default AddToCartButton;
