const { verifyRefreshT, signAccessToken, signRefreshToken } = require('./jwt');

const resetAccessToken = async (refreshToken) => {
    try {
        const now = ~~(Date.now() / 1000)
        const decode = await verifyRefreshT(refreshToken)
        const user = {
            username: decode.username,
            role: decode.role,
            id: decode.id
        }
        let newRefreshToken = null
        const newAccessToken = signAccessToken(user)
        if (decode.exp - now < 120) {
            newRefreshToken = signRefreshToken(user)
        }
        
        return Promise.resolve({
            user,
            newAccessToken,
            newRefreshToken
        })

    } catch (err) {
        return Promise.reject(err)
    }
}

module.exports = {
    resetAccessToken
}