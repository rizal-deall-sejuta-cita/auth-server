const errorHander = (err, req, res, next) => {
    let code = null
    let message = []

    switch (err.name) {
        case "BadRequest":
            code = 400
            if (Array.isArray(err.message)) {
                err.message.forEach(msg => {
                    message.push(msg)
                })
            } else {
                message.push(err.message)
            }
            break
        case "NotFound":
            code = 404
            message.push(err.message)
            break
        case "Unauthorized":
            code = 401
            message.push(err.message)
            break
        case "Forbidden":
            code = 403
            message.push(err.message)
            break
        case "TokenExpiredError":
            code = 401
            message.push(" You are logged-out. Please re-login ")
            break
        default:
            code = 500
            message.push(err.message || "Internal server error")
            break
    }

    res.status(code).json({ message })
}

module.exports = { errorHander }
