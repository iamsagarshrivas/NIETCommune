var user = require('../../models/user');
var student = require('../../models/student');
var faculty = require('../../models/faculty');
var claas = require('../../models/class');

module.exports = {
    getAllUser: (req, res) => {
        user.find({}, (err, userIdArr) => {
            if (err) throw err;
            res.json({ ar: userIdArr });
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
                                    claas.findById(studentFound.class, (err, classFound) => {
                                        if (err) {
                                            res.status(409).json({ error: true, error_msg: 'something went wrong', err })

                                        }
                                        else {
                                            res.status(200).json({
                                                error: false, msg: 'Login Success', user: {

                                                    _id: studentFound.user_id,
                                                    email: studentFound.email,
                                                    name: studentFound.name,
                                                    role: 'student',
                                                    mobileNumber: studentFound.mobileNumber,
                                                    password: userFound.password,
                                                    erpId: userFound.erpId,
                                                    lastLoginTime: userFound.lastLoginTime,
                                                    isActive: userFound.isActive,
                                                    status: userFound.status,
                                                    course: classFound.course,
                                                    department: classFound.department,
                                                    year: classFound.year,
                                                    semester: classFound.semester,
                                                    section: classFound.section,
                                                    rollNumber: studentFound.rollNumber

                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        }
                        else if (userFound.role == 'faculty') {
                            faculty.findOne({ user_id: userFound._id }, (err, facultyFound) => {
                                if (err) {
                                    res.status(409).json({ error: true, error_msg: 'something went wrong', err })

                                } else {
                                    res.status(200).json({
                                        error: false, msg: 'Login Success', user: {
                                            _id: facultyFound.user_id,
                                            email: facultyFound.email,
                                            name: facultyFound.name,
                                            role: 'faculty',
                                            mobileNumber: facultyFound.mobileNumber,
                                            password: userFound.password,
                                            erpId: userFound.erpId,
                                            lastLoginTime: userFound.lastLoginTime,
                                            isActive: userFound.isActive,
                                            status: userFound.status,
                                            department: facultyFound.department
                                        }
                                    });
                                }
                            })
                        }
                        else if (userFound.role == null) {
                            res.status(200).json({ error: false, msg: 'Login Success', user: userFound, })
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
                res.status(200).json({ error: false, msg: 'Profile created', user: userSaved })
            }
        })
    },

    updateUser: (req, res) => {
        user.findByIdAndUpdate({ _id: req.body._id }, { role: req.body.role, status: 'active' }, (err, userUpdated) => {
            if (err) {
                user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                res.json({ error: true, error_msg: 'Something went wrong', err })
            }
            else {
                if (userUpdated.role == 'student') {
                    claas.findOne({
                        department: req.body.department,
                        semester: req.body.semester,
                        section: req.body.section
                    }, (err, classFound) => {
                        if (err) {
                            res.json({ error: true, error_msg: 'Something went wrong', err })
                        }
                        else {
                            if (classFound == null) {
                                let tempYear;
                                if (req.body.year == 'first' || req.body.year == 'First') {
                                    tempYear = 1;
                                }
                                else if (req.body.year == 'second' || req.body.year == 'Second') {
                                    tempYear = 2;
                                }
                                else if (req.body.year == 'third' || req.body.year == 'Third') {
                                    tempYear = 3;
                                }
                                else if (req.body.year == 'forth' || req.body.year == 'Forth') {
                                    tempYear = 4;
                                }
                                let newClass = new claas({
                                    course: req.body.course,
                                    department: req.body.department,
                                    year: tempYear,
                                    semester: req.body.semester,
                                    section: req.body.section
                                })

                                newClass.save((err, savedClass) => {
                                    if (err) {
                                        res.json({ error: true, error_msg: 'Something went wrong', err })
                                    }
                                    else {
                                        let newStudent = new student({
                                            name: userUpdated.name,
                                            email: userUpdated.email,
                                            erpId: userUpdated.erpId,
                                            user_id: userUpdated._id,
                                            mobileNumber: userUpdated.mobileNumber,
                                            class: savedClass._id,
                                            rollNumber: req.body.rollNumber,
                                        });

                                        newStudent.save((err, studentData) => {
                                            if (err) {
                                                user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                                                res.json({ error: true, error_msg: 'Something went wrong', err })
                                            }
                                            else {
                                                res.status(200).json({
                                                    error: false, msg: 'Profile updated', user: {
                                                        _id: studentData.user_id,
                                                        email: studentData.email,
                                                        name: studentData.name,
                                                        role: 'student',
                                                        mobileNumber: studentData.mobileNumber,
                                                        password: userUpdated.password,
                                                        erpId: userUpdated.erpId,
                                                        lastLoginTime: userUpdated.lastLoginTime,
                                                        isActive: userUpdated.isActive,
                                                        status: userUpdated.status,
                                                        course: savedClass.course,
                                                        department: savedClass.department,
                                                        year: savedClass.year,
                                                        semester: savedClass.semester,
                                                        section: savedClass.section,
                                                        rollNumber: studentData.rollNumber
                                                    }
                                                })
                                            }
                                        })
                                    }

                                })
                            }
                            else {
                                // todo : class exists, update it
                                let newStudent = new student({
                                    name: userUpdated.name,
                                    email: userUpdated.email,
                                    erpId: userUpdated.erpId,
                                    user_id: userUpdated._id,
                                    mobileNumber: userUpdated.mobileNumber,
                                    class: classFound._id,
                                    rollNumber: req.body.rollNumber,
                                });

                                newStudent.save((err, studentData) => {
                                    if (err) {
                                        user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                                        res.json({ error: true, error_msg: 'Something went wrong', err })
                                    }
                                    else {
                                        res.status(200).json({
                                            error: false, msg: 'Profile updated', user: {
                                                _id: studentData.user_id,
                                                email: studentData.email,
                                                name: studentData.name,
                                                role: 'student',
                                                mobileNumber: studentData.mobileNumber,
                                                password: userUpdated.password,
                                                erpId: userUpdated.erpId,
                                                lastLoginTime: userUpdated.lastLoginTime,
                                                isActive: userUpdated.isActive,
                                                status: userUpdated.status,
                                                course: classFound.course,
                                                department: classFound.department,
                                                year: classFound.year,
                                                semester: classFound.semester,
                                                section: classFound.section,
                                                rollNumber: studentData.rollNumber
                                            }
                                        })
                                    }
                                })
                            }
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

                    newFaculty.save((err, facultyData) => {
                        if (err) {
                            user.findByIdAndUpdate(req.body._id, { role: null, status: 'inactive' });
                            res.json({ error: true, error_msg: 'Something went wrong', err })
                        }
                        else {
                            res.status(200).json({
                                error: false, msg: 'Profile updated', user: {
                                    _id: facultyData.user_id,
                                    email: facultyData.email,
                                    name: facultyData.name,
                                    role: 'faculty',
                                    mobileNumber: facultyData.mobileNumber,
                                    password: userUpdated.password,
                                    erpId: userUpdated.erpId,
                                    lastLoginTime: userUpdated.lastLoginTime,
                                    isActive: userUpdated.isActive,
                                    status: userUpdated.status,
                                    department: facultyData.department
                                }
                            })
                        }
                    })

                }
                else {
                    res.json({ error: true, error_msg: 'something went wrong', err })
                }
            }
        })
    }
}