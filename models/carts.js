import mongoose from 'mongoose';

const cartsSchema = await mongoose.Schema({
    products:[],
    timestamps:{
        type: String,
        trim: true,
    }
});
const Carts = mongoose.model("Carts", cartsSchema);

export default Carts;