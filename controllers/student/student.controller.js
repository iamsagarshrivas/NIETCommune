const student = require('../../models/student');
const user = require('../../models/user');

module.exports = {
    updateStudentDetails: (req, res) => {
        student.findOneAndUpdate({ "user_id": req.body.id }, {

            course: req.body.course,
            branch: req.body.branch,
            year: req.body.year,
            section: req.body.section,
            semester: req.body.semester,
            rollNumber:req.body.rollNumber,
            status : "active"

        }, (err, updatedStudent) => {
            if (err) {
                res.status(409).json({ error: true, error_msg: "Something went wrong", err })
            } else {
                res.status(200).json({ error: false, student: updatedStudent });
            }
        })
    }
}