const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type:String,
        require:true
    },
    name:{
        type:String,
    },
    avatar:{
        type:String,
    },
    like:[
        {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }
    ],
    comment:[
        {
            user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
            },
            text:{
                type:String,
                require:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})

const Post = mongoose.model('post',postSchema);

module.exports = Post;
