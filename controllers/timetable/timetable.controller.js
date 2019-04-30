const student = require('../../models/student');
const faculty = require('../../models/faculty');
const facultyTimetable = require('../../models/facultyTimetable');
const classTimetable = require('../../models/classTimetable');
module.exports = {
    getClassTimetable: (req, res) => {
        console.log('working');

        classTimetable.find({ course: 'btech' }, (err, tt) => {
            if (err) throw err
            res.json({ tt });
        })

    }


}