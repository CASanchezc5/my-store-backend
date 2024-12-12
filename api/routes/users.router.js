const express = require('express');
const { faker } = require('@faker-js/faker'); //FakerJS es una librería de JavaScript que tiene más de 27mil descargas semanales y es usada en múltiples proyectos de código

const router = express.Router();

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});

module.exports = router;
