drop database chat;
create database chat;
use chat;

CREATE TABLE usuarios (
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    token nvarchar(500) not null,
    PRIMARY KEY (email)
);


CREATE TABLE salas (
    idSala INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (idSala)
);

CREATE TABLE mensajes (
    idMensaje INT NOT NULL AUTO_INCREMENT,
    texto VARCHAR(200) NOT NULL,
    fechaHora DATETIME NOT NULL,
    salas_idSala INT UNSIGNED NOT NULL,
    usuarios_email VARCHAR(100) NOT NULL,
    PRIMARY KEY (idMensaje),
    FOREIGN KEY (salas_idSala) REFERENCES salas (idSala),
    FOREIGN KEY (usuarios_email) REFERENCES usuarios (email)
);

INSERT INTO salas VALUES (default, "Principal");