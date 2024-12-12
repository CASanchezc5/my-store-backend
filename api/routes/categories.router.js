const express = require('express');
const { faker } = require('@faker-js/faker'); //FakerJS es una librería de JavaScript que tiene más de 27mil descargas semanales y es usada en múltiples proyectos de código

const router = express.Router();

app.get('/categories/:categotyId/products/:productId', (req, res) => {
  const { categotyId, productId } = req.params;
  res.json({
    categotyId,
    productId,
  });
});

module.exports = router;
