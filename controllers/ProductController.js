const Products = require('../models/ProductModels')
const Product = require('../models/ProductModels')

exports.getAllProduct = async (req,res)=>{
    const product = await Products.query().select('*')    
    return res.json({success: true, user: product})
}

    


