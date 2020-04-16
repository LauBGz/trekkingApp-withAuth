const caminataModel = require('../models/caminata.model');
const bodyController = require('./body.controller');
const { check, validationResult } = require('express-validator');

//Obtener caminatas
exports.getTrekkings = (req, res) => {
    caminataModel.getAllTrekkings((error, rows) => {
        if (error){
            res.status(500).send({"error": error});
        } else {
            res.send(rows);
        }
    })
}

//Obtener una caminata
exports.getTrekking = (req, res) => {
    const id = req.params.id;

    caminataModel.getATrekking(id, (error, rows) => {
        if (rows.length === 0){
            res.status(400).send({"Error": "El ID no existe."});
        } else {
            res.send(rows);
        }
    })
}

//Añadir una caminata
exports.addTrekking = (req, res) => {
    const errors = validationResult(req) //Ejecuta las validaciones

    if (errors.isEmpty()){

        bodyController.checkBody(res, req.body, [
            "lugar", 
            "duracion", 
            "dificultad",
            "compania", 
            "Usuario_id"
        ]);

        caminataModel.addATrekking(
            req.body["lugar"],
            req.body["duracion"],
            req.body["dificultad"],
            req.body["compania"],
            req.body["Usuario_id"],
            (error, result) => {
                if (error) {
                    res.send({"error": error})
                } else {
                    res.send({"message": "Ok caminata creada!", "id": result["insertId"]})
                }
            }
        );
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors })
    }  
}

//Actualizar una caminata
exports.updateTrekking = (req, res) => {
    const errors = validationResult(req) //Ejecuta las validaciones

    if (errors.isEmpty()){

        bodyController.checkBody(res, req.body, [
            "id",
            "lugar",
            "duracion", 
            "dificultad", 
            "compania",
            "Usuario_id", 
        ]);

        const id =  req.body["id"];

        caminataModel.updateATrekking(
            req.body["lugar"],
            req.body["duracion"],
            req.body["dificultad"],
            req.body["compania"],
            req.body["Usuario_id"],
            id,
            (error, result) =>{
                if (error) {
                    res.send({"error": error})
                } else {
                    res.send({"message": "Caminata modificada"})  
                }
            }
        );
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors })
    }  
}

//Eliminar una caminata
exports.deleteTrekking = (req, res) => {
    const id = req.params.id;

    caminataModel.deleteATrekking(id, (error, results) => {
        if (results.affectedRows > 0) {
            res.send({"message": `Caminata con el id ${id} eliminado!`})
        } else {
            res.status(404).send({"error": "Ese ID no existe."})
        }
    })
}