const router = require('express').Router()
const SaleController = require('../controllers/SaleController')


router.post('/newsale', SaleController.createNewSale)

router.get('/history', SaleController.getSalesHistory)



module.exports = router