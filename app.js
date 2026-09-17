const express = require('express')

const postsRoutes = require('./routes/posts-routes')

const app = express()

app.use(postsRoutes)

app.listen(5000)