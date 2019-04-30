const student = require('../../models/student');
const faculty = require('../../models/faculty');
const facultyTimetable = require('../../models/facultyTimetable');
const classTimetable = require('../../models/classTimetable');
module.exports = {
    getClassTimetable: (req, res) => {
        console.log('working',req.params.id);
        // student.findOne({user_id:req.params.id},(err,studentFound)=>{
        //     if(err){
        //         res.status(404).json({error:true,error_msg:'Something went wrong',err})
        //     }
        //     else{
        //         classTimetable.findOne({course:studentFound.course,branch:studentFound.branch,year:studentFound.year,semester:studentFound.semester})
        //     }
            

        // })


        classTimetable.find({ course: 'btech' }, (err, tt) => {
            if (err) throw err
            res.json({ tt });
        })

    },
    getClassTimetableByDay:(req,res)=>{
        classTimetable.find({"timetable.day":"monday"},(e,tt)=>{
            if(e) throw e
            res.json({tt});
        })
    }


}