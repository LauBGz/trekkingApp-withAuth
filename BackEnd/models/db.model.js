const mysql = require('mysql');
const fs = require('fs');
const path =  require('path');

const rutaAbsoluta = path.join(__dirname.replace('models', ''),'/config/secrets.json');
const secretContents = fs.readFileSync(rutaAbsoluta);
const secrets = JSON.parse(secretContents); 

const connection = mysql.createPool({
    "host":secrets["mysql_host"],
    "user": secrets["mysql_username"],
    "password": secrets["mysql_password"]
})

module.exports = connection;