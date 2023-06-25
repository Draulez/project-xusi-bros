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


// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}`);
});


