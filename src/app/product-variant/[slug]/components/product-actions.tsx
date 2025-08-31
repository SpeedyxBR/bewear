"use client";

import { MinusIcon, PlusIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { addProductToCart } from "@/actions/add-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: buyNow, isPending: isBuyNowPending } = useMutation({
    mutationKey: ["buyNow", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado ao carrinho.", { duration: 1000 });
      // Redirecionar para a aba Identification
      router.push("/cart/identification");
    },
  });

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleBuyNow = () => {
    buyNow();
  };

  return (
    <>
      <div className="mt-4 px-5">
        <div className="mb-6 space-y-4">
          <h3 className="text-xl font-semibold">Quantidade</h3>
          <div className="flex w-[158px] items-center justify-between rounded-lg border px-5 py-1 text-xl font-semibold">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid flex-col gap-2 space-y-4 px-5 py-6 xl:grid-cols-2">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button
          className="rounded-full py-6 text-lg leading-2 font-bold"
          size="lg"
          disabled={isBuyNowPending}
          onClick={handleBuyNow}
        >
          {isBuyNowPending && <Loader2 className="animate-spin" />}
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
