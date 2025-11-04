// Hooks personalizados que usan React Query para manejar
// el estado de favoritos de forma declarativa

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/app/services/favorites.service";

/**
 * Hook para obtener la lista de favoritos
 */
export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesService.getAll,
    staleTime: 30 * 1000, // 30 segundos
  });
}

/**
 * Hook para agregar un Pokémon a favoritos
 */
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.add,
    onSuccess: () => {
      // Invalidar la cache para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error: Error) => {
      console.error("Error al agregar favorito:", error);
    },
  });
}

/**
 * Hook para eliminar un Pokémon de favoritos
 */
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error: Error) => {
      console.error("Error al eliminar favorito:", error);
    },
  });
}

/**
 * Hook personalizado para verificar si un Pokémon está en favoritos
 */
export function useIsFavorite(pokemonId: number): boolean {
  const { data: favorites } = useFavorites();
  return favorites?.some((fav) => fav.id === pokemonId) ?? false;
}