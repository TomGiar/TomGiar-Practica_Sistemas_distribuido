"use client";

import { PokemonCard } from "./PokemonCard";
import { PokemonListItem } from "@/types/pokemon";

interface PokemonGridProps {
  pokemons: PokemonListItem[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  if (pokemons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No se encontraron Pokémons
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard 
          key={pokemon.name} 
          name={pokemon.name} 
          url={pokemon.url} 
        />
      ))}
    </div>
  );
}
