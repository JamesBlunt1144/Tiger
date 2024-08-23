const Products = require('../models/ProductModels')
const Product = require('../models/ProductModels')

exports.getAllProduct = async (req,res)=>{
    const knex = await Products.knex()
    const product = await knex.raw(`SELECT p.id , c.name as turkum, p.name , p.price, p.quantity, p.description FROM product as p 
    RIGHT JOIN category as c on p.category_id = c.id;`)
    
    return res.json({success: true, product: product[0]})
}

    


