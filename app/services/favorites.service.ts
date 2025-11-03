import { FavoritePokemon } from "@/lib/database";

export const favoritesService = {
  /**
   * Obtiene todos los favoritos
   */
  getAll: async (): Promise<FavoritePokemon[]> => {
    const res = await fetch("/api/favourites", {
      method: "GET",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al obtener favoritos");
    }

    return res.json();
  },

  /**
   * Agrega un Pokémon a favoritos
   */
  add: async (pokemon: {
    id: number;
    name: string;
    imageUrl: string;
  }): Promise<FavoritePokemon> => {
    const res = await fetch("/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al agregar a favoritos");
    }

    return res.json();
  },

  /**
   * Elimina un Pokémon de favoritos
   */
  remove: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favourites/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al eliminar de favoritos");
    }
  },
};
