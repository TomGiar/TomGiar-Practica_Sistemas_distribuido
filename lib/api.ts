import axios from "axios";
import { PokemonListResponse, PokemonDetail } from "@/types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

// Cliente axios configurado
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Obtiene la lista de Pokémon con paginación
 * @param limit Cantidad de resultados
 * @param offset Desplazamiento para paginación
 */
export async function getPokemonList(
  limit: number = 30,
  offset: number = 0
): Promise<PokemonListResponse> {
  try {
    const response = await api.get<PokemonListResponse>("/pokemon", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw new Error("No se pudo obtener la lista de Pokémon");
  }
}

/**
 * Obtiene los detalles de un Pokémon específico por nombre o ID
 * @param nameOrId Nombre o ID del Pokémon
 */
export async function getPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  try {
    const response = await api.get<PokemonDetail>(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon ${nameOrId}:`, error);
    throw new Error(`No se pudo obtener información del Pokémon: ${nameOrId}`);
  }
}