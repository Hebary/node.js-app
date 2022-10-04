const logger = require('../config/logger.js');
const { Product } = require('../DAOs/index.js');

const getProducts = async (req, res)=>{
    
    const { id } = req.params;
    let product = await Product.getById(id)
    if(!product) {
        return res.json(await Product.getAll())
    }
    res.json(product)
}

const postProducts = async (req, res) => {
    const product = await Product.save(req.body)
    return res.json(product); 
}

const updateProducts = async (req, res) => {
        const { id } = req.params;
        const product = req.body;
        
        if(! await Product.getById(id)){
            const error = new Error('Product not found');
            logger.error(error.message)
            return res.json({ msg: error.message });
        }
        if(!product){
            const error = new Error('Product not provided');
            logger.error(error.message)
            return res.status(404).json({ msg: error.message });
        }
        await Product.updateOne(id, product);
        res.json({msg: 'product updated successfully'});
    }

const deleteProducts = async (req, res)=>{
        const { id } = req.params;
        if(! await Product.getById(id)){
            const error = new Error('Product not found');
            logger.error(error.message);
            return res.json({ msg: error.message });
        }
        await Product.deleteOne(id);
        res.json({ msg: 'Product deleted succesfully' });
    }

module.exports = {
    getProducts,
    postProducts,
    updateProducts,
    deleteProducts
}