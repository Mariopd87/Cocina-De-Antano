// Importo|cargo librerías y helpers

var express = require("express");
var router = express.Router();
const helpers = require("../helpers/helpers");
const productosController = require("../controllers/producto.controller");
const errorMsg404 = "producto no encontrado";

// Defino los endpoints de los productos

/**
 * Listado de productos
 * Method: GET
 */
router.get("/", function (req, res) {
  productosController
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
 * Listado de últimos productos
 * Method: GET
 * Params: categoriaId <Number>
 */
 router.get("/cat/:categoriaId", function (req, res) {
  productosController
    .porCategoria(req.params.categoriaId)
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
 * Listado de últimos productos
 * Method: GET
 */
 router.get("/novedades", function (req, res) {
  productosController
    .novedades()
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
 * Ver detalles de producto
 * Params: productoId <Number>
 * Method: GET
 */
router.get("/:productoId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.productoId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    productosController
      .view(req.params.productoId)
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
 * Crear nuevo producto
 * Method: POST
 */
router.post("/", function (req, res) {
  productosController
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
 * Actualizar producto
 * Params: productoId <Number>
 * Method: PUT
 */
router.put("/:productoId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.productoId)) {
    res.status(404);
    res.json( { message: errorMsg404, status: 404 });
  } else {
    productosController
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
 * Borrar producto
 * Params: productoId <Number>
 * Method: DELETE
 */
router.delete("/:productoId", function (req, res) {
  // Utilizando los helpers chequeo si el valor pasado por url es un número válido, sino es así retorno un código 404

  if (!helpers.isAValidParam(req.params.productoId)) {
    res.status(404);
    res.json({ message: errorMsg404, status: 404 });
  } else {
    productosController
      .delete(req.params.productoId)
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
