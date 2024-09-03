const router = require('express').Router()
const ClientController = require('../controllers/ClientController')

router.get('/', (req,res)=>{
    return res.json({success: true, msg: "Mijozlar ro`yhati"})
})


router.get('/all', ClientController.getAllClients)









module.exports = router
