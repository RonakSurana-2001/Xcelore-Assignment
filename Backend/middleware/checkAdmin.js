const userModel = require("../models/userModel.js")

const validateAdmin=async(req,res,next)=>{
    const email=req.body.email || req.headers.email
    try{
        const user=await userModel.findOne({email})
        if(user.status){
            return next()
        }
        else{
            res.status(400).send({
                success:false,
                message:"Only Admin can perform this action"
            })
        }
    } catch(err){
        res.status(400).send({
            success:false,
            message:"User Not Found"
        })
    }
}

module.exports={validateAdmin}