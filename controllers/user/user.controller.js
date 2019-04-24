var user = require('../../models/user');

module.exports = {
    getAllUser:(req,res)=>{
        res.json("user working");
    },
    getAnotherUser:(req,res)=>{
        res.send("another user")
    },
    authenticateUser:(req,res)=>{
        console.log('req ',req.body);
        user.find({},(err,result)=>{
            res.json({err,result});
        })        
    },
    registerUser:(req,res)=>{
        console.log('form data',req.body);
        let newUser = new user({
            email: req.body.email ,
            role : req.body.role,
            name : req.body.userName,
            mobileNumber : null,
            password:req.body.password,
            erpId:req.body.erpId,
            lastLoginTime: Date.now(),
            isActive : true,
            status: "active"
        })

        newUser.save((err,userSaved)=>{
            if(err){
                res.json({saved:false,msg:'something went wrong'})
            }
            else{
                res.json({saved:true,msg:'user created',user:newUser})
            }
        })
    }
}