// Componente principal que muestra la lista de Pokémon
// Este es un CLIENT COMPONENT que usa React Query

"use client";

import { useState } from "react";
import { usePokemonList } from "../app/hooks/usePokemonList";
import { PokemonCard } from "./PokemonCard";
import { PokemonListSkeleton } from "./PokemonListSkeleton";

export function PokemonList() {
  // Estado para controlar cuántos Pokémon mostrar
  const [limit, setLimit] = useState(30);
  
  // Usamos nuestro hook personalizado de React Query
  const { data, isLoading, error, isFetching } = usePokemonList(limit);

  // Manejamos el estado de error
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-800 font-semibold mb-2">
            Error al cargar los Pokémon
          </h3>
          <p className="text-red-600 text-sm">
            {error instanceof Error ? error.message : "Error desconocido"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Función para cargar más Pokémon
  const handleLoadMore = () => {
    setLimit((prev) => prev + 30);
  };

  // Verificamos si hay más Pokémon disponibles
  const hasMore = data ? limit < data.count : false;

  return (
    <div className="space-y-8">
      {/* Header con información */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Lista de Pokémon
        </h1>
        <p className="text-gray-600">
          Haz clic en cualquier Pokémon para ver más detalles
        </p>
        {data && (
          <p className="text-sm text-gray-500">
            Mostrando {data.results.length} de {data.count} Pokémon totales
          </p>
        )}
        {isFetching && !isLoading && (
          <p className="text-sm text-blue-600 animate-pulse">
            Cargando más Pokémon...
          </p>
        )}
      </div>

      {/* Grid de Pokémon o Skeleton */}
      {isLoading ? (
        <PokemonListSkeleton count={limit} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.results.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>

          {/* Botón "Cargar Más" */}
          {hasMore && (
            <div className="flex justify-center pt-6">
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isFetching ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Cargando...</span>
                  </>
                ) : (
                  <span>Cargar Más Pokémon</span>
                )}
              </button>
            </div>
          )}

          {/* Mensaje cuando no hay más */}
          {!hasMore && data && (
            <div className="text-center text-gray-500 py-6">
              <p className="font-semibold">¡Has visto todos los Pokémon disponibles! 🎉</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
