//Importación de los componentes a utilizar en la página
import Imagen from "@/componentes/Imagen";
import Titulo from "@/componentes/Titulo";
import Parrafo from "@/componentes/Parrafo";
import Boton from "@/componentes/BotonInter";


// Componente principal de la página raíz ("/").
// Next.js renderiza este componente cuando el usuario visita la ruta "/".
export default function Home() {// Se exporta la función Home como el componente principal de esta página.
  return (
    <main className="p-5 font-sans bg-gray-900 text-white min-h-screen"> 
       <Titulo texto="Titulo de prueba: Moriste en madrid" />

       <Parrafo>
          Parrafo de prueba: Aprobame la actividad 3 gil.
      </Parrafo>

      <Imagen src="/Bleach-3840x2160-10567.png" alt="Una foto de prueba" ancho={300} alto={200} href= "https://www.youtube.com/watch?v=wW9TwZdWpjw&list=PLWgzYL0xXn_gN6TEiOVrX4xYzLIg-0bj0" />

      <Parrafo>
        Otro parrafo de prueba: Sos un genio Tite, la tenes adentro Oda.
      </Parrafo>
      
       <h2>Prueba botón interactivo:</h2>
      <Boton />

      <footer style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <Parrafo>Página de prueba - nada puede malir sal - FI UNMDP</Parrafo>
      </footer>
      
    </main>
  );
}