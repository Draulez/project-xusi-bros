# project-xusi-bros

#  Node.js

Para la instalación de dependencias y librerias es necesario node.js y el comando "npm install" en el repositorio donde se haya guardado el proyecto y además donde este alojado el package.json.

#  Live Server

Para crear un entorno de pruebas dinámico, Visual Studio Code cuenta con una extensión, Liver Server que permite abrir un tunel entre el código y el navegador para compilar y generar
la web de forma dínamica y actulizando los cambios cada vez que guardemos el código. Por defecto hará uso del puerto 5500 y se mantendrá así.

#  MariaDB
Para la base de datos, en mi caso se ha utilizado MariaDB. Instalación en https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.2.0&os=windows&cpu=x86_64&pkg=msi&m=fe_up_pt, se hace
una configuracón inicial (cualquier base que se cree hará uso del puerto 3306) y junto a su instalación se crea HeidiSQL una aplicación para gestionar las bases de datos que creemos de MariaDB, se crea explciitamente una nueva base de datos 
con el nombre "xusi-bros", en mi caso y para facilitar la configuración posterior del servidor. Esta base tendra un usuario "root" y contraseña "xusi" y una vez creada aparecerán los esquemas basicos. 
Se crea un nuevo esquema con el nombre "xusi-bros". 
Se debe reiniciar el ordenador y en principio el servicio se iniciazará cada vez que se encienda el ordenador.

#  DBeaver
Para facilit
ar el manejo y agregar una interfaz visualmente amigable se hace uso de DBeaver un programa que vinculará nuestra base de datos y podremos manejar sus datos mediante comando 
o la interfaz que nos proporciona.
Link de descarga: https://dbeaver.io/download/
Para agregar la conexion en DBever, arriba a la izquierda de la aplicación sale la opción de agregar nueva conexion. Se indica el uso de MariaDB y se rellenan las credenciales.
Nombre: "xusi-bros" Usuario: "root" Contraseña: "xusi".
El proyecto cuenta con un directorio DataBase que contiene el archivo "Scripts.sql" el cual contendrá todas las querys para inicializar, añadir, modificar... todos las tablas y su contenido.
Se deberan ejecutar todos para asegurar la compatibililidad entre los diferentes colaboradores.

En principio con esto ya podemos entrar a la parte del código.

#  Express.js

Para crear el backend de la aplicación que sea capaz de manejar las distintas peticiones http que puedan ser mandadas en la web se crea un servidor sencillo y básico mediante la librería de JavaScript Express.js que en principio será
agregada al proyecto de forma local mediante el comando npm install mencionado al principio.
Este servidor hace uso del puerto 3000 para manejar las peticiones. Además, se ha insertado en el código privilegios para el puerto 5500, que será el que hace uso la extension de LiveServer
de Visual Studio Code para abrir un tuenl entre el código y el navegador.

IMPORTANTE: Sera necesario que cada vez que queramos hacer pruebas en la página, debemos iniciar el servidor express con "node server.js" en el directorio del proyecto





