const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
  urlImage: {
    type: String,
  },
});

ProductSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

module.exports = model("Product", ProductSchema);
