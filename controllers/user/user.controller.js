var user = require('../../models/user');
var student = require('../../models/student');
var faculty = require('../../models/faculty');

module.exports = {
    getAllUser: (req, res) => {
        res.json("user working");
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
                                    res.status(200).json({ error: false, msg: 'Login Success', user: userFound, student: studentFound });
                                }
                            })
                        }
                        else if (userFound.role == 'faculty') {
                            faculty.findOne({ user_id: userFound._id }, (err, facultyFound) => {
                                if (err) {
                                    res.status(409).json({ error: true, error_msg: 'something went wrong', err })

                                } else {
                                    res.status(200).json({ error: false, msg: 'Login Success', user: userFound, faculty: facultyFound });
                                }
                            })
                        }
                    }
                }
            }
        })
    },
    registerUser: (req, res) => {
        console.log('form data', req.body);
        let newUser = new user({
            email: req.body.email,
            role: req.body.role,
            name: req.body.name,
            mobileNumber: null,
            password: req.body.password,
            erpId: req.body.erpId,
            lastLoginTime: Date.now(),
            isActive: true,
            status: "active"
        })

        newUser.save((err, userSaved) => {
            if (err) {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.json({ error: true, error_msg: 'email or erp already exists', err })
                }
                else {
                    res.json({ error: true, error_msg: 'something went wrong', err })
                }
            }
            else {
                if (userSaved.role == 'student') {

                    let newStudent = new student({

                        name: userSaved.name,
                        email: userSaved.email,
                        erpId: userSaved.erpId,
                        user_id: userSaved._id,
                        mobileNumber: userSaved.mobileNumber,
                        status: 'inactive',
                        rollNumber:req.body.rollNumber

                    });

                    newStudent.save((err, studentData) => {
                        if (err) {
                            user.findByIdAndDelete(userSaved._id,(err,del)=>{
                                if(err){

                                    res.json({ error: true, error_msg: 'Something went wrong', err })
                                }else{
                                    res.json({
                                        error:true,error_msg:'Something went wrong',delete:'user deleted',del
                                    })
                                }
                            })
                        }
                        else {
                            res.json({ error: false, msg: 'student added', user: userSaved, student: studentData })
                        }
                    })

                }
                else if (userSaved.role == 'faculty') {

                    let newFaculty = new faculty({


                        name: userSaved.name,
                        email: userSaved.email,
                        erpId: userSaved.erpId,
                        user_id: userSaved._id,
                        mobileNumber: userSaved.mobileNumber,
                        status: 'inactive',

                    })

                    newFaculty.save((err, facultyData) => {
                        if (err) {
                            {
                                user.findByIdAndDelete(userSaved._id,(err,del)=>{
                                    if(err){
    
                                        res.json({ error: true, error_msg: 'Something went wrong', err })
                                    }else{
                                        res.json({
                                            error:true,error_msg:'Something went wrong',delete:'user deleted',del
                                        })
                                    }
                                })
                            }
                        }
                        else {
                            res.json({ error: false, msg: 'faculty added', user: userSaved, faculty: facultyData })
                        }
                    })

                }
                else if (userSaved.role == 'others') {

                    res.json("other saved")

                }
                else {
                    // res.json({ error: true, error_msg: 'something went wrong' })
                    res.json({ error: false, msg: 'user created', user: userSaved })
                }
            }
        })
    }
}