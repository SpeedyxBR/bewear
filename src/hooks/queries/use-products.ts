import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/actions/get-products";

export const productsQueryKey = () => ["products"];

export const useProducts = () => {
  return useQuery({
    queryKey: productsQueryKey(),
    queryFn: getProducts,
  });
};
