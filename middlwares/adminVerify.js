const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAdmin = asyncHandler(async (req, res, next) => {
    let token
    let authorizationHeader = req.headers.authorization || req.headers.Authorization

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        token = authorizationHeader.split(' ')[1]
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403)
                throw new Error('Unauthorized user access')
            }

            const roles = decoded.user.roles 
            if (roles.includes('admin'))
                req.user.admin = true
            else {
                res.status(403)
                throw new Error('Non admin user access forbidden')
            }

            next()
        })
    }

    if (!token) {
        res.status(401)
        throw new Error("Unauthorized access the token or token is not provided")
    }
})

module.exports = verifyAdmin