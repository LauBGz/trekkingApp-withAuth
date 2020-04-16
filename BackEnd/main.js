const express = require('express');
const bodyParser = require('body-parser');  
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userController = require('./controllers/users.controller');
const trekkingController =  require('./controllers/trekkings.controller');
const authController = require('./controllers/auth.controller');
const userLogged = require('./controllers/isLoggedIn.controller');
const { check, validationResult } = require('express-validator');

//Crear servidor
const servidor = express();

//Middleware
servidor.use(bodyParser.json());
servidor.use(cookieParser())
servidor.use(helmet())

//Endpoints register y login
servidor.post('/register', authController.register);
servidor.post('/login', authController.login);

//Endpoints usuarios
servidor.get('/usuarios', userLogged, userController.getUsers);
servidor.get('/usuario/:id', userLogged, userController.getUser);
servidor.post('/usuarios', userLogged, [   
    check('username').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isEmail().normalizeEmail(),
    check('edad').isNumeric(),
    check('peso').isNumeric(),
    check('sexo').isString().escape().trim()],
    userController.addUser);
servidor.put('/usuarios', userLogged,  [   
    check('id').isNumeric(),
    check('username').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isEmail().normalizeEmail(),
    check('edad').isNumeric(),
    check('peso').isNumeric(),
    check('sexo').isString().escape().trim()],
    userController.updateUser);
servidor.delete('/usuario/:id', userLogged, userController.deleteUser);

//Endpoints caminatas
servidor.get('/caminatas', userLogged, trekkingController.getTrekkings);
servidor.get('/caminata/:id', userLogged, trekkingController.getTrekking);
servidor.post('/caminatas', userLogged, [   
    check('lugar').isString().escape().trim(),
    check('duracion').isNumeric(),
    check('dificultad').isNumeric(),
    check('compania').isNumeric(),
    check('Usuario_id').isNumeric()],
  trekkingController.addTrekking);
servidor.put('/caminatas', userLogged, [ 
    check('id').isNumeric(),  
    check('lugar').isString().escape().trim(),
    check('duracion').isNumeric(),
    check('dificultad').isNumeric(),
    check('compania').isNumeric(),
    check('Usuario_id').isNumeric()],
    trekkingController.updateTrekking);
servidor.delete('/caminata/:id', userLogged, trekkingController.deleteTrekking);

//Escuchar servidor
servidor.listen(3000, () => {
    console.log("Servidor funcionando.");
})