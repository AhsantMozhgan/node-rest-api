const { v4: uuidv4 } = require('uuid')
const User = require('../models/users')

const getUsers = (req, res, next) => {
    // res.json({ users })
}

const signup = async (req, res, next) => {
    const { email, password } = req.body

    // const newUser = { id: uuidv4(), email, password }
    const newUser = new User({ email, password })

   
    // users.push(newUser)
    await newUser.save()

    res.status(201).json({ user: newUser })
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const validUser = users.find((item) => item.email === email)
    if (!validUser || validUser.password !== password) {
        return res.json({ message: 'User not valid.' })
    }
    res.json({ message: 'Logged in.' })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
