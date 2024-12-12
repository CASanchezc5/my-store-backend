const Joi = require('joi');

//Validaciones
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri()

//Esquema para la creación
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

//Esquema para la actualización
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

//Esquema para el get
const getProductSchema = Joi.object({
  id: id.required(),
});


module.exports = { createProductSchema, updateProductSchema, getProductSchema }
