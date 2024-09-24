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

// exports.createNewSale = async (req, res) => {
//     const { product_id, quantity, client_id } = req.body;

//     try {
//         const knex = await Sales.knex();
        
//         // Mahsulot narxini olish
//         const product = await knex('product').select('price').where('id', product_id).first();
        
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found." });
//         }

//         const totalPrice = product.price * quantity; // Jami summa hisoblash

//         // Yangi sotuvni qo'shish
//         await knex('sales').insert({
//             product_id,
//             quantity,
//             client_id,
//             price: totalPrice // Jami summani saqlash
//         });

//         return res.json({ success: true, message: "Sale recorded successfully." });
//     } catch (error) {
//         console.error("Error creating sale:", error);
//         return res.status(500).json({ success: false, message: "Error creating sale." });
//     }
// };

exports.createNewSale = async (req, res) => {
    const { product_id, quantity, client_id } = req.body;

    // Kiruvchi ma'lumotlarni tekshirish
    if (!product_id || !quantity || !client_id) {
        return res.status(400).json({ success: false, message: "Zarur maydonlar etishmayapti." });
    }

    try {
        const knex = await Sales.knex();
        
        // Mahsulot ma'lumotlarini olish
        const product = await knex('product').select('price', 'quantity').where('id', product_id).first();
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Mahsulot topilmadi." });
        }

        // Narx va mavjud zaxirani tekshirish
        if (product.price <= 0) {
            return res.status(400).json({ success: false, message: "Noto'g'ri mahsulot narxi." });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Mavjud zaxira etarli emas." });
        }

        const totalPrice = product.price * quantity; // Jami narxni hisoblash

        // Yangi sotuvni qo'shish
        await knex('sales').insert({
            product_id,
            quantity,
            client_id,
            price: totalPrice // Jami narxni saqlash
        });

        // Mahsulot sonini yangilash
        await knex('product').where('id', product_id).decrement('quantity', quantity);

        return res.json({ success: true, message: "Sotuv muvaffaqiyatli qayd etildi." });
    } catch (error) {
        console.error("Sotuvni yaratishda xato:", error);
        return res.status(500).json({ success: false, message: "Sotuvni yaratishda xato." });
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
