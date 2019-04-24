const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase : true,
        unique : true,
        required : true
    },
    role : {
        type : String,
        enum : ['candidate','faculty','admin','staff'],
        default : 'candidate'
    
    },
    name : String,
    password:{
        type : String,
        require : true
    },
    socialLogin:Boolean,
    provider:String,
    lastLoginTime: Date,
    loginCount: Number,
    isActive : Boolean,
    otpVerified:Boolean,
    status: String
});

var user = module.exports = mongoose.model('user',userSchema);