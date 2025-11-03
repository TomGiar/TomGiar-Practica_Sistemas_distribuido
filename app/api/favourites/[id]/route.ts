// Esta API Route maneja la ELIMINACIÓN de favoritos

import { NextResponse } from "next/server";
import { db } from "@/lib/database";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * DELETE /api/favorites/[id]
 * Elimina un Pokémon de favoritos
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // 1. Obtener y validar el parámetro
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    // 2. Validar que sea un número válido
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "El ID debe ser un número positivo válido" },
        { status: 400 }
      );
    }

    // 3. Intentar eliminar
    const deleted = await db.delete(id);

    // 4. Si no existía, retornar 404
    if (!deleted) {
      return NextResponse.json(
        { error: "Pokémon no encontrado en favoritos" },
        { status: 404 } // Not Found
      );
    }

    // 5. Retornar éxito
    return NextResponse.json(
      { message: "Pokémon eliminado de favoritos correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/favorites/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}