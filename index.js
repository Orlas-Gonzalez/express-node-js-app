const morgan = require("morgan");
const express = require("express");
const app = express();
const pokemon = require("./routes/pokemon");

/*
    VERBOS HTTP
    GET - Obtener un recurso
    POST - Guardar o publicar algo
    PATCH - Actualizar 1 dato de 1 recurso
    PUT - Actualizar todos los elementos de un recurso
    DELETE - Elimina un recurso
*/

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({ code: 1, message: "Bienvenido al Pokédex" });
});

app.use("/pokemon", pokemon);

app.use((req, res, next) => {
  return res.status(404).json({ code: 404, message: "URL NO ENCONTRADA" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Is Running...");
});
