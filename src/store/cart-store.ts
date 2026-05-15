"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Artwork, Product, CartItemKind } from "@/types/content";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  price: number;
  stripePriceId: string;
  kind: CartItemKind;
};

type CartStoreState = {
  items: CartItem[];
  _hasHydrated: boolean;
  addArtwork: (artwork: Artwork) => void;
  addProduct: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  subtotal: () => number;
  count: () => number;
};

const artworkToCartItem = (artwork: Artwork): CartItem => ({
  id: artwork.id,
  slug: artwork.slug,
  title: artwork.title,
  imageUrl: artwork.imageUrl,
  price: artwork.price,
  stripePriceId: artwork.stripePriceId,
  kind: "artwork",
});

const productToCartItem = (product: Product): CartItem => ({
  id: product.id,
  slug: product.slug,
  title: product.name,
  imageUrl: product.imageUrl,
  price: product.price,
  stripePriceId: product.stripePriceId,
  kind: "product",
});

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,
      addArtwork: (artwork) => {
        set((state) => {
          if (state.items.some((item) => item.id === artwork.id)) {
            return state;
          }

          return { items: [...state.items, artworkToCartItem(artwork)] };
        });
      },
      addProduct: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state;
          }

          return { items: [...state.items, productToCartItem(product)] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },
      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price, 0);
      },
      count: () => {
        return get().items.length;
      },
    }),
    {
      name: "artwork-cart",
      partialize: (state) => ({ items: state.items }),
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return () => {
          useCartStore.setState({ _hasHydrated: true });
        };
      },
    },
  ),
);
