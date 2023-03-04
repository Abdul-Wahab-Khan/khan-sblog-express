const rateLimiter = require('express-rate-limit')

const loginLimiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    message: {message: "Too many login attempts from this IP, please try again after a minute"},
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeader: true,
    legacyHeaders: false,
})

module.exports = loginLimiter