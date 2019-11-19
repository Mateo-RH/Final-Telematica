const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Client = require('../models/client');
const { verificaToken } = require('../middlewares/authentication');
const cors = require('cors');
const app = express();

app.get('/client', [verificaToken, cors()], function(req, res) {
  let pagina = Number(req.query.pagina) || 0;
  if (pagina === NaN) pagina = 0;

  let cantidad = Number(req.query.cantidad) || 5;
  if (cantidad === NaN) cantidad = 5;

  Client.find()
    .skip(pagina)
    .limit(cantidad)
    .exec((err, clientsDB) => {
      if (err) {
        return res.status(500).json({
          error: true,
          err
        });
      }
      Client.count({}, (err, conteo) => {
        res.json({
          error: false,
          total: conteo,
          clients: clientsDB
        });
      });
    });
});

app.post('/client', [verificaToken, cors()], function(req, res) {
  let body = req.body;

  let client = new Client({
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    nombre: body.nombre,
    edad: body.edad,
    sexo: body.sexo,
    ciudad: body.ciudad,
    direccion: body.direccion,
    estadoCivil: body.estadoCivil,
    profesion: body.profesion
  });

  //Grabo en la DB
  client.save((err, clientDB) => {
    if (err) {
      return res.status(500).json({
        error: true,
        err
      });
    }

    if (!clientDB) {
      return res.status(400).json({
        error: true,
        err
      });
    }

    res.json({
      error: false,
      client: clientDB
    });
  });
});

app.delete('/client/:id', [verificaToken, cors()], function(req, res) {
  let id = req.params.id;

  Client.findByIdAndRemove(id, (err, clientDB) => {
    if (err) {
      return res.status(500).json({
        error: true,
        err
      });
    }
    if (!clientDB) {
      return res.status(404).json({
        error: true,
        err: {
          message: 'Client no existe'
        }
      });
    }

    res.json({
      error: false,
      client: clientDB
    });
  });
});

module.exports = app;
