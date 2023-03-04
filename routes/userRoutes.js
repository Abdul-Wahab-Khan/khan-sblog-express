const express = require('express')
const usersController = require('../controllers/usersController')
const tokenValidator = require('../middlwares/tokenValidatorMiddleware')
const router = express.Router()

router.use(tokenValidator)

router
    .get('/', usersController.getAll)
    .put('/update-info', usersController.updateInfo)
    .get('/current-user', tokenValidator, usersController.currentUser)
    .delete('/',usersController.deleteUser)

module.exports = router