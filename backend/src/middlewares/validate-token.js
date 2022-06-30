const jwt = require("jsonwebtoken");

// Middleware para validar el JWT
const verifyJWT = (req, res, next) => {
  // Obtengo el token pasado por el header a la petición
  const token = req.header("auth-token");

  // Si el token no es correcto devuelvo error 401
  if (!token)
    return res.status(401).json({ message: "Acceso denegado", status: 401 });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    // Si todo va bien continuamos con el proceso
    next();
  } catch (error) {
    // En caso contrario devolvemos error 400
    res.status(400).json({ message: "El token no es válido", status: 400 });
  }
};

module.exports = verifyJWT;
