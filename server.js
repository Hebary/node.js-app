import express, { Router } from 'express';
import http from 'http';
import { Server as IOServer} from 'socket.io';
import fs from 'fs';
import { Container } from './classes/container.js';
import { Cart } from './classes/cart.js';
import { CartsAdmin } from './classes/carts-admin.js';

const PRODUCTS = new Container('products');

const cartsAdmin = new CartsAdmin();

const app = express();

const routerProducts = Router()
const routerCart = Router();


const httpServer = http.Server(app)
const io = new IOServer(httpServer)

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => console.log(`THE MAGIC PORT is ${PORT}`)) 

httpServer.on('error', (error) => console.log('Server On Error: ' + error))


app.use(express.static('public'))
app.use(express.json())

let isAdmin = false;

//Get  products from PRODUCTS.json
const getProducts = async file => {
    try {
        const data = await fs.promises.readFile(file, 'utf-8')
            const products = JSON.parse(data)
            products.forEach( product => PRODUCTS.save(product));
    } catch (error) {
        console.log(error)
    }
}
getProducts('products.json');


//post products from PRODUCTS.json
const postProducts = () => {
    fs.writeFile('products.json', JSON.stringify(PRODUCTS.getAll(), null, 2), (error) => {
        if (error) {
            console.log(error)
        }
    })
    console.log('Products saved'); 
}
// setInterval(postProducts, 22000)


app.use('/api/products', routerProducts)
app.use('/api/cart', routerCart)

//ENDPOINTS PRODUCTS

routerProducts.get('/:id?', (req, res) => { 

    const { id } = req.params
    
    if(!PRODUCTS.getById(id)){
        return res.json(PRODUCTS.getAll())
    }
    const product = PRODUCTS.getById(id)
    res.json(product)
})

routerProducts.post('/', (req, res)=>{ 
    const product = req.body;
    PRODUCTS.save(product);
    res.json(product);
})

//PUT

routerProducts.put('/:id', (req, res) => {
    const { id } = req.params;
    const product = req.body;
    
    if(!PRODUCTS.getById(id)){
        const error = new Error('Product not found')
        res.json({ error: error.message })
        return
    }
    if(!product){
        const error = new Error('Product not found')
        return res.status(404).json({ error: error.message })
    }
    const updatedProduct = PRODUCTS.updateOne(id, product)
    res.json(updatedProduct)
})

//DELETE

routerProducts.delete('/:id', (req, res) => {
    const { id } = req.params;
    if(!PRODUCTS.getById(id)){
        const error = new Error('Product not found')
        return res.json({ error: error.message })
    }
    PRODUCTS.deleteById(id);
    res.json({ message: 'Product deleted' })
})

//#############################################################################################################################

//CART
routerCart.post('/', (req, res) => {
    const cart = new Cart();
    cartsAdmin.save(cart)
    res.json(cart.id);
})

routerCart.delete('/:id', (req, res) => {
    const { id } = req.params;
    const cart = cartsAdmin.getById(id);

    if(!cart){
        const error = new Error('Cart not found')
        return res.json({ error: error.message })
    }
    cartsAdmin.deleteById(id);
    res.json({ message: 'Cart deleted' })
})

routerCart.get('/:id/products', (req, res)=>{
    const { id } = req.params;
    const cart = cartsAdmin.getById(id);

    if(!cart) {
        const error = new Error('Cart not found')
        return res.json({ error: error.message })
    }
    res.json(cart);
})

routerCart.post('/:id/products', (req, res)=>{
    const { id } = req.params;
    const cart = cartsAdmin.getById(id);
    
    if(!cart) {
        const error = new Error('Cart not found')
        return res.status(404).json({ error: error.message })
    }

    const product = req.body;
    
    if(!product){
        const error = new Error('Product is missing')
        return res.json({ error: error.message })
    }
    cart.save(product);
    res.status(200).json(product);
})


routerCart.delete('/:id/products/:idprod', (req, res)=>{
    const { id, idprod } = req.params
    
    const cart = cartsAdmin.getById(id);
    
    if(!cart) { 
        const error = new Error('Cart not found')
        res.status(404).json({ error: error.message })
        return
    }

    cart.deleteById(idprod)
    res.status(404).json(cart.getAll())

})

//Socket.IO
io.on('connection', socket => {
    console.log('New User Connected');
    
    //Emit all products to every user connected
    socket.emit('products', PRODUCTS.getAll())

    socket.on('product', data => {
        PRODUCTS.save(data)
        io.sockets.emit('products', PRODUCTS.getAll())
    });

    socket.on('productCart', data => {
        cartsAdmin.save(data)
        socket.emit('cartProducts', data.products)
    })

    socket.on('cartProducts2', data => {
        setInterval(() => {
            cartWriter(data)
        }, 5000);
    })

})



const cartWriter = async (data) => {
    
    await fs.promises.writeFile('cartProducts.json', JSON.stringify(data, null, 2), (error) => {
        if (error) {
            console.log(error)
        }
    })
    console.log('Cart saved'); 
}

