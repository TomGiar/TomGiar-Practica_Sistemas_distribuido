// Esta API Route maneja la CREACIÓN de favoritos

import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validaciones
    if (!body.id || !body.name || !body.imageUrl) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: id, name, imageUrl" },
        { status: 400 }
      );
    }

    // ← NUEVO: Validar nickname y description
    if (!body.nickname || typeof body.nickname !== "string") {
      return NextResponse.json(
        { error: "El apodo es obligatorio y debe ser texto" },
        { status: 400 }
      );
    }

    if (body.nickname.trim().length < 2) {
      return NextResponse.json(
        { error: "El apodo debe tener al menos 2 caracteres" },
        { status: 400 }
      );
    }

    if (body.nickname.length > 30) {
      return NextResponse.json(
        { error: "El apodo no puede tener más de 30 caracteres" },
        { status: 400 }
      );
    }

    if (!body.description || typeof body.description !== "string") {
      return NextResponse.json(
        { error: "La descripción es obligatoria" },
        { status: 400 }
      );
    }

    if (body.description.trim().length < 10) {
      return NextResponse.json(
        { error: "La descripción debe tener al menos 10 caracteres" },
        { status: 400 }
      );
    }

    if (body.description.length > 200) {
      return NextResponse.json(
        { error: "La descripción no puede tener más de 200 caracteres" },
        { status: 400 }
      );
    }

    const newFavorite = await db.create({
      id: body.id,
      name: body.name,
      imageUrl: body.imageUrl,
      nickname: body.nickname.trim(),
      description: body.description.trim(),
    });

    if (!newFavorite) {
      return NextResponse.json(
        { error: "Este Pokémon ya está en favoritos" },
        { status: 409 }
      );
    }

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/favorites:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

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
