const express = require('express');
const { Router } = require('express');


const { getAllCartProducts, newCart, deleteCart, addProduct, deleteProduct } = require('../controllers/cartsController');
const routerCart = Router();


routerCart.post('/', newCart)
routerCart.post('/:id/products', addProduct)
routerCart.get('/:id/products', getAllCartProducts)
routerCart.delete('/:id', deleteCart)
routerCart.delete('/:id/products/:idprod', deleteProduct)


module.exports = routerCart;