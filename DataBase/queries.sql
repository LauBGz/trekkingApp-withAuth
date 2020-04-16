#QUERIES USUARIOS

#GET USUARIOS
SELECT * FROM trekking.usuario;
#GET 1 USUARIO
SELECT *
FROM trekking.usuario
WHERE email = "adadada@stgo.com"
OR username = "adadada";
#POST USUARIO
INSERT INTO trekking.usuario
(username, password, fechaInscripcion, email, edad, peso, sexo)
VALUES ("Alex", "patata", 20200218, "alex@berna.com", 30, 60, 'HOMBRE');
#UPDATE USUARIO
UPDATE trekking.usuario SET 
username = "Laura", password="patatilla", fechaInscripcion="20200305", email="lau@stgo.com", edad=30, peso=60, sexo="MUJER"
WHERE ID = 1;
#DELETE USUARIO
DELETE FROM trekking.usuario WHERE ID = 2;

SELECT *
FROM trekking.usuario 
WHERE username = 'Alex'
AND password = 'ratata';

SELECT usuario.password FROM trekking.usuario = 'Alex';


#QUERIES CAMINATAS

#GET CAMINATAS
SELECT * FROM trekking.caminata;
#GET 1 CAMINATA
SELECT * FROM trekking.caminata WHERE id = 1;
#POST CAMINATA
INSERT INTO trekking.caminata
(lugar, duracion, dificultad, compania, Usuario_id)
VALUES ("Berna", 120, 8, 1, 1);
#PUT CAMINATA
UPDATE trekking.caminata SET 
lugar = "Ames", duracion = 60, dificultad = 5, compania = 1, Usuario_id = 1
WHERE ID = 1;
#DELETE CAMINATA
DELETE FROM trekking.caminata WHERE ID = 2;