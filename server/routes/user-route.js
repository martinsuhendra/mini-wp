const router = require('express').Router()
const user_controller = require('../controllers/user-controller')

router.post('/register', user_controller.register)
router.post('/login', user_controller.login)
router.post('/googleSignIn', user_controller.google)

module.exports = router