// Esta clase maneja TODAS las operaciones con el archivo JSON
// Solo funciona en el SERVIDOR (usa Node.js fs module)

import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

export interface FavoritePokemon {
  id: number;
  name: string;
  imageUrl: string;
  nickname: string;        // ← NUEVO: Apodo personalizado
  description: string;     // ← NUEVO: Descripción personalizada
  addedAt: string;
}

class Database {
  private async readDB(): Promise<FavoritePokemon[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeDB(data: FavoritePokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  async getAll(): Promise<FavoritePokemon[]> {
    return await this.readDB();
  }

  async getById(id: number): Promise<FavoritePokemon | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  async create(
    pokemon: Omit<FavoritePokemon, "addedAt">
  ): Promise<FavoritePokemon | null> {
    const data = await this.readDB();

    const exists = data.some((item) => item.id === pokemon.id);
    if (exists) {
      return null;
    }

    const newFavorite: FavoritePokemon = {
      ...pokemon,
      addedAt: new Date().toISOString(),
    };

    data.push(newFavorite);
    await this.writeDB(data);
    return newFavorite;
  }

  async delete(id: number): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;
    const filtered = data.filter((item) => item.id !== id);

    if (filtered.length === initialLength) {
      return false;
    }

    await this.writeDB(filtered);
    return true;
  }

  async update(
    id: number,
    updates: Partial<Omit<FavoritePokemon, "id" | "addedAt">>
  ): Promise<FavoritePokemon | null> {
    const data = await this.readDB();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    data[index] = { ...data[index], ...updates };
    await this.writeDB(data);
    return data[index];
  }
}

export const db = new Database();