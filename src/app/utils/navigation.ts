// app/utils/navigation.ts
import { router } from 'expo-router';

export const navigateTo = {
  products: (category: string) => {
    const encoded = encodeURIComponent(category);
    router.push(`/products/${encoded}` as any);
  },
  product: (id: number) => {
    router.push(`/product/${id}` as any);
  },
  back: () => {
    router.back();
  }
};