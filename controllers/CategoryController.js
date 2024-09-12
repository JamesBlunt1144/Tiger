const Categories = require('../models/CategoryModels')


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
exports.put= async (req, res) => {
    await Categories.query().findOne('id',req.params.id).update(req.body) 
    return res.status(201).json({success:true}) // Yangilangan ma'lumotni qaytarish
} 

exports.delete = async(req, res)=> {
    await Categories.query().where('id', req.params.id).delete()
    return res.status(200).json({massage: "Deleted"})
}
