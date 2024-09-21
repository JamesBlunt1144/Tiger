const Categories = require('../models/CategoryModels')
const XLSX = require('xlsx')

// Ma'lumotni yaratish
exports.CategoryCreate = async (req, res) => {
    try {
        const newCotegory = await Categories.query().insert({
            name: req.body.name
        });

        res.status(201).json(newCotegory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ma'lumotni yangilash
exports.update = async (req, res) => {
    await Categories.query().findOne('id',req.params.id).update(req.body) 
    return res.status(201).json({success:true}) // Yangilangan ma'lumotni qaytarish
} 

// Ma'lumotni o`chirish
exports.delete = async(req, res)=> {
    await Categories.query().where('id', req.params.id).delete()
    return res.status(200).json({massage: "Deleted"})
}

// Ma'lumotni olish
exports.AllCategory = async (req,res)=>{
    const knex = await Categories.knex()
    const AllCategory = await knex.raw(`SELECT * FROM category`)
    
    return res.json({success: true, AllCategory: AllCategory[0]})
}

// Ma`lumotni excelga ko`chirish
exports.exportCategoryToExcel = async (req, res) => {
    try {
        const knex = await Categories.knex();
        const result = await knex.raw(`SELECT * FROM category
        `);
        
        const categories = result[0];

        // Excel faylini yaratish
        const worksheet = XLSX.utils.json_to_sheet(categories);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Kataloglar");

        // Faylni yaratish va uzatish
        const fileName = 'Kataloglar.xlsx';
        XLSX.writeFile(workbook, fileName);
        
        // Response orqali faylni uzatish
        res.download(fileName, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Faylni yuklab olishda xato yuz berdi.");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Xatolik yuz berdi" });
    }
};
