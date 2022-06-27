// Importo|cargo librerías y helpers

var express = require("express");
var router = express.Router();
const helpers = require("../helpers/helpers");
const categoriasController = require("../controllers/categoria.controller");
const errorMsg404 = 'categoría no encontrada';

// Defino los endpoints de las categorías

/**
 * Listado de categorías
 * Method: GET
 */
 router.get("/", function (req, res) {
  categoriasController
    .index()
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

/**
 * Ver detalles de la categoría
 * Params: categoriaId <Number>
 * Method: GET
 */
 router.get("/:categoriaId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.categoriaId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    categoriasController
      .view(req.params.categoriaId)
      .then((data) => {
        if (!data) {
          res.status(404);
          res.json({ message: errorMsg404, status: 404 });
        } else {
          res.status(200);
          res.json(data);
        }
      })
      .catch((error) => {
        res.status(500);
        res.json({ message: error.message, status: 500 });
      });
  }
});

/**
 * Crear nueva categoría
 * Method: POST
 */
 router.post("/", function (req, res) {
  categoriasController
    .storage(req.body)
    .then((data) => {
      res.status(data.status);
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message, status: 500 });
    });
});

/**
 * Actualizar categoría
 * Params: categoriaId <Number>
 * Method: PUT
 */
 router.put("/:categoriaId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.categoriaId)) {
    res.status(404);
    res.json( { message: errorMsg404, status: 404 });
  } else {
    categoriasController
      .update(req)
      .then((data) => {
        res.status(data.status);
        res.json(data);
      })
      .catch((error) => {
        res.status(500);
        res.json({ message: error.message, status: 500 });
      });
  }
});

/**
 * Borrar categoría
 * Params: categoriaId <Number>
 * Method: DELETE
 */
 router.delete("/:categoriaId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.categoriaId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    categoriasController
      .delete(req.params.categoriaId)
      .then((data) => {
        res.status(data.status);
        res.json(data);
      })
      .catch((error) => {
        res.status(500);
        res.json({ message: error.message, status: 500 });
      })
  }
});

module.exports = router;