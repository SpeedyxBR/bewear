"use client";

import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart } = useCart();

  const hasItems = cart?.items && cart.items.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            {hasItems ? (
              <>
                <ScrollArea className="h-full">
                  <div className="flex h-full flex-col gap-8">
                    {cart?.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productVariantId={item.productVariant.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex flex-col gap-4">
                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Subtotal</p>
                    <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Entrega</p>
                    <p>GRÁTIS</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Total</p>
                    <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                  </div>

                  <Button className="mt-5 rounded-full" asChild>
                    <Link href="/cart/identification">Finalizar compra</Link>
                  </Button>
                </div>
              </>
            ) : (
              // Carrinho vazio
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <ShoppingBasketIcon className="h-16 w-16 text-gray-300" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-600">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Adicione produtos para começar suas compras
                  </p>
                </div>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/">Continuar comprando</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
