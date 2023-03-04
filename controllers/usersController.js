const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getAll = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
})

const updateInfo = asyncHandler(async (req, res) => {

    const {email, username, id} = req.body
    
    if (req.user.id !== id) {
        res.status(403).json({message: "Cannot update other users info"})
    }

    console.log(email)
    console.log(username)
    console.log(id)

    if (!email || !username) {
        res.status(400)
        throw new Error('The fields are mandatory')
    }

    const user = await User.findById({_id: id}) 
    
    if (user.email === email) {
        user.username = username
        
        await user.update()
        res.status(200)
        res.send('Information updated')
    }

    const updatedUser = await User.findOne({email}) 
    if (updatedUser) {
        res.status(400)
        throw new Error('The email is already registered')
    }

    updatedUser.username = username
    updatedUser.email = email

    await updatedUser.update()

    res.status(200)
    res.send('Information updated')
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

const deleteUser = asyncHandler(async (req, res) => {
    if (res.body.id !== req.user.id) res.status(403).json({message: "Cannot delete"})
})

module.exports = {
    currentUser, getAll, updateInfo, deleteUser
}