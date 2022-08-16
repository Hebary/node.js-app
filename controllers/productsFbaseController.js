import { formatDistanceToNow } from 'date-fns';
import { PRODUCTSfb } from '../DAOs/index.js';

export const postProducts = async (req, res) => {
    const product = req.body;
    product.timestamps = formatDistanceToNow(new Date( Date.now() )) 
    product.code = codeGenerator()
    const newProd = await PRODUCTSfb.create(product)
    return res.json({id : newProd.id }); 
}


export const getProducts = async (req, res)=>{
    
    const { id } = req.params;
    let product = await PRODUCTSfb.getById(id)
    if(!product) {
        return res.json(await PRODUCTSfb.getAll())
    }
    res.json(product)
}


export const updateProducts = async (req, res) => {
        const { id } = req.params;
        const product = await PRODUCTSfb.getById(id)
        const change = req.body
        if(! await PRODUCTSfb.getById(id)){
            const error = new Error('Product not found')
            return res.json({ msg: error.message })
        }
        if(!change){
            const error = new Error('Change not found')
            return res.status(404).json({ msg: error.message })
        }
        const newProduct = {...product, ...change}
        await PRODUCTSfb.updateOne(id, newProduct)
        res.json({msg: 'product updated successfully'})
    }

export const deleteProducts = async (req,res)=>{
        const { id } = req.params;
        if(! await PRODUCTSfb.getById(id)){
            const error = new Error('Product not found')
            return res.json({ msg: error.message })
        }
        await PRODUCTSfb.deleteOne(id);
        res.json({ msg: 'Product deleted succesfully' })
}

//Helpers

function codeGenerator(){
    return Math.random().toString(32).substring(2);
}

