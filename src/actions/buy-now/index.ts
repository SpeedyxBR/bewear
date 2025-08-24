"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { BuyNowSchema, buyNowSchema } from "./schema";

export const buyNow = async (data: BuyNowSchema) => {
  buyNowSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set");
  }

  try {
    // 1. Buscar informações do produto diretamente
    const productVariant = await db.query.productVariantTable.findFirst({
      where: (variant, { eq }) => eq(variant.id, data.productVariantId),
      with: {
        product: true,
      },
    });

    if (!productVariant) {
      throw new Error("Produto não encontrado");
    }

    // 2. Criar sessão do Stripe diretamente com o produto
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        productVariantId: data.productVariantId,
        quantity: data.quantity.toString(),
        userId: session.user.id,
      },
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `${productVariant.product.name} - ${productVariant.name}`,
              description: productVariant.product.description,
              images: [productVariant.imageUrl],
            },
            unit_amount: productVariant.priceInCents,
          },
          quantity: data.quantity,
        },
      ],
    });

    console.log("Checkout session criada:", checkoutSession);
    console.log("URL do checkout:", checkoutSession.url);
    return { checkoutSession };
  } catch (error) {
    console.error("Erro ao processar compra direta:", error);
    throw new Error("Falha ao processar a compra. Tente novamente.");
  }
};
