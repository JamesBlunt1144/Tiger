const router = require('express').Router()
const UserController = require('../controllers/UserController')
router.get('/all',UserController.getAllUsers)
router.get('/', UserController.getHome)

router.get("/:id", UserController.getOneUser)


router.post ('/create', UserController.register)


module.exports = router




