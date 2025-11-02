import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="text-8xl mb-4">🔍</div>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Pokémon no encontrado
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        El Pokémon que buscas no existe en la PokéDex o ha escapado a la naturaleza
      </p>
      <Link
        href="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
      >
        Volver a la PokéDex
      </Link>
    </div>
  );
}