const express = require('express')
const loginLimiter = require('../middlwares/rateLimiter')
const authController = require('../controllers/authController')
const router = express.Router()

router.route('/login').post(loginLimiter, authController.login)

router
    .post('/register', authController.register)
    .get('/refresh', authController.refresh)
    .post('/logout', authController.logout)


module.exports = router