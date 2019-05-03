const student = require('../../models/student');
const faculty = require('../../models/faculty');
const facultyTimetable = require('../../models/facultyTimetable');
const classTimetable = require('../../models/classTimetable');
module.exports = {
    getClassTimetable: (req, res) => {
        console.log('working', req.params.id);
        classTimetable.findOne({ course: 'btech',year:4 }, (err, tt) => {
            if (err) throw err
            res.json({ tt });
        })

    },
    getClassTimetableByDay: (req, res) => {

        classTimetable.findOne({ "timetable.day": "monday" }, (e, tt) => {
            if (e) {
                res.json({ error: true, error_msg: 'Something went wrong', err: e })
            }
            else {
                console.log(tt);
                
                let today = new Date('07-may-2019').getDay();

                if(today == 0 || today == 6){

                    res.json({leave:true,reason:'weekend',error:false})
                }
                else{
                    res.json({error:false,leave:false,timetable:{
                        course:tt.course,
                        department:tt.department,
                        year:tt.year,
                        semester:tt.semester,
                        section:tt.section,
                        dayTimetable:tt.timetable[today-1]
                    }})

                }
            }
        })
    }


}