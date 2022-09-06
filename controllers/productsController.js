// import { PRODUCTS, CARTS  } from "../DAOs/index.js"


export const getProducts = async (req,res)=>{
    const { id } = req.params;
    let product = await PRODUCTS.getById(id)
    if(!product) {
        return res.json(await PRODUCTS.getAll())
    }
    res.json(product)
}

export const postProducts = async (req, res) => {
    return res.json({id: await PRODUCTS.save(req.body)});
}

export const updateProducts = async (req, res) => {
        const { id } = req.params;
        const product = req.body;
        
        if(! await PRODUCTS.getById(id)){
            const error = new Error('Product not found')
            return res.json({ msg: error.message })
        }
        if(!product){
            const error = new Error('Product not found')
            return res.status(404).json({ msg: error.message })
        }
        const updatedProduct = await PRODUCTS.updateOne(id, product)
        res.json({msg: updatedProduct})
    }

export const deleteProducts = async (req,res)=>{
        const { id } = req.params;
        if(! await PRODUCTS.getById(id)){
            const error = new Error('Product not found')
            return res.json({ msg: error.message })
        }
        const deleted = await PRODUCTS.deleteById(id);
        res.json({ msg: deleted })
}