const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    let query =
      "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
    query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 1, message: "Pokemon Insertado Correctamente" });
    }
    return res.status(500).json({ code: 500, message: "OCURRIO UN ERROR " });
  }
  return res.status(500).json({ code: 500, message: "CAMPOS INCOMPLETOS" });
});

pokemon.get("/", async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
  return res.status(200).json({ code: 200, message: pkmn });
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id);
  if (pkmn.length > 0) {
    return res.status(200).json({ code: 200, message: pkmn });
  }
  return res
    .status(400)
    .send({ code: 404, message: "Pokémon No Encontrado..." });
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
    return res.status(200).json({ code: 200, message: pkmn });
  }
  return res
    .status(400)
    .send({ code: 404, message: "Pokémon No Encontrado..." });
});

module.exports = pokemon;
