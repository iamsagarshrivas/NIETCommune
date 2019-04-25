var user = require('../../models/user');

module.exports = {
    getAllUser: (req, res) => {
        res.json("user working");
    },
    getAnotherUser: (req, res) => {
        res.send("another user")
    },
    authenticateUser: (req, res) => {
        console.log('req ', req.body);
        user.findOne({email:req.body.email},{_id:1,role:1},(err,userFound)=>{
            if(err){
                res.json({error : true, error_msg : 'something went wrong',err})
            }else{
                if(!userFound){
                    res.json({error : true, error_msg : 'No user exists with this email'})
                }else{
                    if(userFound.password != req.body.password){
                        res.json({error:true , error_msg : 'Incorrect password, Please try again'})
                    }else{
                        res.json({error:false, msg:'Login Success',userFound})
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
            name: req.body.userName,
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
                    res.json({ error: true, error_msg: 'email or erp already exists',err })
                }
                else {
                    res.json({ error: true, error_msg: 'something went wrong', err })
                }
            }
            else {
                res.json({ error: false, msg: 'user created', user: userSaved })
            }
        })
    }
}