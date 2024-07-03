const bcrypt = require("bcryptjs")
const  userModel = require("../models/userModel")
const zod=require("zod")

const {generateJwtToken}=require("../middleware/jwt.js")

const userRegister = async (req, res) => {
    try {
        const userValidateData=zod.object({
            username:zod.string({
                required_error: "Username is required",
                invalid_type_error: "Username must be a string",
            }),
            password:zod.string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            }),
            email:zod.string()
        })

        const validate=userValidateData.safeParse(req.body)
        const { username, email, password } = req.body

        if(validate.success){
            if (!username || !email || !password) {
                return res.status(200).send({
                    success: false,
                    message: "Please Fill all Details"
                })
            }
            const existingUser = await userModel.findOne({ email })
            if (existingUser) {
                return res.status(200).send({
                    success: false,
                    message: "User Already Exists"
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = new userModel({ username, email, password: hashedPassword,status:req.body.status || false })
            await user.save()
            return res.status(200).send({
                success: true,
                message:"User Registered Successfully"
            })
        }
        else{
            return res.status(400).send({
                success: false,
                message: "Enter Correct Credentials"
            })
        }

    } catch (err) {
        res.status(400).send(err)
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please Provide username or password"
            })
        }

        const userValidateData=zod.object({
            password:zod.string({
                required_error: "Password is required",
                invalid_type_error: "Password must be a string",
            }),
            email:zod.string().email()
        })

        const validate=userValidateData.safeParse(req.body)

        if(validate.success){
            const user = await userModel.findOne({ email })
            if (!user) {
                return res.status(200).send({
                    success: false,
                    message: "email is not registered"
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password or username"
                })
            }
            return res.status(200).send({
                success: true,
                message: "login successfully",
                isAdmin:user.status,
                jwtToken:generateJwtToken(req.body)
            })
        }
        else{
            return res.status(500).send({
                success: false,
                message: "Enter Correct Credentials"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in Login",
            err
        })
    }
}

const getAllUsers=async(req,res)=>{
    try{
        const allusers=await userModel.find({})
        const usersNew=allusers.map(element => {
            const info={
                username:element.username,
                email:element.email,
                status:element.status
            }
            return info
        });
        res.status(200).send({
            success:true,
            usersNew
        })
    } catch(err){
        res.status(400).send({
            success:false,
            message:"Unable to fetch users"
        })
    }
}

const updateUserDetails=async(req,res)=>{
    try{
        const userValidateData=zod.object({
            email:zod.string(),
            emailupdate:zod.string(),
            username:zod.string({
                invalid_type_error: "Username must be a string",
            })
        })

        const validate=userValidateData.safeParse(req.body)

        if(!validate.success){
            res.status(400).send({
                success:false,
                message:"Format Incorrect"
            })
        }

        await userModel.findOneAndUpdate(
            {email:req.body.emailupdate},
            {$set:{
                username:req.body.username,
                status:req.body.status
            }},
            {new:true}
        )
        res.status(200).send({
            success:true,
            message:"updated successfully"
        })
    } catch(err){
        res.status(400).send({
            success:false,
            message:"Unable to Update"
        })
        console.log(err)
    }
}

const validateUserIsLogin=async(req,res)=>{
    return res.status(200).send({
        success:true
    })
}

const deleteUser=async(req,res)=>{
    try{
        const userEmail=req.headers.emailtodelete
        const userValidateData=zod.object({
            emailtodelete:zod.string()
        })
        const validate=userValidateData.safeParse(req.headers)
        if(!validate.success){
            res.status(400).send({
                success:false,
                message:"Format Incorrect"
            })
        }

        await userModel.findOneAndDelete({email:userEmail})
        res.status(200).send({
            success:true,
            message:"Deleted successfully"
        })
    } catch(err){
        console.log(err)
        res.status(400).send({
            success:false,
            message:"unable to delete"
        })
    }
}

module.exports = { validateUserIsLogin, userRegister,userLogin, getAllUsers,updateUserDetails,deleteUser }