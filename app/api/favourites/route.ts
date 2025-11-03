// Esta API Route maneja la CREACIÓN de favoritos

import { NextResponse } from "next/server";
import { db } from "@/lib/database";

/**
 * POST /api/favorites
 * Agrega un Pokémon a favoritos
 */
export async function POST(request: Request) {
  try {
    // 1. Parsear el body
    const body = await request.json();

    // 2. Validar campos obligatorios
    if (!body.id || !body.name || !body.imageUrl) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: id, name, imageUrl" },
        { status: 400 } // Bad Request
      );
    }

    // 3. Validar tipos de datos
    if (typeof body.id !== "number" || body.id <= 0) {
      return NextResponse.json(
        { error: "El campo 'id' debe ser un número positivo" },
        { status: 400 }
      );
    }

    if (typeof body.name !== "string" || body.name.trim() === "") {
      return NextResponse.json(
        { error: "El campo 'name' debe ser un string no vacío" },
        { status: 400 }
      );
    }

    if (typeof body.imageUrl !== "string" || !body.imageUrl.startsWith("http")) {
      return NextResponse.json(
        { error: "El campo 'imageUrl' debe ser una URL válida" },
        { status: 400 }
      );
    }

    // 4. Intentar crear el favorito
    const newFavorite = await db.create({
      id: body.id,
      name: body.name,
      imageUrl: body.imageUrl,
    });

    // 5. Si ya existía, retornar conflicto
    if (!newFavorite) {
      return NextResponse.json(
        { error: "Este Pokémon ya está en favoritos" },
        { status: 409 } // Conflict
      );
    }

    // 6. Retornar éxito
    return NextResponse.json(newFavorite, { status: 201 }); // Created
  } catch (error) {
    console.error("Error en POST /api/favorites:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/favorites
 * Obtiene todos los favoritos
 */
export async function GET() {
  try {
    const favorites = await db.getAll();
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/favorites:", error);
    return NextResponse.json(
      { error: "Error al obtener favoritos" },
      { status: 500 }
    );
  }
}