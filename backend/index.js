var express = require("express");
var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var productos = require("./src/routes/producto.route");
var categorias = require("./src/routes/categoria.route");
var usuarios = require("./src/routes/usuario.route");

app.get("/api", function (req, res) {
  res.status(200);
  res.json({ message: "welcome to api cocina de antaño", status: 200 });
});

app.use("/api/productos", productos);
app.use("/api/categorias", categorias);
app.use("/api/usuarios", usuarios);

app.listen(8000);
