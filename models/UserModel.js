const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = model("User", UserSchema);
