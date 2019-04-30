const mongoose = require('mongoose');
const classTimetableSchema = mongoose.Schema({
    "course": String,
    "department": String,
    "year": Number,
    "semester": Number,
    "section": String,
    "timetable": [
        {
            "day": {
                type: String,
                lowercase: true
            },
            "slot": [
                {
                    "time": String,
                    "logged_hours": Number,
                    "subject": {
                        "sub_id": mongoose.Schema.Types.ObjectId,
                        "sub_name": {
                            type: String,
                            uppercase: true
                        },
                        "sub_code": String
                    },
                    "faculty": [{
                        "faculty_id": mongoose.Schema.Types.ObjectId,
                        "faculty_name": {
                            type: String,
                            uppercase: true
                        }
                    }]
                }]
        }
    ]
});

module.exports = mongoose.model('classTimetable', classTimetableSchema);