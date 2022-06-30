require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Cargo las rutas
const productos = require("./src/routes/producto.route");
const categorias = require("./src/routes/categoria.route");
const usuarios = require("./src/routes/usuario.route");
const auth = require("./src/routes/auth.route");

// Cargo los Middlewares
const verifyJWT = require("./src/middlewares/validate-token");

// Genero mensaje de bienvenida para la ruta principal
app.get("/api", function (req, res) {
  res.status(200);
  res.json({ message: "welcome to api cocina de antaño", status: 200 });
});

// Rutas protegidas mediante JWT
app.use("/api/productos", verifyJWT, productos);
app.use("/api/categorias", verifyJWT, categorias);
app.use("/api/usuarios", verifyJWT, usuarios);

// Rutas abiertas sin JWT
app.use("/api", auth);
app.use("/api", auth);

// Leo el puerto desde las variables de entorno y si no lo detecta pone por defecto el 8000
const PORT = process.env.LISTEN_PORT;
app.listen(PORT);
