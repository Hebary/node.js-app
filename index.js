import express, { Router } from 'express';
import dotenv from 'dotenv';

import routerCart from './routes/cartRoutes.js';
import routerProducts from './routes/productRoutes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => console.log(`THE MAGIC PORT is ${PORT}`)) 
server.on('error', (error) => console.log('Server On Error: ' + error))


// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/products', routerProducts)
app.use('/api/cart', routerCart)

