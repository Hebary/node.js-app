import mongoose from "mongoose";
import { formatDistanceToNow } from "date-fns";




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
        default: formatDistanceToNow(new Date(Date.now()) , {addSuffix: true})
    }
});
const Products = mongoose.model("Products", productsSchema);

function codeGenerator(){
    return Math.random().toString(32).substring(2);
}

export default Products;