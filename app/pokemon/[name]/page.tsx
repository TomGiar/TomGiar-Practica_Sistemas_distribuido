import { getPokemonDetail } from "@/lib/api";
import { TypeBadge } from "@/components/TypeBadge";
//import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Esta interfaz define qué props recibe la página
interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: PageProps) {
  // En Server Components, params es una Promise que debemos esperar
  const { name } = await params;

  let pokemon;
  try {
    // Obtenemos los detalles del Pokémon
    pokemon = await getPokemonDetail(name);
  } catch (error) {
    // Si no se encuentra, mostramos la página 404
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Botón para volver */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        ← Volver a la lista
      </Link>

      {/* Card principal del Pokémon */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Columna izquierda - Imagen */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={300}
              height={300}
              className="object-contain"
            />
            <p className="text-gray-500 text-lg mt-4">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
          </div>

          {/* Columna derecha - Información */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 capitalize mb-2">
                {pokemon.name}
              </h1>
              <div className="flex gap-2">
                {pokemon.types.map((typeInfo) => (
                  <TypeBadge key={typeInfo.slot} type={typeInfo.type.name} />
                ))}
              </div>
            </div>

            {/* Características físicas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Altura</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pokemon.height / 10} m
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Peso</p>
                <p className="text-2xl font-bold text-green-600">
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Estadísticas Base
              </h2>
              <div className="space-y-2">
                {pokemon.stats.map((statInfo) => (
                  <div key={statInfo.stat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize">
                        {statInfo.stat.name.replace("-", " ")}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {statInfo.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((statInfo.base_stat / 255) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}