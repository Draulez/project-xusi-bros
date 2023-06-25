
fetch('http://127.0.0.1:3000/usuarios')
  .then(response => response.json())
  .then(data => {
    // Aquí puedes utilizar los datos recibidos de la base de datos
    console.log(data);
  })
  .catch(error => {
    // Manejo de errores en caso de que ocurra algún problema
    console.error('Error al obtener los usuarios:', error);
  });
