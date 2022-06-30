// Importo|cargo librerías y helpers

var express = require("express");
var router = express.Router();
const helpers = require("../helpers/helpers");
const usuariosController = require("../controllers/usuario.controller");
const errorMsg404 = "usuario no encontrado";

// Defino los endpoints de los usuarios

/**
 * Listado de usuarios
 * Method: GET
 */
router.get("/", function (req, res) {
  usuariosController
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
 * Ver detalles del usuario
 * Params: usuarioId <Number>
 * Method: GET
 */
router.get("/:usuarioId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.usuarioId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    usuariosController
      .view(req.params.usuarioId)
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
 * Actualizar usuario
 * Params: usuarioId <Number>
 * Method: PUT
 */
router.put("/:usuarioId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.usuarioId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    usuariosController
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
 * Borrar usuario
 * Params: usuarioId <Number>
 * Method: DELETE
 */
router.delete("/:usuarioId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.usuarioId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    usuariosController
      .delete(req.params.usuarioId)
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

module.exports = router;
