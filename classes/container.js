import { format } from "date-fns";

 export class Container {

    constructor(name) {
        this.name = name;
        this.items = [];
    }

    save(item) {
        if(!item.id || !item.timestamps || !item.code || !item.stock){
            item.id = idGenerator();
            item.timestamps = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
            item.code = '#'+ codeGenerator();
            item.stock = Math.floor(Math.random() * (100 - 1) + 1);
        }
        this.items = [...this.items, item];
        return item.id;
    }

    getById(id) {
        return this.items.find(item => item.id === id );
    }
    
    getAll() {
        return this.items;
    }

    deleteById(id) {
        this.items = this.items.filter(item => item.id !== id)
        return this.items;
    }

    deleteAll() {
        this.items = [];
    }
    
    updateOne(id, item) {
        const index = this.items.findIndex(item => item.id === id);
        this.items[index] = item;
        return this.items[index];
    }

    deleteOne(id) {
        this.items = this.items.filter(item => item.id !== id)
        return this.items;
    }


}

//Helper function
function idGenerator(){
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

// module.exports = Container;

function codeGenerator(){
    return Math.random().toString(32).substring(2);
}