import { z } from "zod";

export const buyNowSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type BuyNowSchema = z.infer<typeof buyNowSchema>;
