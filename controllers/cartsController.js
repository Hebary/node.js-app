const { Cart, Product } = require('../DAOs/index.js');

const newCart = async (req, res) => {
    const newCart = req.body;
    await Cart.save(newCart);
    res.json({ msg: 'order created successfully' });
}

const getAllCartProducts = async (req, res) => {
    const { id } = req.params;

//regexp: mongodb _id's only allowed

    if(! /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id)){
        return res.status(400).json({message:"Invalid id"});
    }
    const cart = await Cart.getById(id);
    return res.json(cart.products);
}


const addProduct = async (req, res) => {
    const { id } = req.params;
    const { idprod } = req.body;
    
    if(! /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id) ||
       ! /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(idprod)
    ) {
        return res.status(400).json({message:"Invalid id"});
    }
    const cart = await Cart.getById(id);
    const product = await Product.getById(idprod)
    
    cart.products.push(product)

    await Cart.updateOne(id, cart)
    res.json({msg: 'cart updated'+' & product saved'});
}

const deleteCart = async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.getById(id);

    if(!cart){
        const error = new Error('Cart not found')
        return res.json({ error: error.message })
    }

    const deleted = await Cart.deleteById(id);
    res.json({ msg: deleted })
}

const deleteProduct = async (req, res)=>{
    const { id, idprod } = req.params
    
    if(! /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id) ||
        ! /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(idprod)
    ){
        return res.status(400).json({message:"Invalid id"});
    }
    
    const cart = await Cart.getById(id);

    if(!cart) { 
        const error = new Error('Cart not found')
        return res.status(404).json({ msg: error.message })
    }
    
    const index = cart.products.findIndex(product => product._id == idprod);
    if(index === -1){
        const error = new Error('Product not found')
        return res.json({ msg: error.message })
    }

    cart.products.splice(index, 1)
    await Cart.updateOne(id, cart)
    return res.json({ msg: 'cart updated' + ' & product deleted' });

}

module.exports ={
    newCart,
}
