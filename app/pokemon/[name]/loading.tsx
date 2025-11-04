// Skeleton para el detalle del Pokémon

export default function PokemonDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-6"></div>
      
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
            <div className="w-64 h-64 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16 mt-4"></div>
          </div>
          
          {/* Columna derecha */}
          <div className="space-y-6">
            <div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-48 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded-full animate-pulse w-20"></div>
                <div className="h-8 bg-gray-200 rounded-full animate-pulse w-20"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-3"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>
                <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>
              </div>
            </div>
            
            <div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-40 mb-3"></div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}