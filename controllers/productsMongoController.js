import { PRODUCTSmongo } from '../DAOs/index.js';


export const getProducts = async (req,res)=>{
    
    const { id } = req.params;
    let product = await PRODUCTSmongo.getById(id)
    if(!product) {
        return res.json(await PRODUCTSmongo.getAll())
    }
    res.json(product)
}

export const postProducts = async (req, res) => {
    const product = await PRODUCTSmongo.save(req.body)
    return res.json({id: product._id}); 
}

export const updateProducts = async (req, res) => {
        const { id } = req.params;
        const product = req.body;
        
        if(! await PRODUCTSmongo.getById(id)){
            const error = new Error('Product not found')
            return res.json({ msg: error.message })
        }
        if(!product){
            const error = new Error('Product not found')
            return res.status(404).json({ msg: error.message })
        }
        await PRODUCTSmongo.updateOne(id, product)
        res.json({msg: 'product updated successfully'})
    }

export const deleteProducts = async (req,res)=>{
        const { id } = req.params;
        if(! await PRODUCTSmongo.getById(id)){
            const error = new Error('Product not found')
            return res.json({ msg: error.message })
        }
        await PRODUCTSmongo.deleteOne(id);
        res.json({ msg: 'Product deleted succesfully' })
}

