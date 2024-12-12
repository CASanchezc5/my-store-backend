const express = require('express');
const productsService = require('../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new productsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//los endpiont que tengo de forma especifica deben ir antes de los que estan de forma dinamica por eso /products/filter esta antes que /products/:id
router.get('/filter', (req, res) => {
  res.send('Yo soy el filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.put('/:id', (req, res) => {
  // este tiene que recibir todos los componentes del objeto
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  // este no es ncesario que le pase todos los componentes del objeto
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
});

module.exports = router;
