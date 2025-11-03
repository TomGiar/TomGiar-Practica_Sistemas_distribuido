// Esta clase maneja TODAS las operaciones con el archivo JSON
// Solo funciona en el SERVIDOR (usa Node.js fs module)

import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

export interface FavoritePokemon {
  id: number;
  name: string;
  imageUrl: string;
  addedAt: string;
}

class Database {
  /**
   * Lee el archivo database.json
   * Si no existe, retorna array vacío
   */
  private async readDB(): Promise<FavoritePokemon[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, retornar []
      return [];
    }
  }

  /**
   * Escribe datos en database.json
   */
  private async writeDB(data: FavoritePokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  /**
   * Obtiene todos los favoritos
   */
  async getAll(): Promise<FavoritePokemon[]> {
    return await this.readDB();
  }

  /**
   * Obtiene un favorito por ID
   */
  async getById(id: number): Promise<FavoritePokemon | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  /**
   * Agrega un Pokémon a favoritos
   * Retorna el favorito creado o null si ya existe
   */
  async create(pokemon: Omit<FavoritePokemon, "addedAt">
  ): Promise<FavoritePokemon | null> {
    const data = await this.readDB();

    // Verificar si ya existe
    const exists = data.some((item) => item.id === pokemon.id);
    if (exists) {
      return null; // Ya existe
    }

    const newFavorite: FavoritePokemon = {
      ...pokemon,
      addedAt: new Date().toISOString()
    };

    data.push(newFavorite);
    await this.writeDB(data);
    return newFavorite;
  }

  /**
   * Elimina un favorito por ID
   * Retorna true si se eliminó, false si no existía
   */
  async delete(id: number): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;
    const filtered = data.filter((item) => item.id !== id);

    if (filtered.length === initialLength) {
      return false; // No se encontró
    }

    await this.writeDB(filtered);
    return true;
  }
}

// Exportamos una instancia única (Singleton pattern)
export const db = new Database();
