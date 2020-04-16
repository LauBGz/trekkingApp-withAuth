exports.checkBody = (res, body, arrayValores) => {
    for (valor of arrayValores){
        if(body[valor] === undefined){
            res.status(400).send({"error":"Revisa el body."});
            throw new Error("Body incorrecto.")
        }
    }
}