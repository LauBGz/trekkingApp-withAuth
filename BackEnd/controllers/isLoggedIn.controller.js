const jwt = require('jsonwebtoken');
const fs = require('fs');
const path =  require('path');

//Leer clave jwt
const rutaAbsoluta = path.join(__dirname.replace('controllers', ''),'/config/lockup.json');
const clave = fs.readFileSync(rutaAbsoluta);
const claveJWT = JSON.parse(clave); 


//Middleware
module.exports = function isLoggedIn(req, res, next) {
    if (req.cookies.stamp){//Si hay cookie que la "valide"
        jwt.verify(req.cookies.stamp, claveJWT["jwt_clave"], (error, decode) => {
            if (error) {
                res.send({"error": error});
            } 
            if (decode !== undefined) {  
                //Si no hay error y la cookie no es undefined que continúe con 
                //la siguiente petición en cuestión
                next();
            } else {
                res.send({"error": error});
            }
        });
    } else {
        //Si no que devuela no autorizado
        res.status(401).send("Acceso no autorizado");
    }
}



  



