"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "@/store";
import { hydrateCart, loadFromStorage } from "@/store/slices/cartSlice";
import { queryClient } from "@/lib/queryClient";

// Load the persisted cart after mount so SSR markup matches the first client
// render (the store starts with an empty cart on both server and client).
function CartHydrator() {
  useEffect(() => {
    store.dispatch(hydrateCart(loadFromStorage()));
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <CartHydrator />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
