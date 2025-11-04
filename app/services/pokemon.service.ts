// Se centralizan todas las llamadas a la API aquí
// Estas funciones son reutilizables y fáciles de testear

import axios from "axios";
import { PokemonListResponse, PokemonDetail } from "@/types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Servicio para obtener lista de Pokémon con paginación
 */
export const pokemonService = {
  /**
   * Obtiene lista de Pokémon
   * @param limit - Cantidad de resultados por página
   * @param offset - Punto de inicio (para paginación)
   */
  async getList(limit: number = 30, offset: number = 0): Promise<PokemonListResponse> {
    const response = await api.get<PokemonListResponse>("/pokemon", {
      params: { limit, offset },
    });
    return response.data;
  },

  /**
   * Obtiene detalles de un Pokémon específico
   * @param nameOrId - Nombre o ID del Pokémon
   */
  async getDetail(nameOrId: string | number): Promise<PokemonDetail> {
    const response = await api.get<PokemonDetail>(`/pokemon/${nameOrId}`);
    return response.data;
  },
};
