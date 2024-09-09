const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', (req,res)=>{
    return res.json({success: true, msg: "Maxsulotlar ro`yhati"})
})


router.get('/all',ProductController.getAllProduct)

router.post ("/create", ProductController.ProdCreate)

router.put ('/update', ProductController.UpdateProd)
router.delete ('/delete/:id', ProductController.deleteProd )


module.exports = router

