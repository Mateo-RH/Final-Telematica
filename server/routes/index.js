const express = require('express');
const app = express();

app.get('/index', (req, res) => {
  res.json({
    error: false,
    msg: 'Test'
  });
});

module.exports = app;
