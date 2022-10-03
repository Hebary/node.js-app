const mongoose = require('mongoose');

const cartsSchema = mongoose.Schema({
    products:[],
    timestamps:{
        type: String,
        trim: true,
    }
});
const Carts = mongoose.model("Carts", cartsSchema);

module.exports = Carts;