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

const updateProduct = async (req = request, res = response) => {
  const productId = req.params.id;

  const uid = req.uid;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado un producto con ese ID",
      });
    }

    if (product.userId.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No ha creado este producto. No tiene acceso a editarlo",
      });
    }

    const newProduct = { ...req.body, user: uid };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      newProduct,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Producto actualizado exitosamente",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error inesperado. Contacte con el departamento de soporte",
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const productId = req.params.id;

  const uid = req.uid;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado un producto con ese ID",
      });
    }

    if (product.userId.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No ha creado este producto. No tiene acceso a eliminarlo",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.json({
      ok: true,
      msg: "Se ha eliminado el producto existosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error inesperado. Contacte con el departamento de soporte",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
