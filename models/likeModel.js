const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Post'
    }
})
likeSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema)