import { getPokemonList } from "@/lib/api";
import { PokemonGrid } from "@/components/PokemonGrid";

export default async function HomePage() {
  // Esta llamada se ejecuta en el SERVIDOR
  // Next.js espera a que se resuelva antes de enviar el HTML
  const pokemonData = await getPokemonList(30, 0);

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Lista de Pokémon
        </h1>
        <p className="text-gray-600">
          Haz clic en cualquier Pokémon para ver más detalles
        </p>
        <p className="text-sm text-gray-500">
          Mostrando {pokemonData.results.length} de {pokemonData.count} Pokémon
        </p>
      </div>

      {/* Grid de Pokémon */}
      <PokemonGrid pokemons={pokemonData.results} />
    </div>
  );
}
