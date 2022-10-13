const express = require('express');
const { Router } = require('express');
const compression  = require('compression');

const  dotenv = require('dotenv');

const { postProducts, getProducts, updateProducts, deleteProducts } = require('../controllers/productsController');

const admin = require ("../middleware/admin");

dotenv.config();

const routerProducts = Router();

routerProducts.get('/:id?', compression(), getProducts);
routerProducts.post('/', admin, postProducts);
routerProducts.put('/:id', updateProducts)
routerProducts.delete('/:id', admin, deleteProducts)

module.exports = routerProducts;