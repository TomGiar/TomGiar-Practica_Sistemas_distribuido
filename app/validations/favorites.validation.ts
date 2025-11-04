// Esquema de validación con Yup para el formulario

import * as Yup from "yup";

export const favoriteFormSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, "El apodo debe tener al menos 2 caracteres")
    .max(30, "El apodo no puede tener más de 30 caracteres")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apodo solo puede contener letras y espacios"
    )
    .required("El apodo es obligatorio"),

  description: Yup.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(200, "La descripción no puede tener más de 200 caracteres")
    .required("La descripción es obligatoria"),
});

export interface FavoriteFormValues {
  nickname: string;
  description: string;
}