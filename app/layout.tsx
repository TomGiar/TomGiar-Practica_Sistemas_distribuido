import Link from "next/link";
import { QueryProvider } from "./providers/QueryProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <QueryProvider>
          <header className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link 
                  href="/" 
                  className="text-2xl font-bold hover:text-yellow-300 transition-colors"
                >
                  🔴 PokéDex
                </Link>
                <div className="flex space-x-6">
                  <Link 
                    href="/" 
                    className="hover:text-yellow-300 transition-colors font-medium"
                  >
                    Lista Principal
                  </Link>
                  <Link 
                    href="/favourites" 
                    className="hover:text-yellow-300 transition-colors font-medium flex items-center space-x-1"
                  >
                    <span>❤️</span>
                    <span>Favoritos</span>
                  </Link>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-6 text-center">
              <p className="mb-2">
                PokéDex - Con sistema de favoritos usando API Routes
              </p>
              <p className="text-sm text-gray-400">
                Datos obtenidos de PokeAPI.co | Favoritos guardados localmente
              </p>
            </div>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}