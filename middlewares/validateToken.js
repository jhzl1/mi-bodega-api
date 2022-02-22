const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateToken = (req = request, res = response, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    return res.status(401).json({
      ok: false,
      msg: "No se ha enviado el token",
    });
  }

  if (!headerToken.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      msg: "Acceso no autorizado",
    });
  }

  const tokenArray = req.headers.authorization.split(" ");
  const token = tokenArray[1];

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.name = name;
    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validateToken,
};
