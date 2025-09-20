"use client"; // Para renderizar el componente en el cliente (no en el servidor).

import { useState } from "react"; // Se importa useState de React, que permite manejar estado dentro del componente.


export default function BotonLike() {
  const [likes, setCantLikes] = useState(0);  // Se define una variable de estado "likes" y su función modificadora "setLikes".
  return (
    <button 
      name="boton de like"
      onClick={() => setCantLikes(likes + 1)} 
       className="px-3 py-2 border border-gray-400 rounded-lg hover:bg-gray-700"
    >
      👍  apreta aca bobo {likes}
    </button>
  );
}