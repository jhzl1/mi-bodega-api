//rutas de autenticacion - previuos path /api/auth/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");
const { regexPassword } = require("../helpers/regex");

const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/authController");

const router = Router();
//endpoint de registro de usuario
router.post(
  "/newuser",
  [
    check("fullName", "El nombre completo es requerido")
      .notEmpty()
      .isLength({ min: 5, max: 25 })
      .withMessage("El nombre de usuario es muy corto o muy largo"),
    check("email", "El email es requerido")
      .notEmpty()
      .isEmail()
      .withMessage("No es un email válido"),
    check("password", "La contraseña es requerida")
      .notEmpty()
      .isLength({ min: 7 })
      .withMessage("La contraseña es muy corta")
      .matches(regexPassword)
      .withMessage("La contraseña no cumple con los estandares de seguridad"),

    validateField,
  ],
  createUser
);

//autenticacion de usuario
router.post(
  "/login",
  [
    check("email", "El email es requerido")
      .notEmpty()
      .isEmail()
      .withMessage("No es un email válido"),
    check("password", "La contraseña es requerida")
      .notEmpty()
      .isLength({ min: 7 })
      .withMessage("La contraseña es muy corta"),
    validateField,
  ],
  loginUser
);

//renovar token
router.get("/renewtoken", validateToken, revalidateToken);

module.exports = router;
