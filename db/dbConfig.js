const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido inicializar la base de datos");
  }
};

module.exports = { dbConnection };
