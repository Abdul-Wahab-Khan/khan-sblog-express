const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is mandatory"]
    },
    email: {
        type: String,
        required: [true, "email is mandatory"],
        unique: [true, "Email is already registered"]
    },
    password: {
        type: String,
        required: [true, "password is mandatory"],
    },
    roles: [{
        type: String,
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)