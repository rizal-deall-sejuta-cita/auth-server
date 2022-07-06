const bcrypt = require('bcryptjs')

const hashPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

const comparePass = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPass, comparePass }
