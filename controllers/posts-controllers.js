const { v4: uuidv4 } = require('uuid')
const { validationResult } = require('express-validator')

let posts = [
    {
        id: 'p1',
        title: 'Title',
        content: 'Content',
    },
]

const getPostById = (req, res, next) => {
    const postId = req.params.pid

    const post = posts.find((item) => {
        return item.id === postId
    })

    res.json({ post })
}

const createPost = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({ message: 'Invalid data.' })
    }

    const { title, content } = req.body

    const createdPost = { id: uuidv4(), title, content }

    posts.push(createdPost)

    res.status(201).json({ post: createdPost })
}

const deletePost = (req, res, next) => {
    const postId = req.params.pid

    posts = posts.filter((item) => item.id !== postId)

    res.status(200).json({ message: 'Post Deleted.' })
}

exports.getPostById = getPostById
exports.createPost = createPost
exports.deletePost = deletePost
