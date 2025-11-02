// Card individual para cada Pokémon en la lista
"use client";

import Link from "next/link";
import Image from "@/node_modules/next/image";

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  // Extraemos el ID de la URL para obtener la imagen
  const pokemonId = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

   return (
    <Link href={`/pokemon/${name}`}>
      <div className="border border-gray-300 rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white cursor-pointer h-full">
        <div className="relative h-48 mb-4 bg-gray-50 rounded-lg flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800 capitalize text-center">
            {name}
          </h3>
          <p className="text-sm text-gray-500 text-center">
            #{pokemonId?.padStart(3, "0")}
          </p>
        </div>
      </div>
    </Link>
  );
}
