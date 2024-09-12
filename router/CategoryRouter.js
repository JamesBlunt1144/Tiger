const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/', (req,res)=>{
    return res.json({success: true, msg: "Katigoriyalar ro`yhati"})
})


//CRUD / CREATE
router.post('/create', CategoryController.CategoryCreate)

//CRUD / UPDATE
router.put ('/put/:id',CategoryController.put)

//CRUD / DELETE

router.delete ('/delete/:id', CategoryController.delete)












module.exports = router

