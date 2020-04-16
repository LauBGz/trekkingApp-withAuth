const usuarioModel = require('../models/usuario.model');
const bodyController = require('./body.controller');
const { check, validationResult } = require('express-validator');

//Obtener usuarios
exports.getUsers = (req, res) => {
    usuarioModel.getAllUsers((error, rows) => {
        if (error){
            res.status(500).send({"error": error});
        } else {
            res.send(rows);
        }
    })
}

//Obtener un usuario
exports.getUser = (req, res) => {
    const id = req.params.id;

    usuarioModel.getAnUser(id, (error, rows) => {
        if (rows.length === 0){
            res.status(400).send({"Error": "El ID no existe."});
        } else {
            res.send(rows);
        }
    })
}

//Añadir un usuario
exports.addUser = (req, res) => {
    const errors = validationResult(req) //Ejecuta las validaciones
    if (errors.isEmpty()){

        bodyController.checkBody(res, req.body, [
            "username", 
            "password", 
            "email",
            "edad", 
            "peso", 
            "sexo"
        ]);

        const fechaInscripcion = new Date().toJSON().slice(0,10).replace(/-/g,'');

        usuarioModel.addAnUser(
            req.body["username"],
            req.body["password"],
            fechaInscripcion,
            req.body["email"],
            req.body["edad"],
            req.body["peso"],
            req.body["sexo"],
            (error, result) => {
                if (error) {
                    res.send({"error": error})
                } else {
                    res.send({"message": "Ok usuario creado!", "id": result["insertId"]})
                }
            }
        )
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors })
    }
}

//Actualizar un usuario
exports.updateUser = (req, res) => {
    const errors = validationResult(req) //Ejecuta las validaciones
    
    if (errors.isEmpty()){

        bodyController.checkBody(res, req.body, [
            "id",
            "username", 
            "password",
            "email",
            "edad", 
            "peso", 
            "sexo"
        ]);

        const id =  req.body["id"]

        usuarioModel.updateAnUser(
            req.body["username"],
            req.body["password"],
            req.body["email"],
            req.body["edad"],
            req.body["peso"],
            req.body["sexo"],
            id,
            (error, result) => {
                if (error) {
                    res.send({"error": error})
                } else {
                    res.send({"message": "Usuario modificado"})  
                }
            }
        )
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors })
    }
}


//Eliminar un usuario
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    usuarioModel.deleteAnUser(id, (error, results) => {
        if (results.affectedRows > 0) {
            res.send({"message": `Usuario con el id ${id} eliminado!`})
        } else {
            res.status(404).send({"error": "Ese ID no existe."})
        }
    })
}
