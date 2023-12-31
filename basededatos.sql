drop database if exists codejqb;

create database codejqb;

ALTER DATABASE codejqb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use codejqb;

CREATE TABLE usuarios (
	email VARCHAR(100) NOT NULL,
	password VARCHAR(150) NOT NULL,
	token varchar(500) not null,
	PRIMARY KEY (email)
);

CREATE TABLE cursos (
	idCurso INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY (idCurso)
);

CREATE TABLE codigos (
	idCodigo INT UNSIGNED NOT NULL AUTO_INCREMENT,
	titulo varchar(200) not null,
	codigo mediumtext not null,
	indicaciones VARCHAR(1000),
	fechaHora DATETIME NOT NULL,
	cursos_idCurso INT UNSIGNED NOT NULL,
	usuarios_email VARCHAR(100) NOT NULL,
	PRIMARY KEY (idCodigo),
	FOREIGN KEY (cursos_idCurso) REFERENCES cursos (idCurso),
	FOREIGN KEY (usuarios_email) REFERENCES usuarios (email)
);

INSERT INTO
	cursos
VALUES
	(default, "Curso NodeJS");