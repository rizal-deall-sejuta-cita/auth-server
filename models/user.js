const { getDb } = require('../config/db');

// const collection = getDb().collection('users')

class User {
    static async findByUsername(username) {
        try {
            const options = { 
                projection: { _id: 1, role: 1, username: 1, password: 1 } 
            }
            const user = await getDb().collection('users').findOne({ username }, options)
            return Promise.resolve(user)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

module.exports = User
