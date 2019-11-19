const express = require('express');
const app = express();

app.use(require('./client'));
app.use(require('./login'));
app.use(require('./product'));

module.exports = app;
