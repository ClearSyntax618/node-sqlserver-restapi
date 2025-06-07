CREATE DATABASE webstore;

USE webstore;

CREATE TABLE Producto(
    codP INT PRIMARY KEY IDENTITY(1,1),
    nombre varchar(50) NOT NULL,
    descripcion varchar(100),
    stock int NOT NULL,
    precio float NOT NULL
);

CREATE TABLE Cliente(
    codC INT PRIMARY KEY IDENTITY(1,1),
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    saldo float NOT NULL
);

CREATE TABLE esComprado(
    codP INT NOT NULL FOREIGN KEY REFERENCES Producto(codP),
    codC INT NOT NULL FOREIGN KEY REFERENCES Cliente(codC)
);

ALTER TABLE esComprado
ADD CONSTRAINT PK_esComprado PRIMARY KEY(codP, codC); 

-----------
INSERT INTO Producto([nombre], [descripcion], [stock], [precio]) VALUES 
(
    'Silla Gamer',
    'Silla Gamer Roja y Negro',
    25,
    150000.00
),
(
    'Mouse Game',
    'Mouse Gamer Roja y Negro',
    27,
    10000.00
);


INSERT INTO Cliente([nombre], [apellido], [saldo]) VALUES (
    'Marcos',
    'Jimenez',
    20000.00
);

INSERT INTO esComprado([codP], [codC]) VALUES
(
    1,
    1
),
(
    2,
    1
),
(
    3,
    1
);

