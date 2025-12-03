const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema({
    user:{
       type: mongoose.Types.ObjectId,
       ref: 'user',
       required: true
    },
    food:{
       type: mongoose.Types.ObjectId,
       ref: 'food',
       required: true
    },
    isLiked:{
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
}
)

const Like = mongoose.model('like', likeSchema)

module.exports = Like;