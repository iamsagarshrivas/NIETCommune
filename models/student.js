var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({

    name:String,
    email:String,
    course:{
        type:String,
        lowercase:true
    },
    branch:{
        type:String,
        lowercase:true
    },
    year:{
        type:Number,
        min:1,
        max:4
    },
    section:{
        type:String,
        lowercase:true
    },
    semester:Number,
    erpId:{
        type:String,
        lowercase:true
    },
    user_id:mongoose.Schema.Types.ObjectId,
    rollNumber:{
        type:Number,
        // unique : true
    },
    mobileNumber:Number,
    status:String,

})

module.exports = mongoose.model('student',studentSchema);