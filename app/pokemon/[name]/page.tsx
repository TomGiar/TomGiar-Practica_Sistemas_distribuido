import { pokemonService } from "@/app/services/pokemon.service";
import { TypeBadge } from "@/components/TypeBadge";
import Link from "next/link";
import Image from "@/node_modules/next/image";
import { notFound } from "next/navigation";

// Este sigue siendo un SERVER COMPONENT
// Los datos se obtienen en el servidor antes de enviar el HTML

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { name } = await params;

  let pokemon;
  try {
    // Esta llamada se ejecuta en el SERVIDOR
    pokemon = await pokemonService.getDetail(name);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Botón para volver */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors font-semibold"
      >
        ← Volver a la lista
      </Link>

      {/* Card principal del Pokémon */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Columna izquierda - Imagen */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={300}
              height={300}
              className="object-contain drop-shadow-2xl"
            />
            <p className="text-gray-500 text-lg mt-4 font-semibold">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
          </div>

          {/* Columna derecha - Información */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 capitalize mb-4">
                {pokemon.name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((typeInfo) => (
                  <TypeBadge key={typeInfo.slot} type={typeInfo.type.name} />
                ))}
              </div>
            </div>

            {/* Características físicas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1 font-medium">Altura</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pokemon.height / 10} m
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1 font-medium">Peso</p>
                <p className="text-2xl font-bold text-green-600">
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>

            {/* Habilidades */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Habilidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((abilityInfo, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    {abilityInfo.ability.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Estadísticas Base
              </h2>
              <div className="space-y-3">
                {pokemon.stats.map((statInfo) => (
                  <div key={statInfo.stat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize font-medium">
                        {statInfo.stat.name.replace("-", " ")}
                      </span>
                      <span className="font-bold text-gray-800">
                        {statInfo.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
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

        {/* Footer del card */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <p className="text-sm text-gray-500 text-center">
            Datos renderizados del lado del servidor con Next.js
          </p>
        </div>
      </div>
    </div>
  );
}