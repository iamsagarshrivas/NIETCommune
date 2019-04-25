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
        enum : ['student','faculty','admin','staff','other'],
        default : 'student',
        lowercase:true
    
    },
    name : String,
    mobileNumber : Number,
    password:{
        type : String,
        require : true
    },
    erpId:{        
        type: String,
        lowercase : true,
        unique : true,
        required : true
    },
    lastLoginTime: Date,
    isActive : Boolean,
    otpVerified:Boolean,
    status: String
});

module.exports = mongoose.model('user',userSchema);