const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", (req, res, next) => {
  return res.status(200).send(req.body.name);
});

pokemon.get("/", async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
  return res.status(200).json(pkmn);
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id);
  if (pkmn.length > 0) {
    return res.status(200).json(pkmn);
  }
  return res.status(400).send("Pokémon No Encontrado...");
});

/*
      Operador Ternario 
      Condición a evaluar ? valor si es verdadero : valor si es falso
      NOTA: Un operador ternario por default retorna un valor
  */

pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const pkmn = await db.query(
    "SELECT * FROM pokemon WHERE UPPER(pok_name) = '" + name.toUpperCase() + "'"
  );
  if (pkmn.length > 0) {
    return res.status(200).json(pkmn);
  }
  return res.status(400).send("Pokémon No Encontrado...");
});

module.exports = pokemon;
