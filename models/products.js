const mongoose = require('mongoose');




const productsSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
   thumbnail:{
        type: String,
        trim: true,
        required: true
    },
    code:{
        type: String,
        trim: true,
        default: codeGenerator()

    },
    stock:{
        type: Number,
        required: true
    },
    timestamps:{
        type: String,
        default: Date.now()
    }
});
const Products = mongoose.model("Products", productsSchema);

function codeGenerator(){
    return Math.random().toString(32).substring(2);
}


module.exports =  Products;