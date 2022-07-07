const jwt = require('jsonwebtoken');

const secretAccessToken = process.env.JWT_ACCESSTOKEN_SECRET
const secretRefreshToken = process.env.JWT_REFRESH_SECRET

const signAccessToken = (payload) => {
    return jwt.sign(payload, secretAccessToken, {expiresIn: (60 * 1)} )
}

const signRefreshToken = (payload) => {
    return jwt.sign(payload, secretRefreshToken, {expiresIn: (60 * 5)})
}

const verifyAccessT = async (token) => {
    return jwt.verify(token, secretAccessToken, (err, decode) => {
        return new Promise((resolve, reject) => {
            if (err) {
                if (err.name !== "TokenExpiredError") {
                    reject(err)
                } else {
                    resolve(null)
                }
            }
            resolve(decode)
        })
    })
}

const verifyRefreshT = async (token) => {
    return jwt.verify(token, secretRefreshToken, (err, decode) => {
        return new Promise((resolve, reject) => {
            if (err) {
                reject(err)
            }
            resolve(decode)
        })
    })
}

module.exports = { signAccessToken, signRefreshToken, verifyAccessT, verifyRefreshT }
