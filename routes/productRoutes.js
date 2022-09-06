import express, { Router } from 'express';
import dotenv from 'dotenv';

// import { postProducts, getProducts, updateProducts, deleteProducts } from "../controllers/productsController.js";
import { postProducts, getProducts, updateProducts, deleteProducts } from "../controllers/productsMongoController.js";
// import {
//     postProducts,
//     getProducts,
//     updateProducts,
//     deleteProducts
// } from '../controllers/productsFbaseController.js';

import admin from "../middleware/admin.js";

dotenv.config();

const routerProducts = Router();

routerProducts.get('/:id?', getProducts);
routerProducts.post('/', admin, postProducts);
routerProducts.put('/:id', admin, updateProducts)
routerProducts.delete('/:id', admin, deleteProducts)


export default routerProducts;