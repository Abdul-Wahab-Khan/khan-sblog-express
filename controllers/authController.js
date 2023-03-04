const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = asyncHandler(async (req, res) => {
    const {username, email, password, roles} = req.body

    if (!username || !email || !password || !roles) {
        res.status(400)
        throw new Error('The fields are mandatory')
    }

    const userAvailability = await User.findOne({email})
    
    if (userAvailability) {
        res.status(400)
        throw new Error('The email is already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        email,
        username,
        password: hashedPassword,
        roles
    })

    if (user) 
        res.status(201).json({username: username})
    else {
        res.status(400)
        throw new Error('Sorry, please provide unique username')
    }
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('The fields are mandatory')
    }

    const user = await User.findOne({email}) 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    roles: user.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_TIME }
        )

        const refereshToken = jwt.sign(
            { id: user.id },
            process.env.REFERESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_TIME }
        )

        res.cookie('jwt', refereshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 4 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ accessToken })
    } 

    res.status(401)
    throw new Error("Wrong credentials")
})

const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401).json({message: "Not authorizedasdf"})

    const refereshToken = cookies.jwt

    jwt.verify(refereshToken, process.env.REFERESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({message: "Forbidden"})
            const user = await User.findById({_id: decoded.id})
            
            if (!user) return res.status(401).json({message: "Not authorized"})

            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                        roles: user.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_TIME }
            )

            res.json({accessToken})
        }
    )
})

const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    console.log("The cookie in logout     " + cookies.jwt)
    if(!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true})

    res.json({message: "Logged Out"})
})

module.exports = { login, register, logout, refresh }