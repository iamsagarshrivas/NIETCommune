module.exports = {
    getAllUser:(req,res)=>{
        res.json("user working");
    },
    getAnotherUser:(req,res)=>{
        res.send("another user")
    },
    authenticateUser:(req,res)=>{
        console.log('req ',req.body)
        res.json('login working');
    }
}