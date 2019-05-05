const faculty = require('../../models/faculty');
const notice = require('../../models/notice');
const claas = require('../../models/class');

module.exports = {
    generateNotice : (req, res) => {        
        faculty.findOne({user_id:req.body._id}, (err, facultyFound) => {
            if (err) {
                res.json({ error: true, error_msg: 'something went wrong', err })
            }
            else {
                claas.find({department:facultyFound.department,semester:req.body.semester,section:{$in:req.body.section}}, { _id: 1 }, (err, classesFound) => {
                    if (err) {
                        res.json({ error: true, error_msg: 'something went wrong', err })
                    }
                    else {                        
                        let newNotice = new notice({
                            title: req.body.title,
                            body: req.body.body,
                            author: req.body._id,
                            generationTime: new Date(Date.now()+330*60*1000).toLocaleString(),
                            class_id: classesFound
                        })

                        newNotice.save((err, noticeSaved) => {
                            if (err) {

                                res.json({ error: true, error_msg: 'something went wrong', err })
                            }
                            else {
                                res.json({ error: false,msg:"Notice saved", notice: noticeSaved })
                            }
                        })
                    }
                })
            }
        })

    },
    getNoticeDetails : (req,res)=>{
        notice.findById(req.params.id,(err,noticeFound)=>{
            if(err){
                res.json({error:true,error_msg:"Something went wrong",err})
            }
            else{
                res.json({error:false,notice:noticeFound})
            }
        })

    },
    getMyNotices : (req, res) => {
        notice.find({ author: req.params.id }, { title: 1, _id: 1 }, (err, noticeList) => {
            if (err) {
                res.json({ error: true, error_msg: 'something went wrong', err })
            }
            else {
                res.json({ error: false, notice: noticeList })

            }
        })

    }
}