const express = require("express");
const app = express();
const { pokemon } = require("./pokedex.json");

/*
    VERBOS HTTP
    GET - Obtener un recurso
    POST - Guardar o publicar algo
    PATCH - Actualizar 1 dato de 1 recurso
    PUT - Actualizar todos los elementos de un recurso
    DELETE - Elimina un recurso
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).send("Bienvenido al Pokedex");
});

app.post("/pokemon", (req, res, next) => {
  return res.status(200).send(req.body.name);
});

app.get("/pokemon", (req, res, next) => {
  return res.status(200).send(pokemon);
});

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
  const id = req.params.id - 1;
  if (id >= 0 && id <= 150) {
    return res.status(200).send(pokemon[req.params.id - 1]);
  }
  return res.status(404).send("Pokémon no encontrado");
});

/*
    Operador Ternario 
    Condición a evaluar ? valor si es verdadero : valor si es falso
    NOTA: Un operador ternario por default retorna un valor
*/

app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) => {
  const name = req.params.name;
  const pk = pokemon.filter((p) => {
    return p.name.toUpperCase() == name.toUpperCase() && p;
  });

  if (pk.length > 0) {
    return res.status(200).send(pk);
  }
  return res.status(404).send("Pokémon no encontrado.");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Is Running...");
});
