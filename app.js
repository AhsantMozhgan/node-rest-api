const express = require('express')

const postsRoutes = require('./routes/posts-routes')

const app = express()

app.use(express.json())

app.use('/api/posts', postsRoutes)

app.listen(5000)