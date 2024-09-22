const Sales = require('../models/SaleModels');
const { limit } = require('../settings/db');

// exports.createNewSale = async (req, res) => {
//     const { productId, quantity, customerName } = req.body;

//     // Ma'lumotlar to'g'riligini tekshirish
//     if (!productId || !quantity || !customerName) {
//         return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     try {
//         const knex = await Sales.knex();

//         // Yangi sotuvni saqlash
//         await knex('sales').insert({
//             product_id: productId,
//             quantity: quantity,
//             customer_name: customerName,
//             sale_date: new Date() // Sotuv sanasini qo'shish
//         });

//         // Mahsulot miqdorini yangilash
//         await knex('product')
//             .where({ id: productId })
//             .decrement('quantity', quantity);

//         return res.json({ success: true, message: "Sale recorded successfully." });
//     } catch (error) {
//         console.error("Error creating new sale:", error);
//         return res.status(500).json({ success: false, message: "Error creating new sale." });
//     }
// };

exports.createNewSale = async (req, res) => {
    const { product_id, quantity, customer_name } = req.body;

    try {
        const knex = await Sales.knex();
        
        // Mahsulot narxini olish
        const product = await knex('product').select('price').where('id', product_id).first();
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const totalPrice = product.price * quantity; // Jami summa hisoblash

        // Yangi sotuvni qo'shish
        await knex('sales').insert({
            product_id,
            quantity,
            customer_name,
            price: totalPrice // Jami summani saqlash
        });

        return res.json({ success: true, message: "Sale recorded successfully." });
    } catch (error) {
        console.error("Error creating sale:", error);
        return res.status(500).json({ success: false, message: "Error creating sale." });
    }
};


exports.getSalesHistory = async (req, res) => {
    try {
        const knex = await Sales.knex();
        const salesHistory = await knex.raw(`
            SELECT * FROM sales 
        `);

        return res.json({ success: true, salesHistory: salesHistory[0] });
    } catch (error) {
        console.error("Error fetching sales history:", error);
        return res.status(500).json({ success: false, message: "Error fetching sales history." });
    }
};
