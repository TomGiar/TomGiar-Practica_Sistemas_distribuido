// Card de Pokémon con botón de favoritos integrado

"use client";

import Link from "next/link";
import Image from "next/image";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const pokemonId = parseInt(url.split("/").filter(Boolean).pop() || "0");
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;


  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Link al detalle */}
      <Link href={`/pokemon/${name}`} className="flex-1">
        <div className="relative h-48 mb-4 bg-gray-50 rounded-lg flex items-center justify-center group">
          <img
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-bold text-gray-800 capitalize text-center">
            {name}
          </h3>
          <p className="text-sm text-gray-500 text-center">
            #{pokemonId.toString().padStart(3, "0")}
          </p>
        </div>
      </Link>

      {/* Botón de favoritos */}
      <div className="mt-auto">
        <FavoriteButton
          pokemonId={pokemonId}
          pokemonName={name}
          pokemonImageUrl={imageUrl}
        />
      </div>
    </div>
  );
}

