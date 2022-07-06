const User = require('../models/user');
const { comparePass } = require('../helpers/bcrypt');
const { signAccessToken, signRefreshToken, verifyAccessT } = require('../helpers/jwt');
const { resetAccessToken } = require('../helpers/resetToken');

class UserController{
    static async login(req, res, next) {
        try {
            let { username, password } = req.body
            const user = await User.findByUsername(username)
            if (!user) {
                throw({
                    name: "Unauthorized",
                    message: "Username/Password doesn't Match"
                })
            }
            if (!comparePass(password, user.password)) {
                throw({
                    name: "Unauthorized",
                    message: "Username/Password doesn't Match"
                })
            }
            let payload = {
                id: user._id.toString(),
                username,
                role: user.role
            }
            let access_token = signAccessToken(payload)
            let refresh_token = signRefreshToken(payload)
            res.status(200).json({
                access_token,
                refresh_token
            })
        } catch (err) {
            next(err)
        }
    }

    static async verifyAccessToken(req, res, next) {
        try {
            const accessToken = req.headers.access_token
            const decode = await verifyAccessT(accessToken)
            if (decode !== null) {
                let { username, role, id } = decode
                res.status(200).json({ user: { username, role, id } })
            } else {
                const refreshToken = req.headers.refresh_token
                const { newAccessToken, newRefreshToken, user } = await resetAccessToken(refreshToken)
                if (!newRefreshToken) {
                    res.status(200).json({
                        user,
                        newAccessToken
                    })
                } else {
                    res.status(200).json({
                        user,
                        newAccessToken,
                        newRefreshToken
                    })
                }
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController