const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', (req,res)=>{
    return res.json({success: true, msg: "Maxsulotlar ro`yhati"})
})


router.get('/all',ProductController.getAllProduct)

<<<<<<< HEAD
router.post ("/create", ProductController.ProdCreate)

router.delete ('/delete/:id', ProductController.deleteProd )
=======
router.post('/create', ProductController.ProdCreate)
>>>>>>> 6ea1d9c2455db7d1b714cbc6d6007bcf597dc6d9


module.exports = router

