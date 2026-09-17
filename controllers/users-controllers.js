const { v4: uuidv4 } = require('uuid')

const users = [
    {
        id: 'u1',
        email: 'sadri.masood@gmail.com',
        password: 'test',
    },
]
const getUsers = (req, res, next) => {
    res.json({ users })
}

const signup = (req, res, next) => {
    const { email, password } = req.body

    const newUser = { id: uuidv4(), email, password }

    users.push(newUser)

    res.status(201).json({ user: newUser })
}

const login = (req, res, next) => {
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
