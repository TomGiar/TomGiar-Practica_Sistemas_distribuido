// Botón reutilizable para agregar/quitar de favoritos

"use client";

import { useAddFavorite, useRemoveFavorite, useIsFavorite } from "@/app/hooks/useFavorites";
import { useState } from "react";

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
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const isLoading = addMutation.isPending || removeMutation.isPending;

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar navegación si está dentro de un Link
    e.stopPropagation();

    try {
      if (isFavorite) {
        await removeMutation.mutateAsync(pokemonId);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        await addMutation.mutateAsync({
          id: pokemonId,
          name: pokemonName,
          imageUrl: pokemonImageUrl,
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`
          px-4 py-2 rounded-lg font-semibold transition-all duration-200
          flex items-center space-x-2
          ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
          disabled:hover:scale-100
        `}
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
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
            <span>...</span>
          </>
        ) : (
          <>
            <span className="text-xl">{isFavorite ? "❤️" : "🤍"}</span>
            <span>{isFavorite ? "Favorito" : "Agregar"}</span>
          </>
        )}
      </button>


      {/* Mensaje de error */}
      {showError && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap shadow-lg z-50">
          Error al procesar
        </div>
      )}
    </div>
  );
}