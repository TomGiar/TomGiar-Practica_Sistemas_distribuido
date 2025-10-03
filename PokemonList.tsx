"use client"; // Para renderizar el componente en el cliente (no en el servidor).
import { useState, useEffect } from "react";
import axios from "axios";
//const axios = require('axios');

// Interfaz para definir la estructura de un Pokémon
interface Pokemon {
  name: string;
  url: string;
  id: number;
  sprite: string;
  clickCount: number;
}

// Componente para cada item individual de Pokémon
interface PokemonItemProps {
  pokemon: Pokemon;
  onPokemonClick: (id: number) => void;
}

function PokemonItem({ pokemon, onPokemonClick }: PokemonItemProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 m-2 bg-white shadow-md hover:shadow-lg transition-shadow">
      <button 
        onClick={() => onPokemonClick(pokemon.id)}
        className="w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
      >
        {/* Imagen del Pokémon */}
        <div className="flex items-center space-x-4">
          <img 
            src={pokemon.sprite} 
            alt={pokemon.name}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 capitalize">
              {pokemon.name}
            </h3>
            <p className="text-sm text-gray-600">
              ID: #{pokemon.id}
            </p>
            <p className="text-sm text-blue-600 font-medium">
              Clicks: {pokemon.clickCount}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

// Componente principal PokemonList
export default function PokemonList() {
  // Estado para almacenar la lista de Pokémons
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // Estado para manejar el loading
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para manejar errores
  const [error, setError] = useState<string | null>(null);

  // Función para obtener detalles adicionales de cada Pokémon
  const fetchPokemonDetails = async (url: string, name: string): Promise<Pokemon> => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      //const response = await fetch(url);
      //const data = await response.json();
      
      return {
        name,
        url,
        id: data.id,
        sprite: data.sprites.front_default || '/api/placeholder/64/64',
        clickCount: 0
      };
    } catch (error) {
      console.error(`Error fetching details for ${name}:`, error);
      // Retorna un Pokémon básico si falla
      return {
        name,
        url,
        id: Math.random(), // ID temporal
        sprite: '/api/placeholder/64/64',
        clickCount: 0
      };
    }
  };

  // useEffect para cargar los Pokémons al montar el componente
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Llamada a la API de PokeAPI para obtener los primeros 20 Pokémons
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        
        const data = await response.data;
        
        // Obtener detalles de cada Pokémon
        const pokemonPromises = data.results.map((pokemon: {name: string, url: string}) => 
          fetchPokemonDetails(pokemon.url, pokemon.name)
        );
        
        const pokemonDetails = await Promise.all(pokemonPromises);
        
        setPokemons(pokemonDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar Pokémons');
        console.error('Error fetching Pokémons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []); // Array vacío = se ejecuta solo al montar

  // Función para manejar el click en un Pokémon
  const handlePokemonClick = (pokemonId: number) => {
    setPokemons(prevPokemons => 
      prevPokemons.map(pokemon => 
        pokemon.id === pokemonId 
          ? { ...pokemon, clickCount: pokemon.clickCount + 1 }
          : pokemon
      )
    );
  };

  // Calcular estadísticas
  const totalClicks = pokemons.reduce((sum, pokemon) => sum + pokemon.clickCount, 0);
  const mostClickedPokemon = pokemons.reduce((prev, current) => 
    prev.clickCount > current.clickCount ? prev : current, 
    pokemons[0] || { name: 'Ninguno', clickCount: 0 }
  );

  // Renderizado condicional basado en el estado
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando Pokémons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
          <p className="text-red-600 font-semibold mb-2">Error al cargar los datos</p>
          <p className="text-red-500 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white-800 mb-4">
          🔴 Lista de Pokémons
        </h1>
        <p className="text-white-600">
          Haz click en cualquier Pokémon para incrementar su contador
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
          <h3 className="font-semibold text-blue-800">Total de Pokémons</h3>
          <p className="text-2xl font-bold text-blue-600">{pokemons.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
          <h3 className="font-semibold text-green-800">Total de Clicks</h3>
          <p className="text-2xl font-bold text-green-600">{totalClicks}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
          <h3 className="font-semibold text-yellow-800">Más Clickeado</h3>
          <p className="text-lg font-bold text-yellow-600 capitalize">
            {mostClickedPokemon.name} ({mostClickedPokemon.clickCount})
          </p>
        </div>
      </div>

      {/* Lista de Pokémons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonItem 
            key={pokemon.id} // Key única para cada Pokémon
            pokemon={pokemon}
            onPokemonClick={handlePokemonClick}
          />
        ))}
      </div>

    </div>
  );
}