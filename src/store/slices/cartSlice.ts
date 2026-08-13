import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface CartItem {
  id: string;
  name: string;
  /** Public product code ("CW1482") — travels into the enquiry message so
   *  staff can find the product from a WhatsApp thread. */
  sku?: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  customization?: {
    logoUrl?: string;
    text?: string;
    position?: string;
  };
}

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = 'crosswild-cart';

export function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  if (items.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// True when a stored line item matches the given id (+ size/color when provided).
function matchesLineItem(
  item: CartItem,
  key: { id: string; size?: string; color?: string }
): boolean {
  if (item.id !== key.id) return false;
  if (key.size !== undefined && item.size !== key.size) return false;
  if (key.color !== undefined && item.color !== key.color) return false;
  return true;
}

const cartSlice = createSlice({
  name: 'cart',
  // Start empty on both server and client so SSR markup matches the first
  // client render; the real cart is loaded via hydrateCart after mount.
  initialState: (): CartState => ({ items: [] }),
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
      saveToStorage(state.items);
    },
    // Line items are keyed by id+size+color (see addToCart), so removal and
    // quantity updates must match on the same triple or they hit the wrong
    // variant. A plain string payload (id only) is still accepted.
    removeFromCart(state, action: PayloadAction<string | { id: string; size?: string; color?: string }>) {
      const key = typeof action.payload === 'string' ? { id: action.payload } : action.payload;
      state.items = state.items.filter((i) => !matchesLineItem(i, key));
      saveToStorage(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; size?: string; color?: string; quantity: number }>) {
      const { quantity, ...key } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => !matchesLineItem(i, key));
      } else {
        const item = state.items.find((i) => matchesLineItem(i, key));
        if (item) item.quantity = quantity;
      }
      saveToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveToStorage([]);
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (state: RootState) =>
  // B2B items may have no price — treat missing/non-numeric price as 0 (never NaN)
  state.cart.items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.quantity, 0);

export default cartSlice.reducer;
