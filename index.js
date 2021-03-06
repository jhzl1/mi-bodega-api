const express = require("express");
const { dbConnection } = require("./db/dbConfig");
const cors = require("cors");
require("dotenv").config();

//crear servidor de express

const app = express();
//conexion base de datos
dbConnection();

//lectura y parseo del body - debe colocarse antes de todas las rutas
app.use(express.json());

const corsOptions = {
  origin: "*",
  // credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: "*",
};

//CORS
app.use(cors(corsOptions));

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

//directorio publico
app.use(express.static("public"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});
