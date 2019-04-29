var user = require('../../models/user');
var student = require('../../models/student');
var faculty = require('../../models/faculty');

module.exports = {
    getAllUser: (req, res) => {
        user.find({},(err,userIdArr)=>{
            if(err) throw err;
            res.json({ar:userIdArr});
        })
    },
    getAnotherUser: (req, res) => {
        res.send("another user")
    },
    authenticateUser: (req, res) => {
        user.findOne({ email: req.body.email }, (err, userFound) => {
            if (err) {
                res.status(409).json({ error: true, error_msg: 'something went wrong', err })
            } else {
                if (!userFound) {
                    res.status(200).json({ error: true, error_msg: 'No user exists with this email' })
                } else {
                    if (userFound.password != req.body.password) {
                        res.json({ error: true, error_msg: 'Incorrect password, Please try again' })
                    } else {
                        if (userFound.role == 'student') {
                            student.findOne({ user_id: userFound._id }, (err, studentFound) => {
                                if (err) {
                                    res.status(409).json({ error: true, error_msg: 'something went wrong', err })

                                } else {
                                    res.status(200).json({ error: false, msg: 'Login Success',role:'student', student: studentFound });
                                }
                            })
                        }
                        else if (userFound.role == 'faculty') {
                            faculty.findOne({ user_id: userFound._id }, (err, facultyFound) => {
                                if (err) {
                                    res.status(409).json({ error: true, error_msg: 'something went wrong', err })

                                } else {
                                    res.status(200).json({ error: false, msg: 'Login Success',role:'faculty', faculty: facultyFound });
                                }
                            })
                        }
                    }
                }
            }
        })
    },

    registerUser: (req, res) => {
        let newUser = new user({
            email: req.body.email,
            name: req.body.name,
            role: null,
            mobileNumber: null,
            password: req.body.password,
            erpId: req.body.erpId,
            lastLoginTime: Date.now(),
            isActive: true,
            status: "inactive"
        })

        newUser.save((err, userSaved) => {
            if (err) {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(200).json({ error: true, error_msg: 'Email or ERP already exists', err })
                }
                else {
                    res.status(200).json({ error: true, error_msg: 'something went wrong', err })
                }
            }
            else {
                res.status(200).json({ error: false, msg:'Profile created' ,user: userSaved })
            }
        })
    },

    updateUser: (req, res) => {

        console.log('1',req.body);
        

        user.findByIdAndUpdate({_id:req.body._id}, { role: req.body.role, status: 'active' }, (err, userUpdated) => {
            if (err) {
                console.log('2',err);
                
                user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                res.json({ error: true, error_msg: 'Something went wrong', err })
            }
            else {
                console.log('3',userUpdated);
                

                if (userUpdated.role == 'student') {
                    let newStudent = new student({

                        name: userUpdated.name,
                        email: userUpdated.email,
                        erpId: userUpdated.erpId,
                        user_id: userUpdated._id,
                        mobileNumber: userUpdated.mobileNumber,
                        course: req.body.course,
                        department: req.body.department,
                        year: req.body.year,
                        semester: req.body.semester,
                        section: req.body.section,
                        rollNumber: req.body.rollNumber,

                    });

                    newStudent.save((err, studentData) => {
                        if (err) {
                            console.log('4',err);
                            
                            user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                            res.json({ error: true, error_msg: 'Something went wrong', err })
                        }
                        else {
                            console.log('5',studentData);
                            
                            res.status(200).json({ error: false, msg: 'Profile updated',role:'student' ,student: studentData })
                        }
                    })
                }
                else if (userUpdated.role == 'faculty') {
                    let newFaculty = new faculty({

                        name: userUpdated.name,
                        email: userUpdated.email,
                        erpId: userUpdated.erpId,
                        user_id: userUpdated._id,
                        mobileNumber: userUpdated.mobileNumber,
                        department: req.body.department,

                    })

                    newFaculty.save((err,facultyData)=>{
                        if (err) {
                            console.log('6',err);
                            
                            user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                            res.json({ error: true, error_msg: 'Something went wrong', err })
                        }
                        else {
                            console.log('7',facultyData);
                            
                            res.status(200).json({ error: false, msg: 'Profile updated',role:'faculty', faculty: facultyData })
                        }
                    })
                }


            }
        })

    }
}