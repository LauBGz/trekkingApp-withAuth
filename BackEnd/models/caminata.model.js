const connection = require('./db.model');

//Obtener caminatas
exports.getAllTrekkings = (callback) => {
    connection.query(`
    SELECT * FROM trekking.caminata;
    `, callback);
};

//Obtener una caminata
exports.getATrekking = (id, callback) => {
    connection.query(`
    SELECT * FROM trekking.caminata WHERE id = ${id};
    `, callback)
}

//Añadir caminata
exports.addATrekking = (lugar, duracion, dificultad, compania, Usuario_id, callback) =>{
    connection.query(`
    INSERT INTO trekking.caminata
    (lugar, duracion, dificultad, compania, Usuario_id)
    VALUES ("${lugar}", ${duracion}, ${dificultad}, ${compania}, ${Usuario_id});
    `, callback);
}

//Actualizar una caminata
exports.updateATrekking = (lugar, duracion, dificultad, compania, Usuario_id, id, callback) => {
    connection.query(`
    UPDATE trekking.caminata SET 
    lugar = "${lugar}", duracion = ${duracion}, dificultad = ${dificultad}, compania = ${compania}, Usuario_id = ${Usuario_id}
    WHERE ID = ${id};
    `, callback);
}

//Eliminar una caminata
exports.deleteATrekking = (id, callback) =>{
    connection.query(`
    DELETE FROM trekking.caminata WHERE ID = ${id};
    `, callback);
}