const express = require('express')
const { markApproved, markDisApproved } = require('../controllers/postController')
const verifyAdmin = require('../middlwares/adminVerify')
const tokenValidator = require('../middlwares/tokenValidatorMiddleware')
const router = express.Router()


router.route('/mark-approved')
    .post([tokenValidator, verifyAdmin], markApproved)

router.route('/mark-disapproved')
    .post([tokenValidator, verifyAdmin], markDisApproved)

module.exports = router