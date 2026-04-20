import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/lib/api';

type ProductParams = Parameters<typeof productsAPI.getAll>[0];

const FIVE_MINUTES = 5 * 60 * 1000;

export function useProducts(params?: ProductParams) {
  return useQuery({
    queryKey: ['products', params ?? {}],
    queryFn: () => productsAPI.getAll(params),
    staleTime: FIVE_MINUTES,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getById(id),
    enabled: !!id,
    staleTime: FIVE_MINUTES,
  });
}

export function useProductStats() {
  return useQuery({
    queryKey: ['product-stats'],
    queryFn: () => productsAPI.getStats(),
    staleTime: FIVE_MINUTES,
  });
}
