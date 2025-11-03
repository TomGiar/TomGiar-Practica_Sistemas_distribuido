// Skeleton personalizado para la lista mientras carga
// Usando react-loading-skeleton

"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PokemonListSkeletonProps {
  count?: number;
}

export function PokemonListSkeleton({ count = 30 }: PokemonListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white">
          <Skeleton height={192} className="mb-4" />
          <Skeleton height={28} className="mb-2" />
          <Skeleton height={20} width="60%" className="mx-auto" />
        </div>
      ))}
    </div>
  );
}
