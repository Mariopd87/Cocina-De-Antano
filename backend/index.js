const http = require("http");

const handleRequest = (req, res) => {
  const { url, method } = req;

  if (url === "/productos" && method === "GET") {
    res.statusCode = 200;
    res.write("estamos en la pagina de productos");
  }
  else if (url === "/productos/:id" && method === "GET") {
    res.statusCode = 200;
    res.write("Vemos producto");
  }
  else if (url === "/productos" && method === "POST") {
    res.statusCode = 200;
    res.write("Insertamos producto");
  }
  else if (url === "/productos" && method === "PUT") {
    res.statusCode = 200;
    res.write("Actualizamos producto");
  }
  else if (url === "/productos" && method === "DELETE") {
    res.statusCode = 200;
    res.write("Eliminamos producto");
  } else {
    res.statusCode = 200;
    res.write("Estamos en la pagina principal");
  }

  res.end();
};

const server = http.createServer(handleRequest);
server.listen(8000);
