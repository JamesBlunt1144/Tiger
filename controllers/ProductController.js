const Products = require('../models/ProductModels')

exports.getAllProduct = async (req,res)=>{
    const knex = await Products.knex()
    const product = await knex.raw(`SELECT p.id , c.name as turkum, p.name , p.price, p.quantity, p.description FROM product as p 
    RIGHT JOIN category as c on p.category_id = c.id;`)
    
    return res.json({success: true, product: product[0]})
}

    
// exports.ProdCreate = async(req,res) => {
//     const [NewProduct] = await Products.query().insert({
//     // turkum: req.body.turkum,
//     name: req.body.name,
//     price: req.body.price,
//     quantity: req.body.quantity,
//     description: req.body.description

// })
//     res.status(201).json(NewProduct);
// }




exports.ProdCreate = async (req, res) => {
    try {
        const newProduct = await Products.query().insert({
            // turkum: req.body.turkum, // Agar sizda mavjud bo'lsa
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
