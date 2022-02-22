const { response, request } = require("express");
const Product = require("../models/ProductModel");

const createProduct = async (req = request, res = response) => {
  //obtener uid del usuario

  const product = new Product(req.body);
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

const getProducts = async (req = request, res = response) => {
  const userId = req.uid;
  //se busca solo los productos del usuario y con el sort se ordena desde el mas nuevo hasta el mas viejo
  const products = await Product.find({ userId }).sort({ _id: -1 });

  res.json({
    ok: true,
    msg: "obtener productos",
    products,
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
