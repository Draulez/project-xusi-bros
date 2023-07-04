const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

// Configura los detalles de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto por la dirección de tu servidor MariaDB
  user: 'root', // Cambia esto por tu nombre de usuario de la base de datos
  password: 'xusi', // Cambia esto por tu contraseña de la base de datos
  database: 'xusi-bros', // Cambia esto por el nombre de tu base de datos
});

// Realiza la conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Código necesario para dar permiso al port que utiliza liverserver de poder mandar request.
const corsOptions = {
  origin: ['http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

// Añade la conexión a la base de datos al objeto 'request' para que esté disponible en las rutas
app.use((req, res, next) => {
  req.db = connection;
  next();
});

// Analizar solicitudes con contenido de tipo application/json
app.use(express.json());

// Analizar solicitudes con contenido de tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Resto del código del servidor...

// Cierra la conexión a la base de datos cuando se detenga el servidor
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

// Ruta para obtener los usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    } else {
      res.json(results);
    }
  });
});
// Manejar la solicitud de envío del formulario del login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let sql = "SELECT * FROM usuarios WHERE nombre = ? AND password = ?";
  const values = [username, password];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    } else {
      res.json(results);
    }
  });
});

// Manejar la solicitud de envío del formulario del login
app.post('/signUp', (req, res) => {
  const username = req.body.username;
  const apellidos = req.body.apellidos;
  const email = req.body.email;
  const password = req.body.password;

  let sql = "INSERT INTO usuarios (nombre, apellidos, correo, password) VALUES (?,?,?,?)";
  const values = [username, apellidos, email, password];
  
  connection.query(sql, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY')
      {
        res.status(400).json({ error: 'El nombre de usuario o correo electrónico ya existe' });
      }
      else
      {
        console.error('Error al insertar nuevo usuario:', error);
        res.status(500).json({ error: 'Error al insertar nuevo usuario, nombre de usuario ya existente.' });
      }
    } else {
      const response = {
        username: username,
        password: password,
        msg: "Usuario registrado correctamente."
      }

      res.json(response);
    }
  });
});


// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});


