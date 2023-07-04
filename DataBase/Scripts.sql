-- Descripción: SQL SCRIPTS
-- Autor: xusi-bros


-- ==============================================
-- Script SQL
-- ==============================================

-- ----------------------------------------------
-- Creación de tabla usuarios
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `correo` INT(11) UNIQUE,
  'password' INT(16) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ----------------------------------------------
-- Inserción de datos
-- ----------------------------------------------
INSERT INTO `nombre_tabla` (`nombre`, `apellidos`, `correo`, `password`) VALUES
  ('John', 'Doe', 'ejemplo@gmail.com', 1234),
  ('Jane', 'Smith', 'ejemplo2@gmail.com', 1234);

-- ----------------------------------------------
-- Consulta de datos
-- ----------------------------------------------
SELECT * FROM `nombre_tabla`;

-- ----------------------------------------------
-- Modificación de datos
-- ----------------------------------------------
UPDATE `nombre_tabla` SET `edad` = 35 WHERE `id` = 1;

-- ----------------------------------------------
-- Eliminación de datos
-- ----------------------------------------------
DELETE FROM `nombre_tabla` WHERE `id` = 2;

