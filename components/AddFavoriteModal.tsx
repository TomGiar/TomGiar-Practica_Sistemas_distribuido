// Modal con formulario para agregar favoritos

"use client";

import { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { favoriteFormSchema, FavoriteFormValues } from "@/app/validations/favorites.validation";
import { useAddFavorite } from "@/app/hooks/useFavorites";
import Image from "next/image";

// Configurar el elemento raíz para el modal (accesibilidad)
if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

interface AddFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonId: number;
  pokemonName: string;
  pokemonImageUrl: string;
}

export function AddFavoriteModal({
  isOpen,
  onClose,
  pokemonId,
  pokemonName,
  pokemonImageUrl,
}: AddFavoriteModalProps) {
  const addMutation = useAddFavorite();
  const [serverError, setServerError] = useState<string>("");

  const initialValues: FavoriteFormValues = {
    nickname: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1), // Capitalizado por defecto
    description: "",
  };

  const handleSubmit = async (
    values: FavoriteFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setServerError("");
      await addMutation.mutateAsync({
        id: pokemonId,
        name: pokemonName,
        imageUrl: pokemonImageUrl,
        nickname: values.nickname,
        description: values.description,
      });

      // Si todo salió bien, cerrar modal y resetear
      resetForm();
      onClose();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Error al agregar");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setServerError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Agregar a Favoritos"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Agregar a Favoritos
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Imagen del Pokémon */}
        <div className="flex flex-col items-center mb-6 bg-gray-50 rounded-lg p-4">
          <img
            src={pokemonImageUrl}
            alt={pokemonName}
            width={120}
            height={120}
            className="object-contain"
          />
          <p className="text-lg font-semibold text-gray-700 capitalize mt-2">
            {pokemonName}
          </p>
        </div>

        {/* Formulario con Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={favoriteFormSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, isValid, dirty, errors, touched }) => (
            <Form className="space-y-4">
              {/* Campo: Apodo */}
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Apodo personalizado *
                </label>
                <Field
                  type="text"
                  id="nickname"
                  name="nickname"
                  placeholder="Ej: Mi Pikachu favorito"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.nickname && touched.nickname
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="nickname"
                  component="div"
                  className="text-red-600 text-sm mt-1 flex items-center"
                >
                  {(msg) => (
                    <>
                      <span className="mr-1">⚠️</span>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>

              {/* Campo: Descripción */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descripción *
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Escribe por qué este Pokémon es especial para ti..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    errors.description && touched.description
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm mt-1 flex items-center"
                >
                  {(msg) => (
                    <>
                      <span className="mr-1">⚠️</span>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>

              {/* Error del servidor */}
              {serverError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm flex items-center">
                    <span className="mr-2">❌</span>
                    {serverError}
                  </p>
                </div>
              )}

              {/* Botones */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-white transition-all ${
                    isSubmitting || !isValid || !dirty
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 active:scale-95"
                  }`}
                  title={
                    !dirty
                      ? "Modifica al menos un campo"
                      : !isValid
                      ? "Corrige los errores del formulario"
                      : ""
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Guardando...
                    </span>
                  ) : (
                    "❤️ Agregar a Favoritos"
                  )}
                </button>
              </div>

              {/* Indicadores de estado del formulario */}
              <div className="text-xs text-gray-500 space-y-1 pt-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dirty ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                  <span>Formulario modificado: {dirty ? "Sí" : "No"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isValid ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span>Validación: {isValid ? "Correcta" : "Con errores"}</span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}