// Mostrar los nuevos campos en la página de favoritos

"use client";

import { useFavorites } from "@/app/hooks/useFavorites";
import { FavoriteButton } from "@/components/FavoriteButton";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FavoritesPage() {
  const { data: favorites, isLoading, error } = useFavorites();

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-800 font-semibold mb-2">Error al cargar favoritos</h3>
          <p className="text-red-600 text-sm">
            {error instanceof Error ? error.message : "Error desconocido"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">❤️ Mis Favoritos</h1>
        <p className="text-gray-600">Tus Pokémon favoritos con notas personalizadas</p>
        {!isLoading && favorites && (
          <p className="text-sm text-gray-500">
            {favorites.length} {favorites.length === 1 ? "favorito" : "favoritos"}
          </p>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <Skeleton height={192} className="mb-4" />
              <Skeleton height={28} className="mb-2" />
              <Skeleton height={20} count={3} className="mb-4" />
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && favorites && favorites.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-500 mb-6">
            Ve a la lista principal y agrega tus Pokémon favoritos con notas personalizadas
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Ir a la lista principal
          </Link>
        </div>
      )}

      {!isLoading && favorites && favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="border border-gray-300 rounded-xl p-5 bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/pokemon/${favorite.name}`}>
                <div className="relative h-40 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center group">
                  <img
                    src={favorite.imageUrl}
                    alt={favorite.name}
                    width={120}
                    height={120}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-3 mb-4">
                  {/* Apodo personalizado */}
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    {favorite.nickname}
                  </h3>

                  {/* Nombre original */}
                  <p className="text-sm text-gray-500 text-center capitalize">
                    {favorite.name} • #{favorite.id.toString().padStart(3, "0")}
                  </p>

                  {/* Descripción personalizada */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-sm text-gray-700 italic line-clamp-3">
                      "{favorite.description}"
                    </p>
                  </div>

                  {/* Fecha de agregado */}
                  <p className="text-xs text-gray-400 text-center">
                    Agregado: {new Date(favorite.addedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>

              <FavoriteButton
                pokemonId={favorite.id}
                pokemonName={favorite.name}
                pokemonImageUrl={favorite.imageUrl}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
