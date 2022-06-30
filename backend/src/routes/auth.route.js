// Importo|cargo librerías y helpers

var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuario.controller");

/**
 * Login del usuario
 * Method: POST
 */
router.post("/login", function (req, res) {
  usuariosController
    .login(req.body)
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
 * Registro del usuario
 * Method: POST
 */
router.post("/registro", function (req, res) {
  usuariosController
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

module.exports = router;
