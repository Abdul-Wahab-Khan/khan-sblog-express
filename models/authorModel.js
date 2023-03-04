const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    fullname : {
        type: String,
        required: true,
    },
    emails : [{
        _id: false,
        email: String,
    }],
    numbers : [{
        _id: false,
        number: String,
    }],
    about : {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    websites : [{
        name: String,
        link: String,
    }],
    links: [{
        name: String,
        link: String,
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Author', authorSchema)
