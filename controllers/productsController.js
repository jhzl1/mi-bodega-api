const { response, request } = require("express");
const ProductModel = require("../models/ProductModel");

const createProduct = async (req = request, res = response) => {
  //obtener uid del usuario

  const product = new ProductModel(req.body);
  product.userId = req.uid;
  try {
    const savedProduct = await product.save();

    res.json({
      ok: true,
      msg: "Se ha creado el producto exitosamente",
      savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error inesperado. Contáctese con el departamento de soporte",
    });
  }
};

const getProducts = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "obtener productos",
  });
};

const updateProduct = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "actualizar productos",
  });
};

const deleteProduct = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "eliminar productos",
  });
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
