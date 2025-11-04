// Botón que ahora abre el modal en lugar de agregar directamente

"use client";

import { useState } from "react";
import { useIsFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";
import { AddFavoriteModal } from "./AddFavoriteModal";

interface FavoriteButtonProps {
  pokemonId: number;
  pokemonName: string;
  pokemonImageUrl: string;
}

export function FavoriteButton({
  pokemonId,
  pokemonName,
  pokemonImageUrl,
}: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(pokemonId);
  const removeMutation = useRemoveFavorite();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      // Si ya es favorito, eliminar directamente
      if (confirm(`¿Quitar a ${pokemonName} de favoritos?`)) {
        removeMutation.mutate(pokemonId);
      }
    } else {
      // Si no es favorito, abrir modal
      setIsModalOpen(true);
    }
  };

  const isLoading = removeMutation.isPending;

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          w-full px-4 py-2.5 rounded-lg font-semibold 
          transition-all duration-200
          flex items-center justify-center gap-2
          ${
            isFavorite
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
              : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow"
          }
          ${isLoading ? "opacity-60 cursor-wait" : "hover:scale-105 active:scale-95"}
          disabled:pointer-events-none
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm">Eliminando...</span>
          </>
        ) : (
          <>
            <span className="text-xl">{isFavorite ? "❤️" : "🤍"}</span>
            <span className="text-sm font-bold">
              {isFavorite ? "En Favoritos" : "Agregar"}
            </span>
          </>
        )}
      </button>

      {/* Modal de formulario */}
      <AddFavoriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemonId={pokemonId}
        pokemonName={pokemonName}
        pokemonImageUrl={pokemonImageUrl}
      />
    </>
  );
}
