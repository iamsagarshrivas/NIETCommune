const student = require('../../models/student');
const user = require('../../models/user');
const claas = require('../../models/class');
const notice = require('../../models/notice');

module.exports = {
    updateStudentDetails: (req, res) => {
    },
    addClass: (req, res) => {
        let newClass = new claas({
            course: 'btech',
            department: req.body.department,
            year: Math.ceil(req.body.semester / 2),
            semester: req.body.semester,
            section: req.body.section
        });

        newClass.save((err, savedClass) => {
            if (err) {
                res.json({ error: true, error_msg: "Something went wrong", err })
            }
            else res.json({ msg: 'saved class', savedClass })
        })

    },

    getNotificationCount: (req, res) => {
        student.findOne({ user_id: req.params.id }, { class: 1 }, (err, studentClass) => {
            if (err) {
                res.json({ error: true, error_msg: "Something went wrong", err })
            }
            notice.countDocuments({ class_id: studentClass.class }, (err, count) => {
                if (err) {
                    res.json({ error: true, error_msg: "Something went wrong", err })
                }
                res.json({ error: false, count })

            })

        })

    },

    getMyNotifications: (req, res) => {

        student.findOne({ user_id: req.params.id }, { class: 1 }, (err, studentClass) => {
            if (err) {
                res.json({ error: true, error_msg: "Something went wrong", err })
            }
            else {
                notice.aggregate([{$match:{class_id:studentClass.class}},{$lookup:{
                    from: 'faculties',
                    localField: 'author',
                    foreignField: 'user_id',
                    as: 'author'
                  }},{
                      $unwind: '$author'
                  },{
                      $project: { class_id:0}
                  }])
                .sort({ _id: -1 }).exec((err, documentList) => {
                    if (err) {
                        res.json({ error: true, error_msg: "Something went wrong", err })
                    }
                    res.json({ error: false, msg: "Updated", notices: documentList })

                })
            }


        })

    }

}