//sessionStorage.setItem("usuario", "pues si");

const path = "http://127.0.0.1:3000";

localStorage.setItem("username", null);
localStorage.setItem("password", null);

console.log(localStorage.getItem("username"));
console.log(localStorage.getItem("password"));
// Este bloque permite displayear las clases need_log y no_need_log dependiendo de si el usuario esta logeado o no.

if (localStorage.getItem("usuario") === null || localStorage.getItem("password") === null)
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
    let log = document.getElementById("login");
    log.style.display = "block";
    log.classList.add("fade-in");
  }

  function hideLogin() 
  {
    document.getElementById("login").style.display = "none";
  }

  //Código referente a mostar y ocultar la ventana de registro
  function showSignUp()
  {
    event.preventDefault();
    document.getElementById("login").style.display = "none";
    let sign = document.getElementById("signUp");
    sign.style.display = "block";
    sign.classList.add("fade-in");
  }
  
  function hideSignUp()
  {
    document.getElementById("signUp").style.display = "none";
  }

//Este listener se encarga de cerrar las ventanas de login y registro si se clickea en el elemento modal, 
//quiere decir, fuera de los recuadros respectivamente.

  document.addEventListener("DOMContentLoaded", function()
  {
    const formulario = document.getElementsByClassName('modal');

    for (let i = 0; i < formulario.length; i++) 
    {
      formulario[i].addEventListener("click", function(event)
      {
        let closeTargetSelector = formulario[i].getAttribute("data-close-target");

        if (event.target.matches(closeTargetSelector)) {
          // Cierra el modelo o realiza otras acciones que desees
          formulario[i].style.display = 'none';
        }
      })
    }

  })


 
  fetch(path + '/usuarios')
    .then(response => response.json())
    .then(data => {
      // Aquí puedes utilizar los datos recibidos de la base de datos
      console.log(data);
    })
    .catch(error => {
      // Manejo de errores en caso de que ocurra algún problema
      console.error('Error al obtener los usuarios:', error);
    });

  //Logica de manejo de todo lo relacionado con el login y el registro
  document.addEventListener('DOMContentLoaded', function() {

    //Para el login
    const formularioLogin = document.getElementById('loginForm');
  
    formularioLogin.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const datos = {
        username: username,
        password: password
      };
  
      // Enviar los datos al backend
      fetch(path + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
      .then(response => response.json())
      .then(data => {data.forEach(elemento =>{
        document.getElementById("errorLogin").style.display="visible";

        localStorage.setItem("username", elemento.nombre);
        localStorage.setItem("password", elemento.password);
      })
        if (data.length == 0)
        {
          console.log("a");
          let log = document.getElementById("errorLogin");
          log.classList.add("visible");
        }
        else
        {
          window.location.href = '/src/miCuenta.html';
        }

        console.log(localStorage.getItem("username"));
        console.log(localStorage.getItem("password"));
        
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error:', error);
      });
    });


    //Para el registro
    const formularioSignUp = document.getElementById('signUpForm');

    formularioSignUp.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('newUsername').value;
      const apellidos = document.getElementById('apellidos').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('newPassword').value;
  
      const datos = {
        username: username,
        apellidos: apellidos,
        email: email,
        password: password
      };
  
      // Enviar los datos al backend
      fetch(path + '/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
      .then(response => {
        if (response.ok)
        {
          return response.json();
        }
        else
        {
          let msgErrorSignUp = document.getElementById("errorSignUp");
          msgErrorSignUp.style.display = "block";
          switch(response.status){
            case 400:
              msgErrorSignUp.innerHTML = "Correo en uso, utilice otro.";
              break;
            default:
              msgErrorSignUp.innerHTML = "Error durante el registro";
              break;
          }
          
          
          throw new Error(`HTTP error! status ${response.status}`);
        }
      })
      .then(data => {
        console.log(data.username);

        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password);

        console.log(localStorage.getItem("username"));
        console.log(localStorage.getItem("password"));
        
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error:', error);
      });
    });
  });
  
