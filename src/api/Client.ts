import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 دقايق
      gcTime: 1000 * 60 * 10,       // 10 دقايق
      retry: 1,                        // عدد المحاولات
      refetchOnWindowFocus: false,     // ميفتش لما ترجع للتاب
      refetchOnReconnect: true,        // يفيتش لما النت يرجع
    },
    mutations: {
      retry: 0,
    },
  },
});