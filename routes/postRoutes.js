const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const tokenValidator = require('../middlwares/tokenValidatorMiddleware')


router.route('/').get(postController.getPosts)

router.route('/user').get(tokenValidator, postController.getUserPosts)
    
router.route('/')
    .post(tokenValidator, postController.postPost)
    .put(tokenValidator, postController.putPost)
    .delete(tokenValidator, postController.deletePost)

router.route('/like')
    .post(tokenValidator, postController.like)

router.route('/unlike')
    .post(tokenValidator, postController.unlike)

router.route('/isliked')
    .post(tokenValidator, postController.isLiked)

module.exports = router