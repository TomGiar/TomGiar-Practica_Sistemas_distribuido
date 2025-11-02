// Provider que envuelve la aplicación con React Query
// Este debe ser un Client Component

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  // Creamos el QueryClient una sola vez usando useState
  // para evitar recrearlo en cada render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuración global para todas las queries
            refetchOnWindowFocus: false, // No refetch al volver a la pestaña
            retry: 1, // Solo reintentar 1 vez si falla
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
