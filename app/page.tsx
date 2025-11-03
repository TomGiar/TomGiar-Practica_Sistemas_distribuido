// Esta página ahora es un Client Component simple
// que renderiza el componente PokemonList

"use client";

import { PokemonList } from "@/components/PokemonList";

export default function HomePage() {
  return <PokemonList />;
}
