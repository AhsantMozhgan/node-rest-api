const express = require('express')

const router = express.Router()

const posts = [
    {
        id: 'p1',
        title: 'Title',
        content: 'Content',
    },
]

router.get('/:pid', (req, res, next) => {
    const postId = req.params.pid

    const post = posts.find((item) => {
        return item.id === postId
    })
    // res.json( {post: post} )
    //OR 
    res.json({ post })
})

module.exports = router