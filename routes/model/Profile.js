const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        require:true
    },
    skill:{
        type:[String],
        require:true
    },
    bio:{
        type:String
    },
    githubUsername:{
        type:String
    },
    experience:[{
        title: {
            type:String,
            require:true
        },
        company:{
            type:String,
            require:true
        },
        location:{
            type:String
        },
        from:{
            type:Date,
            require:true
        },
        to:{
            type:Date
        },
        current:{
            type:Boolean,
            default:false
        },
        description:{
            type:String
        } 
    }],
    education:[
        {
            school: {
                type:String,
                require:true
            },
            degree:{
                type:String,
                require:true
            },
            fieldofstudy:{
                type:String,
                require:true
            },
            from:{
                type:Date,
                require:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            } 
        }
    ],
    socialMedia:{
        facebook:{
            type:String
        },
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Profile = mongoose.model('profile',profileSchema)

module.exports = Profile;