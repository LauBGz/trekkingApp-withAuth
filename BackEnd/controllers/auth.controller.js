//Importar librerías
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path =  require('path');

//Importar body controller
const bodyController = require('./body.controller');

//Importar modelo de usuario
const usuarioModel = require('../models/usuario.model');

//Leer clave jwt
const rutaAbsoluta = path.join(__dirname.replace('controllers', ''),'/config/lockup.json');
const clave = fs.readFileSync(rutaAbsoluta);
const claveJWT = JSON.parse(clave); 

//Función para registrar usuario y hashear la contraseña
exports.register = (req, res) => {
    bodyController.checkBody(res, req.body, [
    "username", 
    "password", 
    "email",
    "edad",
    "peso",
    "sexo"]
    );

    usuarioModel.getUserByEmailOrUsername(
        req.body["username"], 
        req.body["email"], 
        (error, result) => {
   
        if (result.length !== 0) {
            res.send({"error": "Usuario ya existe."});
        } else{
            bcrypt.hash(req.body["password"], 14, (error, hash) => {
                if (error) throw error;
                
                const fechaInscripcion = new Date().toJSON().slice(0,10).replace(/-/g,'');

                usuarioModel.addAnUser(
                    req.body["username"],
                    hash,
                    fechaInscripcion,
                    req.body["email"],
                    req.body["edad"],
                    req.body["peso"],
                    req.body["sexo"],
                    (error, result) => {
                        if (error) {
                            res.send({"error": "Body incorrecto."})
                        } else {
                            res.send({"message": "Usuario creado!", "id": result["insertId"]})
                        }
                    }
                )
            })
        }
    })
}

//Función para loguear usuario 
exports.login = (req, res) => {

    bodyController.checkBody(res, req.body, [
        "username", 
        "password"]
        );
    
    usuarioModel.getUserByUsername(req.body["username"], (error, result) => {
        if (result.length === 0) {
            res.send({"error": "Usuario no existe."});
        } else {
            let nombreUsuario = result[0]["username"];
         
            usuarioModel.getPasswordByUsername(req.body["username"], (error, result) => {
                let passUsuario = result[0]["password"];

                bcrypt.compare(req.body["password"], passUsuario, (error, result) => {      

                    if (req.body["username"] === nombreUsuario && result){
                        jwt.sign({ "username": nombreUsuario }, 
                        claveJWT["jwt_clave"], (error, token) => {
                        if (error) throw error;
    
                        res.cookie('stamp', token);
                        res.send({ "message": "Usuario loggeado",
                                    "token": token})  
                        //TODO: quitar token antes de deployar 
                    });
                    } else {
                        res.send({ "error": "usuario o contraseña incorrectos" })
                    } 
                })
            })
        }
    })       
}
