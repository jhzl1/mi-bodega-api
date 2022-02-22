const jwt = require("jsonwebtoken");

const generateJWT = (uid, fullName) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, fullName };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
