////rutas de crear - actualizar - leer - eliminar productos  - previuos path /api/products/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateToken } = require("../middlewares/validateToken");
const { validateField } = require("../middlewares/validateFields");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

const router = Router();

//validar que todas las rutas tengan token
router.use(validateToken);

router.post(
  "/create",
  [
    check("name", "El nombre del artículo es requerido")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("El nombre del artículo es muy corto")
      .isLength({ max: 30 })
      .withMessage("El nombre del artículo es muy largo"),
    check("description", "La descripción del artículo es requerida")
      .notEmpty()
      .isLength({ min: 5, max: 50 })
      .withMessage(
        "La descripción del producto debe ser mínimo de 5 caracteres y máximo de 50"
      ),
    check("price", "El precio del producto es requerido")
      .notEmpty()
      .isNumeric()
      .withMessage("El precio del producto debe ser un número")
      .isFloat({ min: 1 })
      .withMessage("El precio debe ser mínimo 1 dólar"),
    check("quantity", "La cantidad del producto es requerida")
      .notEmpty()
      .isNumeric()
      .withMessage("La cantidad del producto debe ser un número")
      .isFloat({ min: 1 })
      .withMessage("La cantidad debe ser mínimo 1"),
    check("urlImage").optional(),
    validateField,
  ],
  createProduct
);
router.get("/get", [validateField], getProducts);
router.put(
  "/update/:id",
  [
    [
      check("name", "El nombre del artículo es requerido")
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("El nombre del artículo es muy corto")
        .isLength({ max: 30 })
        .withMessage("El nombre del artículo es muy largo"),
      check("description", "La descripción del artículo es requerida")
        .notEmpty()
        .isLength({ min: 5, max: 50 })
        .withMessage(
          "La descripción del producto debe ser mínimo de 5 caracteres y máximo de 50"
        ),
      check("price", "El precio del producto es requerido")
        .notEmpty()
        .isNumeric()
        .withMessage("El precio del producto debe ser un número")
        .isFloat({ min: 1 })
        .withMessage("El precio debe ser mínimo 1 dólar"),
      check("quantity", "La cantidad del producto es requerida")
        .notEmpty()
        .isNumeric()
        .withMessage("La cantidad del producto debe ser un número")
        .isFloat({ min: 1 })
        .withMessage("La cantidad debe ser mínimo 1"),
      check("urlImage").optional(),
      validateField,
    ],
  ],
  updateProduct
);
router.delete("/delete/:id", [validateField], deleteProduct);

module.exports = router;
