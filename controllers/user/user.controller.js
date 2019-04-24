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
        
    }
}