var mongoose = require('mongoose');

var subjectSchema = mongoose.Schema({

    subjectCode:String,
    subjectName:String,
    department:String,
    semester:Number
    
})

module.exports = mongoose.model('subject',subjectSchema);