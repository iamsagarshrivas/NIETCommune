var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({

    name:String,
    email:String,
    course:String,
    branch:String,
    year:Number,
    section:String,
    semester:Number,
    erpId:{
        type:String,
        lowercase:true
    },
    user_id:mongoose.Schema.Types.ObjectId,
    rollNumber:Number,
    mobileNumber:Number,
    status:String,

})

module.exports = mongoose.model('student',studentSchema);