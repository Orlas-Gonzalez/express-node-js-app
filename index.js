// Dependecies
const morgan = require("morgan");
const express = require("express");
const app = express();
// Routes
const pokemon = require("./routes/pokemon");
const user = require("./routes/user");
// Middleware
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors");

/*
    VERBOS HTTP
    GET - Obtener un recurso
    POST - Guardar o publicar algo
    PATCH - Actualizar 1 dato de 1 recurso
    PUT - Actualizar todos los elementos de un recurso
    DELETE - Elimina un recurso
*/

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Is Running...");
});
