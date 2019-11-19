require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Configuracion global de rutas
app.use(require('./routes/index'));
// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Actualizacion para el findAndUpdate y findAndDelete
//Actualizacion para el motor de Discovery y Monitoring
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  process.env.URLDB,
  { useNewUrlParser: true, useCreateIndex: true },
  (err, res) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
  }
);

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto ', process.env.PORT);
});
