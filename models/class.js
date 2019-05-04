const mongoose = require('mongoose');
const classSchema = mongoose.Schema({
    course:{
        type:String,
        lowercase:true
    },
    department:{
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
    studentList:[mongoose.Schema.Types.ObjectId]
})
module.exports = mongoose.model('class',classSchema);