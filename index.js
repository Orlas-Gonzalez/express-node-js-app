const express = require('express');
const app = express();

/*
    VERBOS HTTP
    GET - Obtener un recurso
    POST - Guardar o publicar algo
    PATCH - Actualizar 1 dato de 1 recurso
    PUT - Actualizar todos los elementos de un recurso
    DELETE - Elimina un recurso
*/

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido Orlando!");
});

app.listen(3000, () => {
    console.log("Server Is Running...");
});