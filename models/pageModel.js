const mongoose = require('mongoose')

const pageModel = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    link : {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Page', pageModel)
