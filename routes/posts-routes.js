const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({ message: 'Post Route' })
})

module.exports = router