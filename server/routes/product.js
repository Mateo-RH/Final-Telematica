const express = require('express');
const _ = require('underscore');
const Product = require('../models/product');
const { verificaToken } = require('../middlewares/authentication');
const cors = require('cors');
const app = express();
// TODO: DEPURAR _ UDERSCORE

app.get('/product', [verificaToken, cors()], function(req, res) {
  let pagina = Number(req.query.pagina) || 0;
  if (pagina === NaN) pagina = 0;

  let cantidad = Number(req.query.cantidad) || 5;
  if (cantidad === NaN) cantidad = 5;

  Product.find()
    .skip(pagina)
    .limit(cantidad)
    .exec((err, productsDB) => {
      if (err) {
        return res.status(500).json({
          error: true,
          err
        });
      }
      Product.count({}, (err, conteo) => {
        res.json({
          error: false,
          total: conteo,
          products: productsDB
        });
      });
    });
});

app.get('/product/:id', [verificaToken, cors()], (req, res) => {
  let id = req.params.id;

  Product.findById(id).exec((err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: 'El ID no es correcto'
        }
      });
    }

    res.json({
      ok: true,
      product: productDB
    });
  });
});

app.post('/product', [verificaToken, cors()], function(req, res) {
  let body = req.body;

  let product = new Product({
    nombre: body.nombre
  });

  //Grabo en la DB
  product.save((err, productDB) => {
    if (err) {
      return res.status(500).json({
        error: true,
        err
      });
    }

    if (!productDB) {
      return res.status(400).json({
        error: true,
        err
      });
    }

    res.json({
      error: false,
      product: productDB
    });
  });
});

app.delete('/product/:id', [verificaToken, cors()], function(req, res) {
  let id = req.params.id;

  Product.findByIdAndRemove(id, (err, productDB) => {
    if (err) {
      return res.status(500).json({
        error: true,
        err
      });
    }
    if (!productDB) {
      return res.status(404).json({
        error: true,
        err: {
          message: 'Product no existe'
        }
      });
    }

    res.json({
      error: false,
      Product: productDB
    });
  });
});

// FIXME: esto
app.put('/product/:id', [verificaToken, cors()], function(req, res) {
  let id = req.params.id;
  let cliente = req.client._id;
  let opinion = req.body.opinion;

  Product.findById(id, (err, productDB) => {
    if (err) {
      return res.status(500).json({
        error: true,
        err
      });
    }

    if (!productDB) {
      return res.status(404).json({
        error: true,
        err: {
          message: 'Product no existe'
        }
      });
    }

    let clientes = productDB.opiniones.map(opinion => opinion.cliente);

    // if (clientes.includes(cliente)) {
    //   return res.status(400).json({
    //     error: true,
    //     err: {
    //       message: 'Cliente ya opino'
    //     }
    //   });
    // }
    let opinionCliente = { cliente: toString(cliente), opinion };
    productDB.opiniones.push(opinionCliente);

    productDB.save((err, propiedadGuardada) => {
      res.json({
        error: false,
        propiedad: propiedadGuardada
      });
    });
  });
});

module.exports = app;
