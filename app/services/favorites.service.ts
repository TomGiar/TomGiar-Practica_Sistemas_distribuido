import { FavoritePokemon } from "@/lib/database";

export const favoritesService = {
  getAll: async (): Promise<FavoritePokemon[]> => {
    const res = await fetch("/api/favourites", {
      method: "GET",
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const error = await res.json();
        throw new Error(error.error || "Error al obtener favoritos");
      } else {
        throw new Error(`Error del servidor (${res.status})`);
      }
    }

    return res.json();
  },

  // ← ACTUALIZADO: Ahora recibe nickname y description
  add: async (pokemon: {
    id: number;
    name: string;
    imageUrl: string;
    nickname: string;
    description: string;
  }): Promise<FavoritePokemon> => {
    const res = await fetch("/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const error = await res.json();
        throw new Error(error.error || "Error al agregar a favoritos");
      } else {
        throw new Error(`Error del servidor (${res.status})`);
      }
    }

    return res.json();
  },

  remove: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favourites/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const error = await res.json();
        throw new Error(error.error || "Error al eliminar de favoritos");
      } else {
        throw new Error(`Error del servidor (${res.status})`);
      }
    }
  },
};