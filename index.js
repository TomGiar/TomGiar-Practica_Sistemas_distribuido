
const axios = require('axios');

async function obtenerUsuarios(cantidadUsuarios) {
 try{
    const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
    return responseUsers.data.filter(user => (user.id <= cantidadUsuarios));
  }

  catch(error){
    console.error('Error al obtener los usuarios:', error.message);
  }
}

async function obtenerCantPublicacionesUsuario(usuario) {
  try {
    const reponsePublicaciones = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`);
    return reponsePublicaciones.data.length;
  }

  catch(error){
    console.error('Error al obtener las publicaciones:', error.message);
  }
}

async function ejecucionParalela(usuarios) {
  try{
    const promesasDePublicaciones = usuarios.map(usuarios => obtenerCantPublicacionesUsuario(usuarios));
    const publicaciones = await Promise.all(promesasDePublicaciones);
    publicaciones.forEach((cantidad, index) => {
      console.log(`Nombre del usuario: ${usuarios[index].name}`);
      console.log(`Cantidad de publicaciones: ${cantidad}`);
    });
  }

  catch(error){
    console.error('Error en la ejecucion paralela:', error.message);
  };
}

async function ejecucionSecuencial(usuarios) {
  try{
    let cantPublicaciones;
    for(let i=0 ; i<usuarios.length; i++){
      cantPublicaciones = await obtenerCantPublicacionesUsuario(usuarios[i]);
      console.log(`Nombre del usuario: ${usuarios[i].name}`);
      console.log(`Cantidad de publicaciones: ${cantPublicaciones}`);
    }
  }

  catch(error){
    console.error('Error en la ejecucion secuencial:', error.message);
  }
}

const cantidadUsuarios = 3;

obtenerUsuarios(cantidadUsuarios)
  .then((usuarios) => {
    console.log("--- Ejecucion Secuencial ---");
    console.time("Tiempo de ejecucion secuencial");
    return ejecucionSecuencial(usuarios).then(() => usuarios);
  })
  .then((usuarios) => {
    console.log("--- Fin Ejecucion Secuencial ---");
    console.timeEnd("Tiempo de ejecucion secuencial");
    console.log("\n"); // Salto de linea para mejor visualizacion
    console.log("--- Ejecucion Paralela ---");
    console.time("Tiempo de ejecucion paralela");
    return ejecucionParalela(usuarios);
  })
  .then (() => {
    console.log("--- Fin Ejecucion Paralela ---");
    console.timeEnd("Tiempo de ejecucion paralela");
  })
  .catch((error) => {
    console.error('Error en el flujo principal:', error.message);
  });

