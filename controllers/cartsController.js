import { PRODUCTS, CARTS } from "../DAOs/index.js"

export const newCart = async (req, res) => {
    const cart = {products:[]}
    await CARTS.save(cart)
    res.json({id:cart.id});
}

export const getAllCartProducts = async (req, res) => {
    const cart = await CARTS.getById(req.params.id);
    res.json(cart.products);
}


export const addProduct = async (req, res) => {
    const { id } = req.params;
    const cart = await CARTS.getById(id);
    
    if(!cart) {
        const error = new Error('Cart not found')
        return res.status(404).json({ msg: error.message })
    }
    
    const product = await PRODUCTS.getById(req.body.id)
    
    if(!product){
        const error = new Error('Product is missing')
        return res.json({ msg: error.message })
    }
    cart.products.push(product)
    const updated  = await CARTS.updateOne(id, cart)
    res.json({msg: updated + '& product added'});
}

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    const cart = await CARTS.getById(id);

    if(!cart){
        const error = new Error('Cart not found')
        return res.json({ error: error.message })
    }

    const deleted = await CARTS.deleteById(id);
    res.json({ msg: deleted })
}

export const deleteProduct = async (req, res)=>{
    const { id, idprod } = req.params
    
    const cart = CARTS.getById(id);
    
    if(!cart) { 
        const error = new Error('Cart not found')
        return res.status(404).json({ msg: error.message })
    }

    const index = cart.products.findIndex(product => product.id === idprod)

    if(index === -1){
        const error = new Error('Product not found')
        return res.json({ msg: error.message })
    }

    cart.products.splice(index, 1)
    const updated = await CARTS.updateOne(id, cart)
    return res.json({ msg: updated + ' & product deleted' })

}
