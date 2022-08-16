import express, { Router } from 'express';


// import { getAllCartProducts, newCart, deleteCart, addProduct, deleteProduct } from "../controllers/cartsController.js";
// import { getAllCartProducts, newCart, deleteCart, addProduct, deleteProduct } from "../controllers/cartsMongoController.js";
import {
    getAllCartProducts,
    newCart,
    deleteCart,
    addProduct,
    deleteProduct
} from '../controllers/cartsFbaseController.js';

const routerCart = Router();


routerCart.post('/', newCart)
routerCart.post('/:id/products', addProduct)
routerCart.get('/:id/products', getAllCartProducts)
routerCart.delete('/:id', deleteCart)
routerCart.delete('/:id/products/:idprod', deleteProduct)


export default routerCart