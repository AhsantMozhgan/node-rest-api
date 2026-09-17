const express = require('express')

const postsRoutes = require('./routes/posts-routes')
const usersRoutes = require('./routes/users-routes')

const app = express()

app.use(express.json())

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)

app.listen(5000)