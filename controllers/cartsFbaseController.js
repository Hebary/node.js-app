import { CARTSfb, PRODUCTSfb } from '../DAOs/index.js'
import { formatDistanceToNow } from "date-fns";

export const newCart = async (req, res) => {
    const newCart = await CARTSfb.create({
        products:[], 
        timestamps:formatDistanceToNow(new Date( Date.now() )),
    });
    return res.status(200).json({id: newCart.id});
}

export const getAllCartProducts = async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({message: 'Missing id'});
    }
    const cart = await CARTSfb.getById(id);
    return res.json(cart.products);
}


export const addProduct = async (req, res) => {
    const { id } = req.params;
    const { idprod } = req.body;
    
    if(!id || !idprod){
        return res.status(400).json({message:"Invalid id"});
    }
    const cart = await CARTSfb.getById(id);
    const product = await PRODUCTSfb.getById(idprod)
    
    cart.products.push(product)

    await CARTSfb.updateOne(id, cart)
    res.json({msg: 'cart updated'+' & product saved'});
}

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    const cart = await CARTSfb.getById(id);

    if(cart){
        await CARTSfb.deleteOne(id);
        return res.json({ msg: 'cart deleted' });
    }
    const error = new Error('Cart not found')
    return res.json({ msg: error.message })
}

export const deleteProduct = async (req, res)=>{
    const { id, idprod } = req.params
    
    if(!id || !idprod){
        return res.status(400).json({message:"Invalid id"});
    }
    
    const cart = await CARTSfb.getById(id);

    if(!cart) { 
        const error = new Error('Cart not found')
        return res.status(404).json({ msg: error.message })
    }
    const index = cart.products.findIndex(product => product.id == idprod);
    if(index === -1){
        const error = new Error('Product not found')
        return res.json({ msg: error.message })
    }

    cart.products.splice(index, 1)
    await CARTSfb.updateOne(id, cart)
    return res.json({ msg: 'cart updated' + ' & product deleted' })

}

