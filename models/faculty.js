var mongoose = require('mongoose');

var facultySchema = mongoose.Schema({

    name:String,
    email:String,
    department:{type:String,lowercase:true},
    subjects:[mongoose.Schema.Types.ObjectId],
    erpId:{
        type:String,
        lowercase:true
    },
    user_id:mongoose.Schema.Types.ObjectId,
    mobileNumber:Number,
    status:String

})

module.exports = mongoose.model('faculty',facultySchema);