const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.headers.hasOwnProperty('token')) {
        try {
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