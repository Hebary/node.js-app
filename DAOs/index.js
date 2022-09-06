import { Container } from './container.js';
import { Firebase } from './firebase.js';
import { Mongo } from './mongo.js';

import Products from '../models/products.js'
import Carts from '../models/carts.js'
import User from '../models/users.js'


// export const PRODUCTS = new Container('dbProducts.json');
// export const CARTS = new Container('dbCarts.json');
// export const PRODUCTSfb = new Firebase('products');
// export const CARTSfb = new Firebase('carts');
export const Product = new Mongo(Products);
// export const CARTSmongo = new Mongo(Carts);

export const Users = new Mongo(User);