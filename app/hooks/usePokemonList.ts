// Hook personalizado que encapsula la lógica de React Query
// para obtener la lista de Pokémon

import { useQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemon.service";

export function usePokemonList(limit: number, offset: number = 0) {
  return useQuery({
    queryKey: ["pokemon-list", limit, offset], // Cache key único por parámetros
    queryFn: () => pokemonService.getList(limit, offset),
    staleTime: 5 * 60 * 1000, // Los datos son "frescos" por 5 minutos
    // Esto evita peticiones innecesarias si el usuario vuelve a la página
  });
}