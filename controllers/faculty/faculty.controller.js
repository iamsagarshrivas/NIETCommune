const faculty = require('../../models/faculty');

module.exports = {
    updateFacultyDetails :(req,res)=>{
        faculty.findOneAndUpdate({user_id:req.body.id},{

            department : req.body.department,
            status:"active"

        },(err,updatedFaculty)=>{
            if(err){
                res.status(409).json({error:true,error_msg:"something went wrong",err})
            }
            else{
                res.status(200).json({error:false,faculty : updatedFaculty})
            }
        })
    }
}