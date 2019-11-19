const { verificaToken } = require('../middlewares/authentication');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Client = require('../models/client');
const app = express();

app.post('/login', cors(), (req, res) => {
  let body = req.body;

  Client.findOne({ email: body.email }, (err, clientDB) => {
    if (err) {
      return res.status(500).json({
        error: true,
        err
      });
    }

    if (!clientDB || !bcrypt.compareSync(body.password, clientDB.password)) {
      return res.status(400).json({
        error: true,
        err: {
          message: 'Usuario y/o contraseña incorrectos'
        }
      });
    }

    // Payload seed expiracion
    let token = jwt.sign(
      {
        client: clientDB
      },
      process.env.SEED_TOKEN,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );

    res.json({
      error: false,
      client: clientDB,
      token
    });
  });
});

app.get('/validaToken', verificaToken, function(req, res) {
  let client = req.client;
  return res.json({
    error: false,
    client
  });
});

module.exports = app;
