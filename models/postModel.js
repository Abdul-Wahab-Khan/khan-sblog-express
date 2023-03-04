const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "The field title is mandatory"]
    },
    body: {
        type: String,
        required: [true, "Body of post is mandatory"]
    },
    imageUrl: {
        type: String,
        required: [true, 'No image url provided']
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
