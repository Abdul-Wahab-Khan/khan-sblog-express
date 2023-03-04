const express = require('express')
const verifyManager = require('../middlwares/managerVerify')
const tokenValidator = require('../middlwares/tokenValidatorMiddleware')
const authorController = require('../controllers/authorController')
const router = express.Router()

router.get('/', authorController.getAuthorData)

router.route('/info')
    .post([tokenValidator, verifyManager], authorController.postAuthorInfo)
    .put([tokenValidator, verifyManager], authorController.updateAuthorInfo)

router.route('/websites')
    .post([tokenValidator, verifyManager], authorController.postAuthorWebsites)

router.route('/links')
    .post([tokenValidator, verifyManager], authorController.postAuthorLinks)

module.exports = router