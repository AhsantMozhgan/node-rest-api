const express = require('express')
const { check } = require('express-validator')

const auth = require('../middleware/auth')

const router = express.Router()
const postsControllers = require('../controllers/posts-controllers')

router.get('/:pid', postsControllers.getPostById)

//order is important
router.use(auth)

router.post(
    '/',
    [check('title').not().isEmpty(),
    check('content').isLength({ min: 5 })],
    postsControllers.createPost
)

router.delete('/:pid', postsControllers.deletePost)

module.exports = router
