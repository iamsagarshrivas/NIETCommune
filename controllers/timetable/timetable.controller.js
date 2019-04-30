const student = require('../../models/student');
const faculty = require('../../models/faculty');
const facultyTimetable = require('../../models/facultyTimetable');
const classTimetable = require('../../models/classTimetable');
module.exports = {
    getClassTimetable: (req, res) => {
        console.log('working',req.params.id);


        classTimetable.find({ course: 'btech' }, (err, tt) => {
            if (err) throw err
            res.json({ tt });
        })

    },
    getClassTimetableByDay:(req,res)=>{
        classTimetable.find({'timetable.day':'monday'},(e,tt)=>{
            if(e) throw e
            res.json({tt});
        })
    }


}