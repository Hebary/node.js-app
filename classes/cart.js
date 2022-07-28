import { format } from "date-fns";

export class Cart {
    
    constructor() {
        this.products = []
        this.id = idGenerator();
        this.timestamps = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
        this.code = codeGenerator();
    }
    save(product) {
        if(!product.id || !product.timestamps || !product.code || !product.stock){
            product.id = idGenerator();
            product.timestamps = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
            product.code = '#'+ codeGenerator();
            product.stock = Math.floor(Math.random() * (100 - 1) + 1);
        }
        this.products = [...this.products, product];
        return product.id;
    }

    //obtiene un carrito del Admin de carritos
    getById(id) {
        return this.products.find(products => products.id === id );
    }
    //obtiene todos los Carritos
    getAll() {
        return this.products;
    }
    //elimina un product por su id
    deleteById(id) {
        this.products = this.products.filter(products => products.id !== id)
        return this.products;
    }
    //elimina todos los products
    deleteAll() {
        this.products = [];
    }
    
    updateOne(id, product) {
        const index = this.products.findIndex(product => product.id === id);
        this.products[index] = product;
        return this.products[index];
    }
    
}

//Helper function
function idGenerator(){
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

function codeGenerator(){
    return Math.random().toString(32).substring(2);
}