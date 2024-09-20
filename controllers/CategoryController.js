const Categories = require('../models/CategoryModels')

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

