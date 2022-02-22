const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { generateJWT } = require("../helpers/generateJwt");
const User = require("../models/UserModel");

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `Ya se encuentra registrado un usuario con el email ${email}`,
      });
    }

    user = new User(req.body);

    //encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar usuario en base de datos
    await user.save();

    res.json({
      ok: true,
      msg: "El usuario se ha creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error inesperado. Contáctese con el departamento de soporte",
    });
  }
};

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo o contraseña no son válidas",
      });
    }

    //confirmar contrasena

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El correo o contraseña no son válidas",
      });
    }

    //Generar jwt
    const token = await generateJWT(user.id, user.fullName);

    res.json({
      ok: true,
      username: user.fullName,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error inesperado. Contáctese con el departamento de soporte",
    });
  }
};

const revalidateToken = async (req = request, res = response) => {
  const { id, name } = req;

  const token = await generateJWT(id, name);

  res.json({
    msg: "Token renovado",
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
