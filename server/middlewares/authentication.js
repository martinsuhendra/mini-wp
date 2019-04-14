const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.headers.hasOwnProperty('token')) {
        try {
            let decoded = jwt.verify(req.headers.token, process.env.JWT)
            req.authenticatedUser = decoded
            next()
        } catch (error) {
            res.status(400).json({
                message : `invalid token`
            })
        }
    } else {
        res.status(400).json({
            message : `no token`
        })
    }
}