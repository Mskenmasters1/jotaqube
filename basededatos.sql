drop database if exists codejqb;
create database codejqb;
ALTER DATABASE codejqb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use codejqb;

CREATE TABLE usuarios (
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    token nvarchar(500) not null,
    PRIMARY KEY (email)
);


CREATE TABLE cursos (
    idCurso INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (idCurso)
);

CREATE TABLE codigos (
    idCodigo INT NOT NULL AUTO_INCREMENT,
    titulo varchar(1000),
    codigo mediumtext,
    indicaciones VARCHAR(200) NOT NULL,
    fechaHora DATETIME NOT NULL,
    cursos_idCurso INT UNSIGNED NOT NULL,
    usuarios_email VARCHAR(100) NOT NULL,
    PRIMARY KEY (idMensaje),
    FOREIGN KEY (cursos_idCurso) REFERENCES cursos (idCurso),
    FOREIGN KEY (usuarios_email) REFERENCES usuarios (email)
);

INSERT INTO cursos VALUES (default, "Curso NodeJS");