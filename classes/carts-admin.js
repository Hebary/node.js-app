import { format } from 'date-fns'
export class CartsAdmin {
    
    constructor() {
        this.items = [];
    }
    save(item) {
        item.id = idGenerator();
        item.timestamps = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
        item.items = [...this.items, item];
        return item.id;
    }
    //obtiene un carrito por su id
    getById(id) {
        return this.items.find(item => item.id === id );
    }
    //obtiene todos los carritos
    getAll() {
        return this.items;
    }
    //elimina un carrito por su id
    deleteById(id) {
        this.items = this.items.filter(item => item.id !== id)
        return this.items;
    }
    //elimina todos los carritos
    deleteAll() {
        this.items = [];
    }
    
}
function idGenerator(){
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

