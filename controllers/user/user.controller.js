module.exports = {
    getAllUser:(req,res)=>{
        res.json("user working");
    },
    getAnotherUser:(req,res)=>{
        res.send("another user")
    }
}