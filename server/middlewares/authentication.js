const jwt = require('jsonwebtoken');

// =================
// Verificar token
// =================
let verificaToken = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        err: {
          message: 'Token inválido'
        }
      });
    }
    req.client = decoded.client;
    next();
  });
};

module.exports = {
  verificaToken
};
