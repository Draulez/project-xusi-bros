//sessionStorage.setItem("usuario", "pues si");


// Este bloque permite displayear las clases need_log y no_need_log dependiendo de si el usuario esta logeado o no.

if (sessionStorage.getItem("usuario") === null || sessionStorage.getItem("password"))
  {
    let elementosSinLogear = document.getElementsByClassName("no_need_log");
    console.log(elementosSinLogear);
    for (let i = 0; i < elementosSinLogear.length; i++) 
    {
      elementosSinLogear[i].classList.add('visible');
    }
  }
  else
  {
    let elementosLogeados = document.getElementsByClassName("need_log");
    console.log(elementosLogeados);
    for (let i = 0; i < elementosLogeados.length; i++) 
    {
      elementosLogeados[i].classList.add('visible');
    }
  }

// Codigo referente a mostrar y ocultar la ventana del login
  function showLogin() 
  {
    var log = document.getElementById("login");
    log.style.display = "block";
    log.classList.add("fade-in");
  }

  function hideLogin() 
  {
    document.getElementById("login").style.display = "none";
  }

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
