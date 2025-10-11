"use client";

import Link from "next/link";
//import Image from "next/image";

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  // Extraemos el ID de la URL para obtener la imagen
  // URL ejemplo: https://pokeapi.co/api/v2/pokemon/1/
  const pokemonId = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="border border-gray-300 rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white cursor-pointer">
        {/* Imagen del Pokémon */}
        <div className="relative h-48 mb-4 bg-gray-50 rounded-lg flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
            className="object-contain"
            //priority={false}
          />
        </div>

        {/* Información básica */}
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
