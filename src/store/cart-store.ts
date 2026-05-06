"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Artwork } from "@/types/content";

export type CartItem = Pick<
  Artwork,
  "id" | "slug" | "title" | "imageUrl" | "price" | "stripePriceId"
>;

type CartStoreState = {
  items: CartItem[];
  addArtwork: (artwork: Artwork) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  subtotal: () => number;
  count: () => number;
};

const toCartItem = (artwork: Artwork): CartItem => ({
  id: artwork.id,
  slug: artwork.slug,
  title: artwork.title,
  imageUrl: artwork.imageUrl,
  price: artwork.price,
  stripePriceId: artwork.stripePriceId,
});

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      addArtwork: (artwork) => {
        set((state) => {
          if (state.items.some((item) => item.id === artwork.id)) {
            return state;
          }

          return { items: [...state.items, toCartItem(artwork)] };
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
    },
  ),
);
