const mongoose = require('mongoose');
const noticeSchema = mongoose.Schema({
    title:String,
    type:String,
    body:String,
    author:mongoose.Schema.Types.ObjectId,
    generationTime:String,
    class_id:[mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model('notice',noticeSchema);