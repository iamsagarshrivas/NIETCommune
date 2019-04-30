const mongoose = require('mongoose');

const facultyTimetableSchema = mongoose.Schema({
    "faculty_id": mongoose.Schema.Types.ObjectId,
    "department": String,
    "facultyCode": String,
    "timetable": [
        {
            "day": {
                type: String,
                lowercase: true
            },
            "slot": [
                {
                    "time": String,
                    "subject": {
                        "sub_id": mongoose.Schema.Types.ObjectId,
                        "sub_name": String
                    },
                    "semester": Number,
                    "section": String
                }

            ]
        }
    ]
});

module.exports = mongoose.model('facultyTimetable', facultyTimetableSchema);